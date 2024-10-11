import styled from "styled-components";

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1.25rem;
    padding: 3.125rem;
    height: fit-content;
    background-color: ${({ theme }) => theme.color.gray.darker};
    margin-top: 100px;
`;

export const FooterLogo = styled.img`
    width: 4.813rem;
`;

export const Info = styled.div`
    font-family: "SUITRegular";
    color: ${({ theme }) => theme.color.gray.light};
    font-size: ${({ theme }) => theme.fontSize.subText};
    padding: 0.17rem;
    line-height: 1.7;
    text-align: center;
`;
