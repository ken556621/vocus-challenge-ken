import request from "@/api/axiosInit";

export const getArticleList = () => {
    return request.get(`/articles`);
}