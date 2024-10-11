import styled from "styled-components";
import cook from "../../assets/icons/cook.svg";
import sleeping from "../../assets/icons/sleeping.svg";

export const Login = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 2.4rem;
`;

export const Icon = styled(cook)`
    width: 170px;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-left: 1.4rem;
    padding-right: 1.4rem;
    padding-bottom: 2.4rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.lighter};
`;

export const Title = styled.div`
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.h3};
    line-height: 27px;
`;

export const Text = styled.div`
    font-family: "SUITRegular";
    font-size: ${({ theme }) => theme.fontSize.text};
    line-height: 19.3px;
    color: ${({ theme }) => theme.color.gray.dark};
`;

export const LoginButton = styled.button`
    background-color: transparent;
    border: none;
    color: none;
    cursor: pointer;
`;

export const LoginButtonImage = styled.img`
    height: 50px;
`;

export const Loading = styled.section`
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 2.14rem;
    justify-content: center;
    align-items: center;
`;

export const LoadingIcon = styled(sleeping)`
    width: 170px;
`;

export const LoadingText = styled(Title)`
    white-space: nowrap;
    overflow: hidden;
`;
