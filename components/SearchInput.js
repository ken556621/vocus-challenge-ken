import { useCallback } from "react";

import styled from "styled-components";
import debounce from "lodash/debounce";

const Wrapper = styled.div`
    position: relative;
    margin-right: 15px;
    input {
        height: 23px;
        padding-left: 20px;
        border: 1px solid rgb(159, 147, 144);
        border-radius: ${props => props.theme.radius.second};
    }
    input::-webkit-input-placeholder {
        font-size: ${props => props.theme.fontSize.small};
    }
    }
    &:before {
        position: absolute;
        content: "🔍";
        left: 5px;
        top: 3px;
        font-size: 12px;
    }
`;

const SearchInput = props => {
    const {
        placeholder = "Type Something",
        handleSearchArticles = null
    } = props;

    const handleInputChange = (e) => {
        handleSearchArticles(e.target.value);
    };

    const inputChangeDebounce = useCallback(
        debounce(handleInputChange, 400)
    , []);

    return (
        <Wrapper>
            <input onChange={inputChangeDebounce} placeholder={placeholder} />
        </Wrapper>
    )
};

export default SearchInput;