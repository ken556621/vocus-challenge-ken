import styled from "styled-components";

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 16px 20px;
    box-shadow: ${props => props.theme.shadow.main};
    border-radius: ${props => props.theme.radius.main};
    text-align: center;
`;

const Title = styled.h1`
    font-size: ${props => props.theme.fontSize.h1};
    color: ${props => props.theme.color.main};
`;

const SubTitle = styled.h2`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.second};
`;

const Popup = (props) => {
    const {
        title = "",
        subTitle = ""
    } = props;

    return(
        <Wrapper>
            <Title>
                {title}
            </Title>
            <SubTitle>
                {subTitle}
            </SubTitle>
        </Wrapper>
    )
}

export default Popup;