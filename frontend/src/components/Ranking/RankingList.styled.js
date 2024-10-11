import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
`;
export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Loader = styled.div`
    font-size: 24px;
    text-align: center;
    margin-top: 20px;
    font-family: "SUITSEMIBOLD";
`;

export const SearchInput = styled.input`
    margin-bottom: 20px;
    padding: 14px;
    width: 80%;
    box-sizing: border-box;
    border: none;
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border-radius: 5px;
    &:focus {
        outline: none;
        border: none;
    }
    &::placeholder {
        font-family: "SUITmedium";
        color: ${({ theme }) => theme.color.gray.dark};
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-radius: 5px;
    overflow: hidden;
    table-layout: fixed;
    border: 1px solid ${({ theme }) => theme.color.gray.lighter};
`;

export const Th = styled.th`
    background-color: #eaf0ec;
    padding: 15px;
    text-align: center;
    color: ${({ theme }) => theme.color.gray.darker};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: "SUITSEMIBOLD";
    width: ${(props) => props.width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Td = styled.td`
    padding: 10px 15px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: "SUITSEMIBOLD";
    width: ${(props) => props.width || "auto"};
    height: 70px;
    vertical-align: middle;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;

export const UserImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
`;

export const UserCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
`;

export const UserNavi = styled.span`
    cursor: pointer;
`;
export const RankText = styled.span`
    font-family: "SUITBOLD";
    font-size: 1.2em;
    color: #000;
`;
