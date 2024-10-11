import styled from "styled-components";
import { flexStartStyle } from "../../styles/common";

export const Wrapper = styled.div`
    ${flexStartStyle}
    width: 100%;
    margin: 1rem;
    font-size: ${({ theme }) => theme.fontSize.h3};
`;
export const Emoji = styled.div`
    font-family: "TossFace";
`;
export const Label = styled.div`
    margin-left: 1rem;
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
