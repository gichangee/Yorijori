import styled, { keyframes, css } from "styled-components";
import LeftArrowIcon from "../../assets/icons/left-arrow.svg";
import RightArrowIcon from "../../assets/icons/right-arrow.svg";
import RecordIcon from "../../assets/icons/record.svg";
import {
    flexCenterStyle,
    flexAroundStyle,
    flexStartStyle,
    IconStyle,
} from "../../styles/common";

export const RecipeNavigationContainer = styled.div`
    ${flexAroundStyle};
    width: 80%;
    height: 70%;
`;
export const LeftArrow = styled(LeftArrowIcon)`
    ${IconStyle}
`;

export const RightArrow = styled(RightArrowIcon)`
    ${IconStyle}
`;
export const RecipeImg = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 1rem;
`;

export const AudioVisualizerWrapper = styled.div`
    position: absolute;
    width: 100%;
    margin-top: 1rem;
`;
export const RecordWrapper = styled.div`
    ${flexCenterStyle}
`;

export const RecipeContentWrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    height: 100%;
    margin-top: 1rem;
`;

export const AlertMessageContainer = styled.div`
    ${flexCenterStyle}
`;
export const AlertIcon = styled.div`
    font-family: "TossFace";
    font-size: ${({ theme }) => theme.fontSize.h4};
`;
export const AlertMessage = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h5};
    margin-left: 0.5rem;
`;

export const RecipeInfo = styled.div`
    ${flexStartStyle}
    width: 70%;
`;
export const RecipeText = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.medium};
    margin-left: 1rem;
`;

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2); 
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2); 
  }
`;

export const Record = styled(RecordIcon)`
    width: 3rem;
    height: 3rem;

    padding: 0.5rem;
    margin-top: 1rem;
    border-radius: 50%;

    z-index: 1;
    cursor: pointer;

    font-size: ${({ theme }) => theme.fontSize.h3};
    fill: ${({ theme, isClicked }) =>
        isClicked ? "black" : theme.color.point.lightGreen};
    background-color: ${({ theme, isClicked }) =>
        isClicked ? theme.color.point.lightGreen : theme.color.point.green};

    box-shadow: ${({ isClicked }) =>
        isClicked
            ? "0px 8px 16px rgba(0, 0, 0, 0.2)"
            : "0px 4px 8px rgba(0, 0, 0, 0.1)"};

    transition:
        box-shadow 0.4s ease,
        fill 0.4s ease,
        background-color 0.4s ease;

    ${({ isClicked }) =>
        isClicked &&
        css`
            animation: ${pulseAnimation} 1.3s infinite;
        `}
`;
