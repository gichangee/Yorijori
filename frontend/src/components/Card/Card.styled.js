import styled from "styled-components";

export const cardBorderRadius = "10px";

export const BaseCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
    box-sizing: border-box;
    padding-bottom: 28px;
`;

export const BaseThumnail = styled.img`
    width: 100%;
    object-fit: cover;
    object-position: center;
    flex-shrink: 0;
`;

export const BaseTextArea = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const BaseTitle = styled.div`
    width: 100%;
    font-family: "SUITSemiBold";
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const BaseText = styled.div`
    font-family: "SUITRegular";
    overflow: hidden;
`;
