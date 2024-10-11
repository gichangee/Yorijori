import { useState } from "react";
import PropTypes from "prop-types";
import {
    Container,
    Title,
    SubTitle,
    FormLayout,
    StepList,
    StepButton,
    ContentArea,
    ImageUpload,
    TextArea,
    TitleContainer,
    ButtonContainer,
    Text,
    Label,
    ImageContainer,
    TextContainer,
    RemoveButton,
    ImagePreview,
    ImageContainer2,
    RemoveButton2,
} from "./OrderForm.styled";
import VectorImage from "/src/img/Vector.png";

const OrderForm = ({ orderSteps, setOrderSteps }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleAddStep = () => {
        const newStep = {
            image: null,
            content: "",
            orderNum: orderSteps.length + 1,
        };
        setOrderSteps([...orderSteps, newStep]);
        setActiveStep(orderSteps.length);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newSteps = [...orderSteps];
            newSteps[activeStep].image = file;
            setOrderSteps(newSteps);
        }
    };

    const handleContentChange = (event) => {
        const newSteps = [...orderSteps];
        newSteps[activeStep].content = event.target.value;
        setOrderSteps(newSteps);
    };

    const handleImageRemove = (e) => {
        e.stopPropagation();
        const newSteps = [...orderSteps];
        newSteps[activeStep].image = null;
        setOrderSteps(newSteps);
    };

    const handleRemoveStep = (index) => {
        const newSteps = [...orderSteps];
        newSteps.splice(index, 1);
        setOrderSteps(newSteps);
        // Adjust activeStep if necessary
        if (activeStep >= newSteps.length) {
            setActiveStep(newSteps.length - 1);
        }
    };

    return (
        <Container>
            <TitleContainer>
                <Title>요리 방법</Title>
                <SubTitle>
                    요리순서에 맞게 사진과 요리방법을 입력해 주세요
                </SubTitle>
            </TitleContainer>
            <FormLayout>
                <StepList>
                    {orderSteps.map((_, index) => (
                        <div key={index} style={{ position: "relative" }}>
                            <StepButton
                                active={activeStep === index}
                                onClick={() => setActiveStep(index)}
                            >
                                STEP {index + 1}
                                {index > 0 && ( // 첫 번째 항목이 아닐 때만 삭제 버튼 표시
                                    <RemoveButton2
                                        onClick={() => handleRemoveStep(index)}
                                        title="삭제"
                                    >
                                        X
                                    </RemoveButton2>
                                )}
                            </StepButton>
                        </div>
                    ))}
                    <StepButton onClick={handleAddStep}>+</StepButton>
                </StepList>
                <ContentArea>
                    <ImageContainer>
                        <Label>조리사진</Label>
                        {orderSteps[activeStep]?.image ? (
                            <ImageContainer2>
                                <ImagePreview
                                    src={URL.createObjectURL(
                                        orderSteps[activeStep].image,
                                    )}
                                    alt="조리 과정"
                                />
                                <RemoveButton onClick={handleImageRemove}>
                                    X
                                </RemoveButton>
                            </ImageContainer2>
                        ) : (
                            <ImageUpload
                                onClick={() =>
                                    document
                                        .getElementById("imageUpload")
                                        .click()
                                }
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    id="imageUpload"
                                />
                                <ButtonContainer>
                                    <img
                                        src={VectorImage}
                                        alt="업로드 아이콘"
                                    />
                                    <Text>조리사진 등록</Text>
                                </ButtonContainer>
                            </ImageUpload>
                        )}
                    </ImageContainer>

                    <TextContainer>
                        <Label>조리설명</Label>
                        <TextArea
                            placeholder="ex) 비커에 물과 커피 가루를 넣고 젓는다"
                            value={orderSteps[activeStep]?.content || ""}
                            onChange={handleContentChange}
                        />
                    </TextContainer>
                </ContentArea>
            </FormLayout>
        </Container>
    );
};

// PropTypes 추가
OrderForm.propTypes = {
    orderSteps: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.instanceOf(File),
            content: PropTypes.string.isRequired,
            orderNum: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setOrderSteps: PropTypes.func.isRequired,
};

export default OrderForm;
