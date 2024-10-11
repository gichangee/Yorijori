import styled from "styled-components";
import { flexStartStyle } from "../../../styles/common";

export const Wrapper = styled.div`
    ${flexStartStyle}
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.text};
`;
export const Emoji = styled.div`
    font-family: "TossFace";
`;
export const Allergy = styled.div`
    color: ${({ theme }) => theme.color.point.red};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    display: flex;
    margin: 0 0.3rem 0 0.2rem;
`;
