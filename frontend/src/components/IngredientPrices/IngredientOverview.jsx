import PropType from "prop-types";
import { useEffect, useState } from "react";
import * as S from "./IngredientOverview.styled";
import YearlyPriceChart from "./YearlyPriceChart/YearlyPriceChart";
import Title from "../Title/Title";
import LikeIngredient from "./LikeIngredient/LikeIngredient";
import Tab from "../Tab/Tab";
import { getIngredientPrices } from "../../api/ingredientApi";
import LowestPrices from "./LowestPrice/LowestPrices";
import RelatedRecipe from "./RelatedRecipe/RelatedRecipe";
import EmptyPlaceHolder from "../EmptyPlaceholder/EmptyPlaceHolder";

const IngredientOverview = ({ like, onLike }) => {
    const [rowIdx, setRowIdx] = useState(0);
    const [priceHistory, setPriceHistory] = useState(null);
    const [name, setName] = useState(null);
    const [tabs, setTabs] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (like.length === 0) return;
        const fetchIngredientPrices = async () => {
            const result = await getIngredientPrices(like[rowIdx].id);
            setPriceHistory(result);
            setName(like[rowIdx].name);
        };
        fetchIngredientPrices();
    }, [rowIdx, like]);

    useEffect(() => {
        const data = like.reduce((acc, cur) => {
            if (cur.price === undefined) return acc;
            return acc + cur.price;
        }, 0);
        setTotalPrice(data);
    }, [like]);

    useEffect(() => {
        setTabs([
            {
                label: "물가동향",
                content: (
                    <>
                        {priceHistory && (
                            <YearlyPriceChart priceHistory={priceHistory} />
                        )}
                    </>
                ),
            },
            {
                label: "최저가",
                content: (
                    <>
                        <LowestPrices name={name} />
                    </>
                ),
            },
        ]);
    }, [priceHistory, name]);

    useEffect(() => {
        setTabs([
            {
                label: "물가동향",
                content: (
                    <>
                        {priceHistory && (
                            <YearlyPriceChart priceHistory={priceHistory} />
                        )}
                    </>
                ),
            },
            {
                label: "최저가",
                content: (
                    <>
                        <LowestPrices name={name} />
                    </>
                ),
            },
        ]);
    }, [priceHistory, name]);

    const clickHandler = (idx) => {
        setRowIdx(idx);
    };

    const handleLike = (ingredient) => {
        if (rowIdx !== null && like[rowIdx].id === ingredient.id) {
            setRowIdx(0);
        }
        onLike(ingredient);
    };

    return (
        <>
            {like.length > 0 ? (
                <>
                    <S.IngredientLikeSection>
                        <S.LikeHeader>
                            <S.TitleWrapper>
                                <Title title={"나의 식재료"} />
                            </S.TitleWrapper>
                            <S.TotalPriceWrapper>
                                총 가격은
                                <S.TotalPrice>
                                    {totalPrice} 원
                                </S.TotalPrice>{" "}
                                입니다.
                            </S.TotalPriceWrapper>
                        </S.LikeHeader>
                        <S.Wrapper>
                            <LikeIngredient
                                onClick={clickHandler}
                                ingredients={like}
                                onLike={handleLike}
                            />
                            <S.TabWrapper>
                                <Tab tabs={tabs} />
                            </S.TabWrapper>
                        </S.Wrapper>
                    </S.IngredientLikeSection>
                    <S.RelatedRecipeWrapper>
                        <RelatedRecipe like={like} />
                    </S.RelatedRecipeWrapper>
                </>
            ) : (
                <EmptyPlaceHolder
                    width="70%"
                    height="15rem"
                    recommend="재료의 최저가와 관련된 레시피를 확인할 수 있어요. !"
                    content="좋아요를 눌러 재료를 등록해보세요."
                />
            )}
        </>
    );
};

IngredientOverview.propTypes = {
    like: PropType.array,
    onLike: PropType.func,
};
export default IngredientOverview;
