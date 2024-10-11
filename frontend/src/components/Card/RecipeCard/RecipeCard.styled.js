import styled from "styled-components";
import {
    cardBorderRadius,
    BaseCard,
    BaseThumnail,
    BaseTitle,
    BaseText,
    BaseTextArea,
} from "../Card.styled";

// 기존 카드 스타일
export const RecipeCard = styled(BaseCard)`
    width: 279px;
`;

export const Thumnail = styled(BaseThumnail)`
    height: 13.1rem;
    border-radius: ${cardBorderRadius};
`;

export const TextArea = styled(BaseTextArea)`
    gap: ${({ theme }) => theme.fontSize.subText};
    padding-left: 12px;
    padding-right: 12px;
`;

export const Title = styled(BaseTitle)`
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const Text = styled(BaseText)`
    height: 63px;
    line-height: 21px;
    font-size: ${({ theme }) => theme.fontSize.text};
`;

export const Profile = styled.div`
    display: flex;
    gap: 12px;
    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.text};
    align-items: center;
`;

// 스켈레톤 스타일 추가
export const SkeletonCard = styled(RecipeCard)`
    background-color: #e0e0e0;
    animation: pulse 1.5s infinite;
    border-radius: ${cardBorderRadius};

    @keyframes pulse {
        0% {
            background-color: #e0e0e0;
        }
        50% {
            background-color: #d0d0d0;
        }
        100% {
            background-color: #e0e0e0;
        }
    }
`;

export const SkeletonThumbnail = styled(Thumnail)`
    background-color: #e0e0e0;
    height: 13.1rem;
`;

export const SkeletonTextArea = styled(TextArea)`
    background-color: #e0e0e0;
    height: 60px; /* 스켈레톤의 높이 */
    margin: 10px 0;
`;

export const SkeletonTitle = styled(Title)`
    background-color: #e0e0e0;
    height: 20px; /* 스켈레톤의 높이 */
    width: 70%; /* 스켈레톤의 너비 */
`;

// CardList 스타일
export const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    cursor: pointer;
`;
