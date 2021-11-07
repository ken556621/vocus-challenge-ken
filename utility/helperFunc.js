export const getRandomFourArticles = data => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
};

export const getFirstArticleInfo = list => {
    if(!list.length) return {
      title: "",
      abstract: "",
      thumbnailUrl: "",
      user: ""
    }
    return {
      title: list[0].title,
      abstract: list[0].abstract,
      thumbnailUrl: list[0].thumbnailUrl,
      user: list[0].thumbnailUrl
    };
};

export const formatThumbnailUrl = url => {
  if(url.includes("https://")){
    return url
  }
  return "https://images.vocus.cc/" + url
};

export const handleTextOverflow = word => {
  if(word.length > 80){
    return word.slice(0, 81) + "..."
  }

  return word
};

export const detectNoImage = (e) => {
  e.target.onerror = null;
  e.target.src = "/icons/no-pictures.png";
};

export const sortArticles = (list, order) => {
  if(order === "asc"){
    return list.sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt));
  }

  if(order === "des"){
    return list.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }
};

export const searchArticles = (list, keyword) => {
  return list.filter(item => item.title.includes(keyword))
};