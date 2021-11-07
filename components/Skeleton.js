import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const ImageSkeleton = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: ${props => props.borderRadius};
    position: relative;
    background-color: #DDDBDD;
    overflow: hidden;
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-color: rgba(255,255,255,.4);
        opacity: 0.8
        background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
        );
        animation: ${shimmer} 2s infinite;
        content: '';
    }
`;

const WordSkeleton = styled.div`
    display: inline-block;
    width: 100%;
    height: 1em;
    position: relative;
    overflow: hidden;
    background-color: #DDDBDD;
    &:last-of-type {
        width: 70%;
    }
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-color: rgba(255,255,255,.4);
        opacity: 0.8
        background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
        );
        animation: ${shimmer} 2s infinite;
        content: '';
    }
`; 

const Skeketon = props => {
    const {
        type = "image",
        width = "30px",
        height = "30px",
        borderRadius = "6px",
        lineCount = 1 
    } = props;

    const wordSkeletonArray = [];
    for (let i = 0; i < lineCount; i++) {
        wordSkeletonArray.push(i)
    }

    switch (type) {
        case "image":
            return (
                <ImageSkeleton 
                    width={width}
                    height={height}
                    borderRadius={borderRadius}
                />
            )
        case "word": 
            return (
                wordSkeletonArray.map((item, index) => (
                    <WordSkeleton key={index} />
                ))
            )
        default:
            return (
                wordSkeletonArray.map((item, index) => (
                    <WordSkeleton key={index} />
                ))
            )
    }
};

export default Skeketon;