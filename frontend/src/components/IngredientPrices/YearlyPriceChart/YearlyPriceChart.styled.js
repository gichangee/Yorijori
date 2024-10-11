import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../../styles/common";

export const ChartWrapper = styled.div`
    width: 85%;
`;
export const TagWrapper = styled.div`
    width: 80%;
    ${flexCenterStyle}
    margin-top: -1rem;
`;
export const Wrapper = styled.div`
    width: 100%;
    ${flexStartStyle}
    height: 15rem;
    padding: 0.5rem 0;
    flex-direction: column;
`;
