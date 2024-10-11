import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    height: auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

export const Message = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
    font-family: "SUITBoLd";
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

export const CloseButton = styled.button`
    padding: 10px 15px;
    background-color: ${({ isError }) => (isError ? "#AAAAAA" : "#4caf50")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    font-family: "SUITRegular";

    &:hover {
        background-color: ${({ isError }) => (isError ? "#AAA" : "#45a049")};
    }
`;

export const Emoji = styled.span`
    font-family: "TossFace";
`;
