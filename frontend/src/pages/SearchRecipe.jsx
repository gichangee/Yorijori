import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import { useSearchResultStore } from "../store/recipeStore";
import RecipeCardList from "../components/CardList/RecipeCardList";
import { searchRecipes } from "../api/recipe";
import SearchBar from "../components/SearchBar/SearchBar";
import * as S from "./SearchRecipe.styled";
import RecipeCardSkeleton from "../components/SkeletonLoading/RecipeSkeleton";

const SearchRecipe = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const { setCurrentPage } = useSearchResultStore();
    const recipesPerPage = 20;
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const keyword = query.get("keyword") || "";
    // page 쿼리 파라미터가 없으면 1을 기본값으로 사용
    const currentPage = Math.max(1, parseInt(query.get("page") || "1"));

    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            try {
                const data = await searchRecipes(
                    keyword,
                    currentPage, // API에 그대로 currentPage 전달
                    recipesPerPage,
                );

                if (data && Array.isArray(data.recipes)) {
                    setRecipes(data.recipes);
                    setTotalCount(data.totalCount);
                    setErrorMessage(null);
                } else {
                    setRecipes([]);
                    setErrorMessage(data);
                }
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
        // URL의 페이지 값으로 스토어의 currentPage 동기화
        setCurrentPage(currentPage);
    }, [keyword, currentPage, setCurrentPage]);

    const handleSearch = (term) => {
        navigate(`/search?keyword=${encodeURIComponent(term)}&page=1`);
    };

    return (
        <S.Container>
            <SearchBar
                userId="yourUserId"
                purpose="recipeSearch"
                boldPlacehold="레시피 검색"
                grayPlacehold="키워드를 입력하세요"
                onSubmit={handleSearch}
                value={keyword}
            />

            {loading ? (
                <RecipeCardSkeleton />
            ) : recipes.length === 0 ? (
                <S.NoResultContainer>
                    <S.NoResult>
                        <S.Emoji>😥</S.Emoji>
                        검색 결과가 없습니다
                    </S.NoResult>
                    {errorMessage && (
                        <S.NoResult>
                            혹시 이걸 찾으시나요?
                            <S.NoResultSearch
                                onClick={() => handleSearch(errorMessage)}
                            >
                                {errorMessage}
                            </S.NoResultSearch>
                        </S.NoResult>
                    )}
                </S.NoResultContainer>
            ) : (
                <>
                    <S.ResultHeader>
                        🔍 {keyword}에 대한 레시피가 {totalCount}개 있습니다
                    </S.ResultHeader>
                    <RecipeCardList recipes={recipes} showProfile={true} />
                    {Math.ceil(totalCount / recipesPerPage) > 1 && (
                        <Pagination
                            pageCount={Math.ceil(totalCount / recipesPerPage)}
                            onPageChange={({ selected }) => {
                                navigate(
                                    `/search?keyword=${encodeURIComponent(keyword)}&page=${selected + 1}`,
                                );
                            }}
                            currentPage={currentPage - 1} // Pagination 컴포넌트는 0-based index를 사용하므로 1을 빼줍니다
                        />
                    )}
                </>
            )}
        </S.Container>
    );
};

export default SearchRecipe;
