// StyledComponents.js
import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

export const PageButton = styled.button`
    margin: 0 5px;
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #eaf0ec;
    color: black;
    font-family: "SUITBOLD";

    &:disabled {
        background-color: #4cac67; /* 비활성화 색상 */
        cursor: not-allowed;
        color: white;
    }

    &:hover {
        background-color: #d0d0d0;
    }
`;

export const PageButton2 = styled.button`
    margin: 0 5px;
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #eaf0ec;
    color: black;
    font-family: "SUITBOLD";
    &:hover {
        background-color: #d0d0d0;
    }
`;
