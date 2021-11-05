import ArticleList from "@/components/ArticleList";
import Popup from "@/components/Popup";
import Header from "@/components/Header";

import { 
  getRandomFourArticles,
  getFirstArticleInfo, 
  formatThumbnailUrl
} from "@/utility/helperFunc";

const ArticleListSection = props => {
  const { 
    articlesData = [], 
    message = "", 
    status = "" 
  } = props;

  if(status !== 200){
    return (
      <Popup 
        title = "Server Issue."
        subTitle = {message}
      />
    )
  }

  if (!articlesData.length) {
    return (
      <Popup 
        title = "No article found."
        subTitle = "Sorry..."
      />
    )
  }

  const firstArticleInfo = getFirstArticleInfo(articlesData);

  return (
      <>
        <Header 
          title={firstArticleInfo.title} 
          description={firstArticleInfo.abstract} 
          image={firstArticleInfo.thumbnailUrl}
        />
        <ArticleList articlesData={articlesData} />
      </>
    )
};

export const getServerSideProps = async context => {
  const { getArticleList } = require("@/api/articleList");
  const res = await getArticleList();

  if (!res.isSuccess || !res.data) {
    return {
      props: {
        articlesData: [],
        message: res.message || "Api fail",
        status: res.status
      }
    };
  }

  const formatedArticlesData = res.data.articles.map(article => {
    return {
      ...article,
      thumbnailUrl: formatThumbnailUrl(article.thumbnailUrl || "")
    }
  });

  return {
    props: {
      articlesData: getRandomFourArticles(formatedArticlesData),
      status: res.status
    }
  };
};

export default ArticleListSection;
