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

export const FormLayout = styled.div`
    display: flex;
    gap: 20px;
`;

export const StepList = styled.div`
    flex: 0 0 120px;
`;

export const StepButton = styled.button`
    font-family: "SUITmedium";
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${(props) => (props.active ? "#4CAF50" : "#E0E0E0")};
    color: ${(props) => (props.active ? "#FFFFFF" : "#333333")};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => (props.active ? "#45a049" : "#D0D0D0")};
    }
`;

export const ContentArea = styled.div`
    display: grid;
    grid-template-areas:
        "image content"
        "image tool";
    gap: 20px;
    margin-left: 100px;
`;

export const ImageUpload = styled.div`
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
    align-self: center;
    font-size: ${({ theme }) => theme.fontSize.text};
`;

export const ButtonContainer = styled.div`
    text-align: center;
    cursor: pointer;
`;

export const TextArea = styled.textarea`
    width: 400px;
    height: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: #f2f2f2;
    font-family: "SUITREgular";
    font-size: ${({ theme }) => theme.fontSize.subText};
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f2f2f2;
    font-family: "SUITREgular";
    font-size: ${({ theme }) => theme.fontSize.subText};
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

export const Text = styled.p`
    font-size: ${({ theme }) => theme.fontSize.text};
    color: ${({ theme }) => theme.color.gray.light};
    margin-top: 10px;
    font-family: "SUITSEMIBOLD";
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-family: "SUITSEMIBOLD";
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: image;
    gap: 10px;
`;

export const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: content;
    gap: 10px;
`;
export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: tool;
    gap: 10px;
`;
export const ImageContainer2 = styled.div`
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

export const RemoveButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: #aaaaaa;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
`;
export const RemoveButton2 = styled.button`
    position: absolute;
    top: 8px;
    right: 5px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    z-index: 1;
`;
