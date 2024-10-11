import styled from "styled-components";

export const MenuBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: fit-content;
    padding: 1.4rem 3.125rem 1.2rem 5rem;
`;

export const LogoImage = styled.img`
    height: 66px;
    cursor: pointer;
    user-select: none;
`;

export const LinkContainer = styled.ul`
    display: flex;
    align-items: center;
    gap: 1.4rem;
    list-style: none;
`;

export const Link = styled.li`
    font-family: "SuitSemiBold";
    font-size: ${({ theme }) => theme.fontSize.text};
    list-style: none;
    cursor: pointer;
    user-select: none;

    padding: 0.5rem;
    position: relative;
    display: inline-block;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: ${({ theme }) => theme.color.point.green};
        border-radius: 5px;
        bottom: -10px;
        left: 0;
        transform: scaleX(0);
        transition: all 0.6s ease;
    }

    &:hover::before {
        transform: scaleX(1);
    }

    &:active {
        color: ${({ theme }) => theme.color.point.green};
    }
`;
