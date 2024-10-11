import CryingIcon from "../../assets/icons/crying.svg";
import styled from "styled-components";

export const Notfound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5rem;
    gap: 2.4rem;
`;

export const Icon = styled(CryingIcon)`
    width: 170px;
`;

export const ErrorCode = styled.div`
    text-align: center;
    font-family: "SUITHeavy";
    color: #56804a;
    font-size: ${({ theme }) => theme.fontSize.h1};
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const Title = styled.div`
    text-align: center;
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h4};
    line-height: 27px;
`;

export const Text = styled.div`
    text-align: center;
    font-family: "SUITRegular";
    font-size: ${({ theme }) => theme.fontSize.subText};
    line-height: 19.3px;
    color: ${({ theme }) => theme.color.gray.dark};
`;
