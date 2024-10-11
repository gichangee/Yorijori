import BannerSlider from "../../components/Slider/BannerSlider/BannerSlider";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardSlider from "../../components/Slider/CardSlider/CardSlider";
import LinkBanner from "../../components/Banner/LinkBanner";

import * as S from "./Main.styled";
import { useNavigate } from "react-router-dom";
import FloatingButton from "../../components/Button/FloatingButton";
import { useAuthStore } from "../../store/userStore";
import {
    useRecommend,
    useRecommendCommon,
    useRecommendSeason,
} from "../../hooks/useRecipe";

const Main = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore.getState();

    const { data: common, isLoading: commonIsLoading } = useRecommendCommon();
    const { data: user, isLoading: recommendIsLoading } = useRecommend();
    const { data: season, isLoading: seasonIsLoading } = useRecommendSeason();

    if (commonIsLoading || recommendIsLoading || seasonIsLoading)
        return <div></div>;

    const recommendRecipes = isLoggedIn ? user : common;

    const handleSearchSubmit = (term) => {
        navigate(`/search?keyword=${encodeURIComponent(term)}`);
    };
    return (
        <S.Main>
            <div>
                <BannerSlider />
                <SearchBar
                    userId={"test"}
                    purpose={"recipe"}
                    boldPlacehold={"오늘은 무슨 요리를 할까요?"}
                    grayPlacehold={
                        "재료와 요리명으로 추천 레시피를 검색해보세요."
                    }
                    onSubmit={handleSearchSubmit}
                />
            </div>
            <div>
                <CardSlider
                    message={recommendRecipes.message}
                    color={({ theme }) => theme.color.point.green}
                    data={recommendRecipes.recipes}
                />
            </div>
            <div>
                <CardSlider
                    color={({ theme }) => theme.color.point.yellow}
                    message={season.message}
                    data={season.recipes}
                />
            </div>

            <LinkBanner />
            <FloatingButton />
        </S.Main>
    );
};
export default Main;
