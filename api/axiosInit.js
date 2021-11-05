import axios from "axios";
import merge from "lodash/merge";

import { getVocusServerUrl } from "@/constants/config";

const codeMessage = {
    400: "請求錯誤",
    401: "登錄狀態失效，請重新登錄",
    403: "拒絕訪問",
    404: "請求資源不存在",
    500: "伺服器器無回應",
    502: "伺服器錯誤",
    503: "服務目前無法使用"
};

const instance = axios.create({
    baseURL: getVocusServerUrl(),
    headers: {"Content-Type": "application/json"}
  });

const requestStart = (config) => {
    config.loadingCallback(true);
    if (config.disabledAbort) return;

    removePending(config); 
    addPending(config); 
};
const requestSuccess = (response, config) => {
    removePending(config); // 在請求結束後，移除本次請求狀態

    return {
        data: response.data,
        status: response.status,
        isSuccess: true
    };
};
const requestFailed = (error, config) => {
    const { response, message } = error;

    removePending(config);

    if (response) {
        return {
            data: response.data,
            status: response.status,
            message: message || codeMessage[response.status],
            isSuccess: false
        };
    }

    return {
        data: "Server Error",
        status: 400,
        message: "No message from backend",
        isSuccess: false
    };
};
const requestDone = (config) => {
    config.loadingCallback(false);
};

/**
 * @description 產生 cancel id
 * @param {Object} config
 */
const cancelIdGenerator = (config) => {
    // 若有帶自己產的 id 則用 id 作為 cancel token
    const cancelId = config.id ?? [
        config.method,
        config.url,
        JSON.stringify(config?.data)
    ].join("&");

    return cancelId;
};

const pending = new Map();
/**
 * @description 添加請求狀態
 * @param {Object} config
 */
const addPending = (config) => {
    const cancelId = cancelIdGenerator(config);

    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pending.has(cancelId)) {
            pending.set(cancelId, cancel);
        }
    });
};
/**
 * @description 移除請求
 * @param {Object} config
 */
const removePending = (config) => {
    const cancelId = cancelIdGenerator(config);

    if (pending.has(cancelId)) {
        const cancel = pending.get(cancelId);
        cancel(cancelId);
        pending.delete(cancelId);
    }
};

const request = (options) => {
    const config = merge({
        disabledAbort: false,
        id: null,
        loadingCallback: () => { }
    }, options);

    requestStart(config);

    return instance(config)
        .then((response) => requestSuccess(response, config))
        .catch((error) => requestFailed(error, config))
        .finally(() => requestDone(config));
};

const methods = {
    get: (url, options) => request({
        method: "GET",
        url,
        ...options
    }),
    post: (url, data, options) => request({
        method: "POST",
        url,
        data,
        ...options
    }),
    put: (url, data, options) => request({
        method: "PUT",
        url,
        data,
        ...options
    }),
    patch: (url, data, options) => request({
        method: "PATCH",
        url,
        data,
        ...options
    }),
    delete: (url, data, options) => request({
        method: "DELETE",
        url,
        data,
        ...options
    })
};

Object.entries(methods).forEach(([key, value]) => {
    request[key] = value;
});


export default methods;
