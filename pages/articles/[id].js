import { useState } from "react";
import styled from "styled-components";

import ArticleList from "@/components/ArticleList";
import Popup from "@/components/Popup";
import Header from "@/components/Header";
import SortDropdown from "@/components/SortDropdown";
import SearchInput from "@/components/SearchInput";

import { 
  getRandomFourArticles,
  getFirstArticleInfo, 
  formatThumbnailUrl,
  sortArticles,
  searchArticles
} from "@/utility/helperFunc";

const Container = styled.div``;

const SearchSortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const ArticleListSection = props => {
  const { 
    articlesData = [], 
    randomFourArticles = [],
    message = "", 
    status = "" 
  } = props;

  const [articlesOrder, setArticlesOrder] = useState("des"); // des, asc
  const [searchWord, setSearchWord] = useState("");

  const handleOrderArticles = (order) => {
    setArticlesOrder(order)
  };

  const handleSearchArticles = (word) => {
    setSearchWord(word)
  };

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

  const searchArticlesData = searchWord ? searchArticles(articlesData, searchWord) : randomFourArticles;
  const sortedArticlesData = sortArticles(searchArticlesData, articlesOrder);
  const firstArticleInfo = getFirstArticleInfo(sortedArticlesData);

  return (
      <Container>
        <Header 
          title={firstArticleInfo.title} 
          description={firstArticleInfo.abstract} 
          image={firstArticleInfo.thumbnailUrl}
        />
        <SearchSortWrapper>
          <SearchInput 
            placeholder="幫你從標題找文章"
            handleSearchArticles={handleSearchArticles}
          />
          <SortDropdown 
            articlesOrder={articlesOrder} 
            handleOrderArticles={handleOrderArticles} 
          />
        </SearchSortWrapper>
        <ArticleList 
          articlesData={sortedArticlesData} 
        />
      </Container>
    )
};

export const getServerSideProps = async context => {
  const { getArticleList } = require("@/api/articleList");
  const res = await getArticleList(context.query.id || "");

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

  const randomFourArticles = getRandomFourArticles(formatedArticlesData);

  return {
    props: {
      articlesData: formatedArticlesData,
      randomFourArticles: randomFourArticles,
      status: res.status
    }
  };
};

export default ArticleListSection;
