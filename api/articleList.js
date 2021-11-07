import request from "@/api/axiosInit";

export const getArticleList = (userId) => {
    return request.get(`/articles?userId=${userId}`, { disabledAbort: true });
}