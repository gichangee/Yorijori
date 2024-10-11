import styled from "styled-components";

export const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

export const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

export const Label = styled.label`
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

export const RatingWrapper = styled.div`
    margin-bottom: 20px;
`;

export const FileInput = styled.input`
    margin: 10px 0;
`;

export const PreviewImage = styled.img`
    width: 200px;
    height: auto;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
`;
