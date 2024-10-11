import {
    CategoryItem,
    CategoryList,
    CategorySection,
    CategoryTitle,
    Container,
} from "./Category.styled";
import PropTypes from "prop-types";
import { useRecipeStore } from "./../../store/recipeStore";
import { useEffect, useState } from "react";
import { CATEGORY_TYPES, fetchCategories } from "../../api/category";

const CategoryComponent = ({
    onTypeSelect,
    onSituationSelect,
    onIngredientsSelect,
    onMethodSelect,
}) => {
    const [categories, setCategories] = useState({
        [CATEGORY_TYPES.TYPE]: [],
        [CATEGORY_TYPES.SITUATION]: [],
        [CATEGORY_TYPES.INGREDIENT]: [],
        [CATEGORY_TYPES.METHOD]: [],
    });

    const {
        selectedType,
        selectedSituation,
        selectedIngredients,
        selectedMethod,
        setSelectedType,
        setSelectedSituation,
        setSelectedIngredients,
        setSelectedMethod,
    } = useRecipeStore((state) => ({
        selectedType: state.selectedType,
        selectedSituation: state.selectedSituation,
        selectedIngredients: state.selectedIngredients,
        selectedMethod: state.selectedMethod,
        setSelectedType: state.setSelectedType,
        setSelectedSituation: state.setSelectedSituation,
        setSelectedIngredients: state.setSelectedIngredients,
        setSelectedMethod: state.setSelectedMethod,
    }));

    useEffect(() => {
        const getCategories = async () => {
            const categorizedData = await fetchCategories();
            setCategories(categorizedData);
        };
        getCategories();
    }, []);

    const handleCategoryClick = (category, item) => {
        // 전체 항목을 선택할 수 있도록 수정
        if (category === CATEGORY_TYPES.TYPE) {
            setSelectedType(item.num);
            onTypeSelect(item.num);
        } else if (category === CATEGORY_TYPES.SITUATION) {
            setSelectedSituation(item.num);
            onSituationSelect(item.num);
        } else if (category === CATEGORY_TYPES.INGREDIENT) {
            setSelectedIngredients(item.num);
            onIngredientsSelect(item.num);
        } else if (category === CATEGORY_TYPES.METHOD) {
            setSelectedMethod(item.num);
            onMethodSelect(item.num);
        }
    };

    return (
        <Container>
            {Object.entries(categories).map(([categoryKey, items]) => (
                <CategorySection key={categoryKey}>
                    <CategoryTitle>{categoryKey}</CategoryTitle>
                    <CategoryList>
                        {items.map((item, index) => (
                            <div
                                key={item.num}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <CategoryItem
                                    selected={
                                        (categoryKey === CATEGORY_TYPES.TYPE &&
                                            selectedType === item.num) ||
                                        (categoryKey ===
                                            CATEGORY_TYPES.SITUATION &&
                                            selectedSituation === item.num) ||
                                        (categoryKey ===
                                            CATEGORY_TYPES.INGREDIENT &&
                                            selectedIngredients === item.num) ||
                                        (categoryKey ===
                                            CATEGORY_TYPES.METHOD &&
                                            selectedMethod === item.num)
                                    }
                                    onClick={() =>
                                        handleCategoryClick(categoryKey, item)
                                    }
                                >
                                    {item.name}
                                </CategoryItem>
                                {index < items.length - 1 && (
                                    <span style={{ margin: "0 5px" }}>|</span>
                                )}
                            </div>
                        ))}
                    </CategoryList>
                </CategorySection>
            ))}
        </Container>
    );
};

CategoryComponent.propTypes = {
    onTypeSelect: PropTypes.func.isRequired,
    onSituationSelect: PropTypes.func.isRequired,
    onIngredientsSelect: PropTypes.func.isRequired,
    onMethodSelect: PropTypes.func.isRequired,
};

export default CategoryComponent;
