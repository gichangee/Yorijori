import styled from "styled-components";

export const TableSheet = styled.table`
    width: 80%;
    margin-top: 1rem;
    border-collapse: collapse;
`;

export const TableHead = styled.thead`
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const Header = styled.tr`
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.light};
`;

export const Th = styled.th`
    padding-bottom: 1.25rem;
`;

export const Tbody = styled.tbody``;
export const Tr = styled.tr`
    border-bottom: 1px solid #ddd;
`;

export const Td = styled.td`
    padding: 1rem;
    width: 20%;
    border-bottom: 1px solid #ddd;
    text-align: center;
    vertical-align: middle;
    font-family: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.text};
    img {
        border-radius: ${({ theme }) => theme.borderRadius.small};
    }
`;

export const RemoveTd = styled.td`
    text-align: center;
    vertical-align: middle;
    width: 5%;
`;
