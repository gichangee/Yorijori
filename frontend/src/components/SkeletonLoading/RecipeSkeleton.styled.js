import styled, { keyframes } from "styled-components";
import { CardList } from "../CardList/CardList.styled";
import { BaseCard } from "../Card/Card.styled";
import { cardBorderRadius } from "../Card/Card.styled";
cardBorderRadius;
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const SkeletonCardList = styled(CardList)`
    padding: 20px;
`;

export const SkeletonCard = styled(BaseCard)`
    width: 279px;
    background: white;
    overflow: hidden;
`;

export const SkeletonThumbnail = styled.div`
    height: 13.1rem;
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: ${cardBorderRadius};
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const SkeletonContent = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const SkeletonTitle = styled.div`
    height: 24px;
    width: 75%;
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: 4px;
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const SkeletonText = styled.div`
    height: 16px;
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: 4px;
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    width: ${(props) => props.width || "100%"};
`;

export const SkeletonProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
`;

export const SkeletonAvatar = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.gray.lighter};
    animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
