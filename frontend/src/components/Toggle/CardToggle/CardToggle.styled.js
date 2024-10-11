import styled from "styled-components";
import { flexCenterStyle } from "../../../styles/common";

export const CardToggle = styled.div`
    height: 133px;
    width: 138px;
    gap: 30px;

    background-color: ${({ isActive, theme }) =>
        isActive ? theme.color.point.lightGreen : "#FFFFFF"};

    ${flexCenterStyle};
    flex-direction: column;

    border-radius: 20px;
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.1);

    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.color.point.lightGreen};
    }
`;

export const Image = styled.img`
    width: 58px;
    height: 37.82px;
    object-fit: contain;
    object-position: center;
`;

export const Text = styled.div`
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.text};
`;
