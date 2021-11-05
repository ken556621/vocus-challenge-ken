export const getVocusServerUrl = () => {
    const devBaseUrl = "https://api-staging.vocus.cc/api";
    const prdBaseUrl = "https://api.vocus.cc/api";

    if(typeof window !== "object"){
        return devBaseUrl
    }

    const vocusServerUrl = window.location.origin.includes("localhost") ? devBaseUrl : prdBaseUrl
    
    return vocusServerUrl
};