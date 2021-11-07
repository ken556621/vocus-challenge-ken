import { useState, useEffect, useRef } from "react";

import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    color: rgb(159, 147, 144);
    font-size: ${props => props.theme.fontSize.small};
    border: 1px solid rgb(203, 195, 194);
    border-radius: 3px;
    cursor: pointer;
    padding: 4px 14px;
    background-color: #f9f7f5;
    img {
        width: 16px;
        margin-left: 5px;
        color: red;
    }
`;

const Dropdown = styled.div`
    position: absolute;
    width: 100%;
    transform: translate(0px, 7px);
    padding: 10px 15px;
    font-size: ${props => props.theme.fontSize.normal};
    color: rgb(102, 94, 92);
    background-color: #ffffff;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: ${props => props.theme.radius.second};
    div {
        cursor: pointer;
        &:hover {
            padding: 2px;
            background-color: #f9f7f5;
            border-radius: ${props => props.theme.radius.second};
        }
    }
    span {
        margin-left: 8px;
    }
`;

const SortDropdown = (props) => {
    const {
        articlesOrder = "des",
        handleOrderArticles = null
    } = props;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const wrapperRef = useRef(null); 

    const openDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const changeOrder = (newOrder) => {
        handleOrderArticles(newOrder)
        setIsDropdownOpen(false)
    };

    const useOutsideClick = ref => {
        useEffect(() => {
            const handleClickOutside = event => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsDropdownOpen(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };

    useOutsideClick(wrapperRef)

    return (
        <Wrapper ref={wrapperRef}>
            <Button onClick={openDropdown}>
                排序
                <img src={"/icons/sort.png"} />
            </Button>
            {
                isDropdownOpen ? (
                    <Dropdown order={articlesOrder}>
                        <div onClick={() => changeOrder("des")}>
                            由新到舊
                        {
                            articlesOrder === "des" &&
                            <span>✓</span>
                        }
                        </div>
                        <div onClick={() => changeOrder("asc")}>
                            由舊到新
                        {
                            articlesOrder === "asc" &&
                            <span>✓</span>
                        }
                        </div>
                    </Dropdown>
                ) : null
            }
        </Wrapper>
    )
}

export default SortDropdown;