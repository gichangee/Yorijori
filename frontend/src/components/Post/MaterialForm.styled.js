import styled from "styled-components";

export const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
`;

export const TitleContainer = styled.div`
    text-align: left;
    margin-bottom: 30px;
`;

export const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.h3};
    color: #333;
    margin-bottom: 10px;
    font-family: "SUITEXTRABOLD";
`;

export const SubTitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.subText};
    color: #888;
    font-family: "SUITSEMIBOLD";
`;

export const GroupContainer = styled.div`
    margin-bottom: 30px;
    justify-content: center;
`;

export const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const InputField = styled.input`
    flex: 1;
    padding: 12px;
    margin-right: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: "SUITRegular";
    background-color: #f2f2f2;

    &:last-child {
        margin-right: 0;
    }

    &::placeholder {
        color: #bbb;
    }
`;

export const GroupLabel = styled(InputField)`
    background-color: white;
    border: 1px solid ${({ theme }) => theme.color.gray.light};
    margin-bottom: 10px;
    font-family: "SUITRegular";

    &::placeholder {
        color: ${({ theme }) => theme.color.gray.light};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const AddButton = styled.button`
    background-color: #4cac67;
    color: white;
    padding: 12px 20px;
    border: solid 1px ${({ theme }) => theme.color.gray.light};
    border-radius: 20px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: "SUITSEMIBOLD";
    width: 20%;
    margin-top: 10px;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const AddGroupButton = styled(AddButton)`
    background-color: white;
    color: #888;
    margin-top: 20px;
    color: black;

    &:hover {
        background-color: #f9f9f9;
    }
`;

export const RemoveButton = styled.button`
    position: flex;
    background: ${({ theme }) => theme.color.gray.light};
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    height: 20px;
`;

export const FormLayout = styled.div`
    display: flex;
    gap: 20px;
`;
