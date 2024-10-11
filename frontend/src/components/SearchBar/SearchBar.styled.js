import styled from "styled-components";
export const SearchBar = styled.div`
    display: flex;
    position: relative;
    height: 81px;
    width: 700px;
    margin: 25px auto;
    cursor: text;
`;

export const Container = styled.div`
    display: flex;

    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;

    width: 700px;
    height: fit-content;
    overflow: hidden;
    gap: 12px;

    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;

    border-radius: ${(isActive) => (isActive ? "3.125rem" : "6.25rem")};

    background-color: white;
    z-index: 100;

    border: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
`;

export const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;

    box-sizing: border-box;
    padding-left: 40px;
    padding-right: 50px;
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;

    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.h4};

    &:focus {
        border: none;
        outline: none;
    }
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.313rem;
    width: 100%;
    pointer-events: none;

    .plain {
        font-family: "SUITMedium";
        font-size: ${({ theme }) => theme.fontSize.h4};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }

    .bold {
        font-family: "SUITSemiBold";
        font-size: ${({ theme }) => theme.fontSize.text};
    }

    .gray {
        font-family: "SUITMedium";
        font-size: ${({ theme }) => theme.fontSize.subText};
        color: ${({ theme }) => theme.color.gray.light};
    }
`;

export const Icon = styled.div`
    font-family: "TossFace";
    font-size: 1.875rem;
`;

export const HistoryList = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    margin-top: 14px;
    margin-bottom: 10px;
`;

export const History = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    padding-top: 12px;
    padding-bottom: 12px;

    box-sizing: border-box;
    padding-left: 40px;
    padding-right: 40px;

    gap: 32px;

    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.color.point.lightGreen};
    }
`;

export const HistoryText = styled.div`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-family: "SUITLight";
    font-size: ${({ theme }) => theme.fontSize.text};
`;

export const DeleteButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;

    font-family: "SUITMedium";
    font-size: ${({ theme }) => theme.fontSize.subText};
    color: ${({ theme }) => theme.color.gray.light};
`;
