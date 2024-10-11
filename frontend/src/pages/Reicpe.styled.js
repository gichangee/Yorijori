import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const PopularRecipe = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize.h3};
`;

export const Emoji = styled.span`
    font-family: "tosseface";
`;

export const NoResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh; // 화면 중앙에 배치
`;

export const NoResult = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    display: flex;
    align-items: center;
    font-size: 24px; // 원하는 크기로 조정
    color: #555; // 원하는 색상으로 조정
`;
