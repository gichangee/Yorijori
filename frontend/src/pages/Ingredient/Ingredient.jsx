import Footer from "../../components/Footer/Footer";
import IngredientOverview from "../../components/IngredientPrices/IngredientOverview";
import SearchBar from "../../components/SearchBar/SearchBar";
import * as S from "./Ingredient.styled";
import Title from "../../components/Title/Title";
import HotMonthIngredients from "../../components/IngredientPrices/HotIngredient/HotMonthIngredients";
import SearchResult from "../../components/IngredientPrices/SearchResult/SearchResult";

import {
    deleteLikeIngredient,
    getLikeIngredients,
    getSearchIngredient,
    postLikeIngredient,
} from "../../api/ingredientApi";

import { useEffect, useState } from "react";
import HotWeekIngredients from "../../components/IngredientPrices/HotIngredient/HotWeekIngredients";
import { useAuthStore } from "../../store/userStore";
import PriceSlider from "../../components/IngredientPrices/LivePriceTracker/PriceSlider";

const Ingredient = () => {
    const { isLoggedIn } = useAuthStore();

    const [searchResult, setSearchResult] = useState(null);
    const [likeIngredients, setLikeIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleLike = (ingredient) => {
        const data = {
            ...ingredient,
            price: ingredient?.price || ingredient?.dayprice,
        };
        const isLiked = likeIngredients.find((i) => i.id === ingredient.id);
        setLikeIngredients((prev) =>
            isLiked
                ? prev.filter((el) => el.id !== ingredient.id)
                : [...prev, data],
        );

        if (!isLoggedIn) return;
        if (isLiked) {
            deleteLikeIngredient(ingredient.id);
        } else {
            postLikeIngredient(ingredient.id);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) return;
        const fetchLikeIngredients = async () => {
            const result = await getLikeIngredients();
            setLikeIngredients(result);
        };
        fetchLikeIngredients();
    }, [isLoggedIn]);

    const handleSearch = async (term) => {
        const result = await getSearchIngredient(term);
        setSearchResult(result);
        setSearchTerm(term);
    };

    const handlePriceClick = async (term) => {
        const result = await getSearchIngredient(term);
        setSearchResult(result);
        setSearchTerm(term);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <S.Container>
                <SearchBar
                    userId={"test"}
                    purpose={"ingredient"}
                    boldPlacehold={"어떤 재료를 찾고 계신가요?"}
                    grayPlacehold={
                        "재료명을 입력하고 현재 시세를 확인해보세요."
                    }
                    onSubmit={(term) => handleSearch(term)}
                />
                {searchResult ? (
                    <>
                        {searchTerm !== searchResult.name && (
                            <S.TermWrapper>
                                <S.Term>{searchResult.name}</S.Term>을(를)
                                찾으세요? 잘못된 검색어
                                <S.Term>{searchTerm} </S.Term>을(를) 교정하여
                                검색 결과를 제공합니다.
                            </S.TermWrapper>
                        )}
                        <SearchResult
                            onLike={handleLike}
                            result={searchResult}
                            like={likeIngredients.find(
                                (i) => i.id === searchResult.id,
                            )}
                        />
                        <S.Separator />
                    </>
                ) : null}
                <IngredientOverview
                    like={likeIngredients}
                    onLike={handleLike}
                />

                <S.RecommendSection>
                    <HotWeekIngredients
                        like={likeIngredients}
                        onLike={handleLike}
                    />
                    <HotMonthIngredients
                        like={likeIngredients}
                        onLike={handleLike}
                    />
                    <S.Live>
                        <Title title={"실시간 물가 변동"} />
                        <PriceSlider handleClick={handlePriceClick} />
                    </S.Live>
                </S.RecommendSection>
            </S.Container>

            <Footer />
        </>
    );
};

export default Ingredient;
