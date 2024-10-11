/* eslint-disable no-unused-vars */
import RecipeForm from "./../components/Post/RecipeForm";
import MaterialForm from "../components/Post/MaterialForm";
import OrderForm from "../components/Post/OrderForm";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { fetchCategories } from "../api/category";
import { useNavigate } from "react-router-dom";
import PostModal from "../components/Modal/PostModal";
import { postRecipe } from "../Api/recipe";

const CATEGORY_TYPES = {
    TYPE: "종류",
    SITUATION: "상황",
    INGREDIENT: "재료",
    METHOD: "방법",
};

const RegisterButton = styled.button`
    display: block;
    width: 150px;
    padding: 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: "SUITSEMIBOLD";
    font-size: ${({ theme }) => theme.fontSize.text};
    &:hover {
        background-color: #45a049;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Hr = styled.hr`
    margin-top: 50px;
    margin-bottom: 50px;
    border-top: 2px solid ${({ theme }) => theme.color.gray.light};
    width: 80%;
`;

const Emoji = styled.span`
    font-family: "tosseface";
`;

const FormSection = styled.div`
    scroll-margin-top: 20px;
`;

const PostRecipe = () => {
    const navigate = useNavigate();
    const recipeFormRef = useRef(null);
    const materialFormRef = useRef(null);
    const orderFormRef = useRef(null);

    const [recipeFormData, setRecipeFormData] = useState({
        title: "",
        name: "",
        intro: "",
        image: null,
        servings: "",
        time: "",
        level: "",
        cookingTools: "",
        type: "",
        situation: "",
        ingredients: "",
        method: "",
    });

    const [materialGroups, setMaterialGroups] = useState([
        {
            name: "재료",
            subtitle: "",
            amount: "",
            unit: "",
        },
    ]);

    const [orderSteps, setOrderSteps] = useState([
        { image: null, content: "", orderNum: 1 },
    ]);

    const [categories, setCategories] = useState({
        [CATEGORY_TYPES.TYPE]: [],
        [CATEGORY_TYPES.SITUATION]: [],
        [CATEGORY_TYPES.INGREDIENT]: [],
        [CATEGORY_TYPES.METHOD]: [],
    });

    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categorizedData = await fetchCategories();
                setCategories(categorizedData);
            } catch (error) {
                setModalMessage(
                    <>
                        <Emoji>⚠️</Emoji>카테고리 정보를 불러오는데 실패했습니다
                    </>,
                );
                setIsError(true);
                setIsModalOpen(true);
            }
        };
        getCategories();
    }, []);

    const validateRecipeForm = () => {
        const errors = [];

        if (!recipeFormData.title.trim()) {
            errors.push({ field: "title", message: "레시피명을 입력해주세요" });
        }
        if (!recipeFormData.image) {
            errors.push({
                field: "image",
                message: "대표 사진을 등록해주세요",
            });
        }
        if (!recipeFormData.intro.trim()) {
            errors.push({
                field: "intro",
                message: "요리 소개를 입력해주세요",
            });
        }
        if (!recipeFormData.type) {
            errors.push({ field: "type", message: "요리 종류를 선택해주세요" });
        }
        if (!recipeFormData.situation) {
            errors.push({
                field: "situation",
                message: "요리 상황을 선택해주세요",
            });
        }
        if (!recipeFormData.ingredients) {
            errors.push({
                field: "ingredients",
                message: "주 재료를 선택해주세요",
            });
        }
        if (!recipeFormData.method) {
            errors.push({
                field: "method",
                message: "조리 방법을 선택해주세요",
            });
        }
        if (!recipeFormData.servings) {
            errors.push({
                field: "servings",
                message: "몇 인분인지 선택해주세요",
            });
        }
        if (!recipeFormData.level) {
            errors.push({ field: "level", message: "난이도를 선택해주세요" });
        }
        if (!recipeFormData.time) {
            errors.push({ field: "time", message: "조리 시간을 선택해주세요" });
        }

        return errors;
    };

    const validateMaterialForm = () => {
        const errors = [];

        if (materialGroups.length === 0) {
            errors.push({
                field: "materials",
                message: "최소 하나의 재료 그룹이 필요합니다",
            });
            return errors;
        }

        materialGroups.forEach((group, groupIndex) => {
            if (!group.name.trim()) {
                errors.push({
                    field: `group-${groupIndex}`,
                    message: `${groupIndex + 1}번째 재료 그룹의 이름을 입력해주세요`,
                });
            }

            if (!group.subtitle.trim()) {
                errors.push({
                    field: `group-${groupIndex}`,
                    message: `${groupIndex + 1}번째 그룹의 서브타이틀을 입력해주세요`,
                });
            }
            if (!group.amount.trim()) {
                errors.push({
                    field: `group-${groupIndex}`,
                    message: `${groupIndex + 1}번째 그룹의 수량을 입력해주세요`,
                });
            }
            if (!group.unit.trim()) {
                errors.push({
                    field: `group-${groupIndex}`,
                    message: `${groupIndex + 1}번째 그룹의 단위를 입력해주세요`,
                });
            }
        });

        return errors;
    };

    const validateOrderForm = () => {
        const errors = [];

        if (orderSteps.length === 0) {
            errors.push({
                field: "orders",
                message: "최소 하나의 조리 순서가 필요합니다",
            });
            return errors;
        }

        orderSteps.forEach((step, index) => {
            if (!step.content.trim()) {
                errors.push({
                    field: `step-${index}`,
                    message: `STEP ${index + 1}의 조리 설명을 입력해주세요`,
                });
            }
        });

        return errors;
    };

    const scrollToError = (errors) => {
        if (errors.length === 0) return;

        const firstError = errors[0];
        let targetRef;
        let errorSection = "";

        if (firstError.field.startsWith("material")) {
            targetRef = materialFormRef;
            errorSection = "재료 정보";
        } else if (firstError.field.startsWith("step")) {
            targetRef = orderFormRef;
            errorSection = "조리 순서";
        } else {
            targetRef = recipeFormRef;
            errorSection = "기본 정보";
        }

        targetRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setModalMessage(
            <>
                <Emoji>⚠️</Emoji>
                {`${errorSection}의 ${firstError.message}`}
            </>,
        );
        setIsError(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        const recipeErrors = validateRecipeForm();
        const materialErrors = validateMaterialForm();
        const orderErrors = validateOrderForm();

        const allErrors = [...recipeErrors, ...materialErrors, ...orderErrors];

        if (allErrors.length > 0) {
            scrollToError(allErrors);
            return false;
        }

        const formData = new FormData();

        // 레시피 이미지 추가
        if (recipeFormData.image) {
            formData.append("recipeImage", recipeFormData.image);
        }

        // 조리 순서 이미지 추가
        orderSteps.forEach((step, index) => {
            if (step.image) {
                formData.append(`orderImages`, step.image);
            }
        });

        // 레시피 데이터 추가
        const recipeData = {
            title: recipeFormData.title,
            name: recipeFormData.name,
            intro: recipeFormData.intro,
            servings: recipeFormData.servings,
            time: recipeFormData.time,
            level: recipeFormData.level,
            type: recipeFormData.type,
            situation: recipeFormData.situation,
            ingredients: recipeFormData.ingredients,
            method: recipeFormData.method,
            recipeMaterials: materialGroups.map((group) => ({
                materialName: group.name,
                materialSubtitle: group.subtitle,
                materialAmount: group.amount,
                materialUnit: group.unit,
            })),
            recipeOrders: orderSteps.map((step, index) => ({
                orderNum: index + 1,
                orderContent: step.content,
            })),
        };

        formData.append(
            "recipe",
            new Blob([JSON.stringify(recipeData)], {
                type: "application/json",
            }),
        );

        try {
            const response = await postRecipe(formData);
            if (response) {
                setModalMessage(
                    <>
                        <Emoji>🍳</Emoji>레시피가 등록되었습니다!
                    </>,
                );
                setIsModalOpen(true);
                return true;
            }
        } catch (error) {
            setModalMessage(
                <>
                    <Emoji>⛔</Emoji>레시피 등록에 실패했습니다
                </>,
            );
            setIsError(true);
            setIsModalOpen(true);
        }

        return false;
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        if (!isError) {
            navigate("/recipe");
        }
        setIsError(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsError(false);
    };

    const handleRegister = async () => {
        const success = await handleSubmit();
        if (success) {
            // handleConfirm은 모달이 닫힐 때 자동으로 호출됩니다
        }
    };

    return (
        <div>
            {isModalOpen && (
                <PostModal
                    message={modalMessage}
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                    isError={isError}
                />
            )}
            <FormSection ref={recipeFormRef}>
                <RecipeForm
                    recipeData={recipeFormData}
                    setRecipeData={setRecipeFormData}
                    categories={categories}
                />
            </FormSection>
            <Hr />

            <FormSection ref={materialFormRef}>
                <MaterialForm
                    materialGroups={materialGroups}
                    setMaterialGroups={setMaterialGroups}
                />
            </FormSection>
            <Hr />

            <FormSection ref={orderFormRef}>
                <OrderForm
                    orderSteps={orderSteps}
                    setOrderSteps={setOrderSteps}
                />
            </FormSection>
            <Hr />
            <ButtonContainer>
                <RegisterButton onClick={handleRegister}>등록</RegisterButton>
            </ButtonContainer>
        </div>
    );
};

export default PostRecipe;
