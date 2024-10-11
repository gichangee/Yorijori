import styled from "styled-components";
import { flexCenterStyle } from "../../../styles/common";
import UpIcon from "../../../assets/icons/triangle-up.svg";
import DownIcon from "../../../assets/icons/triangle-down.svg";

export const ChartContainer = styled.div`
    ${flexCenterStyle}
    width: 10rem;
    cursor: pointer;
`;
export const PriceDetailWrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
`;
export const ChartWrapper = styled.div`
    margin: 1rem;
    width: 80%;
`;
export const ProductName = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h3};
`;
export const ProductLabel = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.h5};
`;
export const ProductInfo = styled.div`
    ${flexCenterStyle}
`;
export const PriceLabel = styled.span`
    font-size: 1.2rem;
    margin-right: 0.2rem;
    color: ${({ flag }) => (flag === "up" ? "#ff0000" : "#0018f4")};
`;
export const Up = styled(UpIcon)`
    width: 1.2rem;
    height: 1.2rem;
    fill: ${({ theme }) => theme.color.point.red};
`;
export const Down = styled(DownIcon)`
    width: 1.2rem;
    height: 1.2rem;
    fill: #0018f4;
`;
