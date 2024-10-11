import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HotIngredient from "./HotIngredient";
import * as S from "./HotIngredient.styled";
import { getIngredientPopularMonthly } from "../../../api/ingredientApi";
import Title from "../../Title/Title";

const HotMonthIngredients = ({ onLike, like }) => {
    const [hotMonthIngredients, setHotMonthIngredients] = useState([]);

    useEffect(() => {
        const fetchHotMonthIngredients = async () => {
            const result = await getIngredientPopularMonthly();
            setHotMonthIngredients(result);
        };
        fetchHotMonthIngredients();
    }, []);

    return (
        <S.Hot>
            <Title title={"월간 인기 재료"} />
            {hotMonthIngredients.map((ingredient, idx) => (
                <HotIngredient
                    onLike={() => onLike(ingredient)}
                    key={ingredient.id}
                    like={like.find((i) => i.id === ingredient.id)}
                    ingredient={ingredient}
                    idx={idx + 1}
                />
            ))}
        </S.Hot>
    );
};

HotMonthIngredients.propTypes = {
    onLike: PropTypes.func,
    like: PropTypes.array,
};
export default HotMonthIngredients;
