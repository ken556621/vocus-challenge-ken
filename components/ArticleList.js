import { useEffect } from "react";
import styled from "styled-components";

import Skeketon from "@/components/Skeleton";

import { 
    handleTextOverflow,
    detectNoImage
  } from "@/utility/helperFunc";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Card = styled.div`
    width: 481px;
    margin-right: 25px;
    margin-bottom: 21px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: ${props => props.theme.shadow.main};
    border: 1px solid #cbc3c2;
    border-radius: ${props => props.theme.radius.main};
    background-color: #ffffff;
    @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
        background-color: ${props => props.theme.backgroundColor.main};
        border: none;
        box-shadow: none;
        border-bottom: 1px solid #CBC3C2;
        border-radius: 0px;
    }
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LeftSection = styled.div`
    margin-right: 30px;
    width: 100%;
`;

const RightSection = styled.div``;

const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h1`
    margin-bottom: 15px;
    font-size: ${props => props.theme.fontSize.h1};
    color: ${props => props.theme.color.main};
    text-overflow: ellipsis;
    overflow:hidden;
`;

const Abstract = styled.h2`
    margin-bottom: 30px;
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.second};
    height: 100px;
    line-height: 27px;
`;

const Avatar = styled.div`
    display: flex;
    align-items: center;
    img {
        width: 30px;
        border-radius: 50%;
    }
    div {
        color: #222222;
        margin-left: 7px;
    }
`;

const ArticleImg = styled.div`
    img {
        width: 110px;
        border-radius: ${props => props.theme.radius.second};
    }
`;

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    img {
       width: 10px; 
       height: 10px;
       margin-right: 3px;
    }
    div {
        font-size: ${props => props.theme.fontSize.small};
        margin-right: 12px;
    }
`;

const ArticleList = props => {
  const { 
    articlesData = []
} = props;

  useEffect(() => {

  }, [articlesData])

  const renderCards = () => {
    return articlesData.map(article => (
      <Card key={article._id}>
        <TopSection>
            <LeftSection>
                {
                    article.title ?
                    <Title>{article.title}</Title> :
                    <Skeketon 
                        type="word"
                        lineCount={1}
                    />
                }
                {
                    article.abstract ?
                    <Abstract>{handleTextOverflow(article.abstract)}</Abstract> :
                    <Skeketon 
                        type="word"
                        lineCount={4}
                    />
                }
            </LeftSection>
            <RightSection>
                <ArticleImg>
                {
                    article.thumbnailUrl ?
                    <img src={article.thumbnailUrl} onError={detectNoImage} alt="Article Image" /> :
                    <Skeketon 
                        width="110px"
                        height="110px"
                    />
                }
                </ArticleImg>
            </RightSection>
        </TopSection>
        <BottomSection>
            <Avatar>
                {
                    article.user.avatarUrl ?
                    <img src={article.user.avatarUrl} onError={detectNoImage} alt="Avatar Image" /> :
                    <Skeketon borderRadius="50px" />
                }
                <div>{article.user.username}</div>
            </Avatar>
            <ActionButtons>
                <img src="/icons/heart.png" onError={detectNoImage} alt="Icon" />
                <div>
                    {article.likeCount}
                </div>
                <img src="/icons/bookmark.png" onError={detectNoImage} alt="Icon" />
            </ActionButtons>
        </BottomSection>
      </Card>
    ));
  };

  return <Wrapper>{renderCards()}</Wrapper>;
};

export default ArticleList;
