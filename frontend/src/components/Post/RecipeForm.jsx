import { PropTypes } from "prop-types";
import {
    Container,
    Title,
    Form,
    InputGroup,
    InputGroup2,
    InputGroup3,
    InputGroup4,
    InputGroup5,
    Label,
    Input,
    TextArea,
    Select,
    CategoryGroup,
    ImageUploadButton,
    ImagePreview,
    BottomRow,
    CloseButton,
    ButtonContainer,
    Text,
    ImageContainer,
} from "./RecipeForm.styled";
import VectorImage from "/src/img/Vector.png";

const CATEGORY_TYPES = {
    TYPE: "종류",
    SITUATION: "상황",
    INGREDIENT: "재료",
    METHOD: "방법",
};

const RecipeForm = ({ recipeData, setRecipeData, categories }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecipeData((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const handleImageRemove = (e) => {
        e.stopPropagation();
        setRecipeData((prev) => ({
            ...prev,
            image: null,
        }));
    };

    const handleUploadClick = (e) => {
        e.stopPropagation();
        document.getElementById("imageInput").click();
    };

    // 카테고리 데이터 변환 함수
    const transformCategories = (categoryType) => {
        const categoryList = categories[CATEGORY_TYPES[categoryType]] || [];
        return categoryList
            .filter((category) => category.name !== "전체")
            .map((category) => ({
                num: category.num,
                name: category.name,
            }));
    };

    return (
        <Container>
            <Form>
                <Title>레시피 등록</Title>

                <InputGroup>
                    <Label>레시피명</Label>
                    <Input
                        type="text"
                        name="title"
                        value={recipeData.title}
                        onChange={handleChange}
                    />
                </InputGroup>

                <InputGroup3>
                    {recipeData.image ? (
                        <ImageContainer>
                            <ImagePreview
                                src={URL.createObjectURL(recipeData.image)}
                                alt="preview"
                            />
                            <CloseButton onClick={handleImageRemove}>
                                X
                            </CloseButton>
                        </ImageContainer>
                    ) : (
                        <ImageUploadButton onClick={handleUploadClick}>
                            <input
                                type="file"
                                id="imageInput"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <ButtonContainer>
                                <img src={VectorImage} alt="" />
                                <Text>대표사진 등록</Text>
                            </ButtonContainer>
                        </ImageUploadButton>
                    )}
                </InputGroup3>

                <InputGroup2>
                    <Label>요리소개</Label>
                    <TextArea
                        name="intro"
                        value={recipeData.intro}
                        onChange={handleChange}
                    />
                </InputGroup2>

                <InputGroup4>
                    <Label>카테고리</Label>
                    <CategoryGroup>
                        <Select
                            name="type"
                            value={recipeData.type}
                            onChange={handleChange}
                        >
                            <option value="">{CATEGORY_TYPES.TYPE}</option>
                            {transformCategories("TYPE").map((category) => (
                                <option key={category.num} value={category.num}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                        <Select
                            name="ingredients"
                            value={recipeData.ingredients}
                            onChange={handleChange}
                        >
                            <option value="">
                                {CATEGORY_TYPES.INGREDIENT}
                            </option>
                            {transformCategories("INGREDIENT").map(
                                (category) => (
                                    <option
                                        key={category.num}
                                        value={category.num}
                                    >
                                        {category.name}
                                    </option>
                                ),
                            )}
                        </Select>
                        <Select
                            name="situation"
                            value={recipeData.situation}
                            onChange={handleChange}
                        >
                            <option value="">{CATEGORY_TYPES.SITUATION}</option>
                            {transformCategories("SITUATION").map(
                                (category) => (
                                    <option
                                        key={category.num}
                                        value={category.num}
                                    >
                                        {category.name}
                                    </option>
                                ),
                            )}
                        </Select>
                        <Select
                            name="method"
                            value={recipeData.method}
                            onChange={handleChange}
                        >
                            <option value="">{CATEGORY_TYPES.METHOD}</option>
                            {transformCategories("METHOD").map((category) => (
                                <option key={category.num} value={category.num}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                    </CategoryGroup>
                </InputGroup4>

                <BottomRow>
                    <InputGroup5>
                        <Label>인분</Label>
                        <Select
                            name="servings"
                            value={recipeData.servings}
                            onChange={handleChange}
                        >
                            <option value="">인분</option>
                            <option value="1">1인분</option>
                            <option value="2">2인분</option>
                            <option value="3">3인분</option>
                            <option value="4">4인분</option>
                            <option value="5">5인분</option>
                            <option value="6">6인분</option>
                            <option value="7">6인분 이상</option>
                        </Select>
                    </InputGroup5>

                    <InputGroup5>
                        <Label>난이도</Label>
                        <Select
                            name="level"
                            value={recipeData.level}
                            onChange={handleChange}
                        >
                            <option value="">난이도</option>
                            <option value="초급">쉬움</option>
                            <option value="중급">보통</option>
                            <option value="고급">어려움</option>
                            <option value="신의 경지">매우 어려움</option>
                        </Select>
                    </InputGroup5>

                    <InputGroup5>
                        <Label>시간</Label>
                        <Select
                            name="time"
                            value={recipeData.time}
                            onChange={handleChange}
                        >
                            <option value="">시간</option>
                            <option value="15">15분</option>
                            <option value="30">30분</option>
                            <option value="45">45분</option>
                            <option value="60">1시간</option>
                            <option value="90">1시간 30분</option>
                            <option value="120">2시간</option>
                            <option value="121">2시간 이상</option>
                        </Select>
                    </InputGroup5>
                </BottomRow>
            </Form>
        </Container>
    );
};

RecipeForm.propTypes = {
    recipeData: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(File),
        ]),
        intro: PropTypes.string,
        type: PropTypes.string,
        ingredients: PropTypes.string,
        situation: PropTypes.string,
        method: PropTypes.string,
        servings: PropTypes.string,
        level: PropTypes.string,
        time: PropTypes.string,
    }).isRequired,
    setRecipeData: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
};

export default RecipeForm;
