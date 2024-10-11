import styled from "styled-components";

export const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: ${({ theme }) => theme.fontSize.h3};
    color: #333;
    margin-bottom: 10px;
    font-family: "SUITEXTRABOLD";
`;

export const Form = styled.form`
    display: grid;
    grid-template-areas:
        "title title"
        "name image"
        "description image"
        "category image"
        "bottom none";
    gap: 20px;
`;

export const InputGroup = styled.div`
    grid-area: name;
    display: flex;
    flex-direction: column;
`;

export const InputGroup2 = styled.div`
    grid-area: description;
    display: flex;
    flex-direction: column;
`;

export const InputGroup3 = styled.div`
    grid-area: image;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputGroup4 = styled.div`
    grid-area: category;
    display: flex;
    flex-direction: column;
`;

export const InputGroup5 = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-family: "SUITSEMIBOLD";
    font-size: ${({ theme }) => theme.fontSize.text};
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f2f2f2;
    font-family: "suitmedium";
`;

export const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 80px;
    resize: none;
    background-color: #f2f2f2;
    font-family: "suitmedium";
`;

export const Select = styled.select`
    background-color: #f2f2f2;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: "SUITREGULAR";
    color: ${({ theme }) => theme.color.gray.light};

    option {
        color: black;
    }

    &:focus {
        outline: none;
        border-color: #aaa;
    }

    &:hover {
        border-color: #aaa;
    }
`;

export const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

export const ImageUploadButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed #ccc;
    border-radius: 4px;
    padding: 20px;
    background-color: #f2f2f2;
    width: 200px;
    height: 200px;
    cursor: pointer;
    position: relative;
    margin: 20px 0;
    align-self: center;
    font-size: ${({ theme }) => theme.fontSize.subText};
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 200px;
    height: 200px;
    padding: 20px;
    border: 1px solid;
    position: relative;
    border-radius: 4px;
`;
export const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
`;

export const BottomRow = styled.div`
    grid-area: bottom;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: #aaaaaa;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
`;

export const ButtonContainer = styled.div`
    text-align: center; /* 텍스트 중앙 정렬 */
`;

export const Text = styled.p`
    font-size: 22px;
    color: ${({ theme }) => theme.color.gray.light};
    margin-top: 10px;
    font-family: "SUITSEMIBOLD";
    font-size: ${({ theme }) => theme.fontSize.text};
`;
