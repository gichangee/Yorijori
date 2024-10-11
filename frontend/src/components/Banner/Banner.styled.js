import styled from "styled-components";

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 370px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    overflow: hidden;
    user-select: none;
    color: ${({ fontColor }) => fontColor};

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: -900px;
        width: 100%;
        height: 100%;
        background-color: ${({ pointColor }) => pointColor};
        transform: skewX(-20deg);
        transform-origin: top right;
        z-index: 1;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 45px;
    position: relative;
    z-index: 2;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
`;

export const TextSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SubTitle = styled.div`
    font-family: "SUITBold";
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const Title = styled.div`
    font-family: "LOTTERIADDAG";
    font-size: 60px;
`;

export const Link = styled.div`
    font-family: "SUITSemiBold";
    display: flex;
    gap: 2.8px;
    cursor: pointer;
`;

export const LinkText = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    border-bottom: 2px solid transparent;
    padding-bottom: 1px;
    transition: border-bottom 0.3s ease;

    &:hover {
        padding-bottom: 1px;
        border-bottom: 2px solid ${({ fontColor }) => fontColor};
    }
`;

export const Image = styled.img`
    height: 340px;
    object-fit: cover;
`;
