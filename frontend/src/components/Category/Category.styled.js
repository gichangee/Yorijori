import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 1440px;
`;

export const CategorySection = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
`;

export const CategoryTitle = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.h4};
    text-align: center;
    background-color: #4cac67;
    padding: 20px;
    color: white;
    font-family: "SUITSemiBold";
    margin-right: 10px;
    margin-left: 30px;
`;

export const CategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CategoryItem = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    border-radius: 8px;
    margin: 5px;
    padding: 5px 3px;
    text-align: center;
    cursor: pointer;
    font-family: ${(props) =>
        props.selected ? "SUITExtraBold" : "SUITregular"};
    color: ${(props) =>
        props.selected ? "#4cac67" : props.theme.color.gray.dark};
    transition: all 0.2s ease-in-out;

    &:hover {
        color: #4cac67;
        background-color: rgba(76, 172, 103, 0.1);
    }
`;
