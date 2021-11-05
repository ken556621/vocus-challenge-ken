import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: ${props => props.theme.backgroundColor.main};
`;

const Card = styled.div`
    width: 481px;
    padding: 16px 20px;
    box-shadow: ${props => props.theme.shadow.main};
    border: 1px solid #cbc3c2;
    border-radius: ${props => props.theme.radius.main};
    background-color: #ffffff;
    &:not(&:last-of-type) {
        margin-bottom: 21px;
    }
`;

const TopSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LeftSection = styled.div`
    margin-right: 30px;
`;

const RightSection = styled.div`
    
`;

const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: ${props => props.theme.fontSize.h1};
    color: ${props => props.theme.color.main};
`;

const Abstract = styled.h2`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.second};
`;

const Avatar = styled.div`
    display: flex;
    align-item: center;
    img {
        width: 30px;
        border-radius: 50%;
        margin-right: 7px;
    }
    div {
        color: #222222;
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
  const { articlesData = [] } = props;

  const renderCards = () => {
    return articlesData.map(article => (
      <Card key={article._id}>
        <TopSection>
            <LeftSection>
                <Title>{article.title}</Title>
                <Abstract>{article.abstract}</Abstract>
            </LeftSection>
            <RightSection>
                <ArticleImg>
                    <img src={article.thumbnailUrl} />
                </ArticleImg>
            </RightSection>
        </TopSection>
        <BottomSection>
            <Avatar>
                <img src={article.user.avatarUrl} />
                <div>
                    {article.user.username}
                </div>
            </Avatar>
            <ActionButtons>
                <img src="./icons/heart.png" />
                <div>
                    {article.likeCount}
                </div>
                <img src="./icons/bookmark.png" />
            </ActionButtons>
        </BottomSection>
      </Card>
    ));
  };

  return <Wrapper>{renderCards()}</Wrapper>;
};

export default ArticleList;
