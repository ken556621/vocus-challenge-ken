export const getRandomFourArticles = data => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data.slice(randomIndex, randomIndex + 4);
};

export const getFirstArticleInfo = list => {
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
}