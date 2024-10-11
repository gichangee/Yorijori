import styled from "styled-components";

export const ModifyProfile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const ProfileImageWrapper = styled.div`
    position: relative;
    margin: 0 auto;
    cursor: pointer;

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        font-family: "SUITMedium";
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:hover .overlay {
        opacity: 1;
    }
`;

export const AllergyList = styled.div`
    width: 70%;
    margin: 0 auto;
`;

export const FileInput = styled.input`
    display: none;
`;
