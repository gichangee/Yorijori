import styled from "styled-components";
import { flexCenterStyle } from "../../styles/common";

export const ModalContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100vh;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    ${flexCenterStyle}
`;

export const Modal = styled.div`
    width: 40rem;
    height: 30rem;
    background-color: white;
    position: relative;
    border-radius: 1rem;
    box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.25);
    z-index: 101;
    padding: 2rem;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: ${({ theme }) => theme.color.gray.dark};
    transition: color 0.3s ease;
    &:hover {
        color: ${({ theme }) => theme.color.point.green};
    }
`;
