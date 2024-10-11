import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const ResultHeader = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize?.h3 || "24px"};
`;

export const PopularRecipe = styled.h2`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    margin-left: 50px;
    font-size: ${({ theme }) => theme.fontSize?.h3 || "24px"};
`;

export const Emoji = styled.span`
    font-family: "tossface";
`;

export const NoResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 40px;
`;

export const NoResult = styled.h2`
    font-family: "SUITBOLD";
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${({ theme }) => theme.fontSize?.h4 || "24px"};
`;

export const NoResultSearch = styled.div`
    font-family: "SUITEXTRABOLD";
    padding: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors?.primary || "#0066ff"};

    &:hover {
        text-decoration: underline;
    }
`;

export const RecipeCardListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
`;

export const LoadingSpinner = styled.div`
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 8px solid ${({ theme }) => theme.colors?.primary || "#0066ff"};
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
`;
