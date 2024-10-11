import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 30px;

    width: 70%;
    margin: 0 auto;
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    font-family: "SUITSemibold";
    font-size: ${({ theme }) => theme.fontSize.text};
    margin-bottom: 15px;
`;

export const CookingIcon = styled.span`
    font-size: ${({ theme }) => theme.fontSize.h3};
    margin-right: 10px;
    font-family: "TossFace";
`;

export const ProgressBarWrapper = styled.div`
    width: 95%;
    margin: 0 auto;
`;

export const ProgressBarContainer = styled.div`
    background-color: #f0f0f0;
    border-radius: 10px;
    height: 13px;
    width: 100%;
`;

export const ProgressBar = styled.div`
    background-color: ${({ color }) => color};
    border-radius: 10px;
    height: 100%;
    width: ${({ progress }) => progress}%;
`;

export const LevelInfo = styled.p`
    text-align: right;
    font-size: ${({ theme }) => theme.fontSize.subText};
    color: ${({ theme }) => theme.color.gray.light};
    margin-top: 5px;
`;

export const Text = styled.div`
    font-family: "SUITBold";
    font-size: ${({ theme }) => theme.fontSize.text};
    padding: 8px;
`;

export const TextWrapper = styled.div`
    display: flex;
    gap: 6px;

    .level {
        font-family: "SUITHeavy";
    }
`;
