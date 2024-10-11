import styled from "styled-components";
export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-family: "SUITSemiBold";
    color: ${({ theme }) => theme.color.gray.light};
    cursor: pointer;
`;

export const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 445px;
    min-height: 494px;
`;

export const TabButtons = styled.div`
    display: flex;
    justify-content: center;
    gap: 20%;
    border-bottom: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
`;

export const TabButton = styled.button`
    font-family: "SUITSemiBold";
    font-size: ${({ theme }) => theme.fontSize.text};
    color: ${({ isActive, theme }) =>
        isActive ? theme.color.point.green : "#000"};
    background-color: transparent;
    border: none;
    height: 3.5rem;
    border-bottom: 0.063rem solid
        ${({ isActive, theme }) =>
            isActive ? theme.color.point.green : "none"};
    cursor: pointer;
`;

export const UserList = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
`;

export const UserListItem = styled.div`
    display: flex;
    padding: 18px;
    padding-left: 28px;
    padding-right: 28px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
`;

export const UserNickname = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    cursor: pointer;
`;

export const FollowButton = styled.button`
    color: white;
    background-color: ${({ theme }) => theme.color.point.green};
    border: none;
    padding: 8px;
    border-radius: 5px;
    font-size: ${({ theme }) => theme.fontSize.subText};

    &:hover {
        background-color: #3e8d55;
    }

    &:active {
        background-color: #367a4a;
    }
`;
