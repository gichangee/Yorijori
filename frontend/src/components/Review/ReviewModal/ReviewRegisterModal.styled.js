import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const ModalTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const ImageUploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 2px dashed #ccc;
    border-radius: 8px;
    height: 150px;
    position: relative;
`;

export const ImageUploadArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ccc;
`;

export const UploadIcon = styled.div`
    font-size: 2em;
`;

export const UploadText = styled.div`
    margin-top: 10px;
`;

export const UploadButton = styled.button`
    margin-top: 10px;
    padding: 8px 16px;
    border: none;
    background: #4caf50;
    color: white;
    border-radius: 4px;
    cursor: pointer;
`;

export const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 150px;
    border-radius: 8px;
`;

export const ReviewInput = styled.textarea`
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 20px;
    resize: none;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    background: #4caf50;
    color: white;
    border-radius: 4px;
    cursor: pointer;
`;

export const CancelButton = styled.button`
    padding: 10px 20px;
    border: none;
    background: #ccc;
    color: white;
    border-radius: 4px;
    cursor: pointer;
`;
