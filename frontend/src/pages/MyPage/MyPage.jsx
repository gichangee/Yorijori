import * as S from "./MyPage.styled";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserProfileLevel from "../../components/UserProfile/UserProfileLevel/UserProfileLevel";
import Tab from "../../components/Tab/Tab";
import RecipeCardList from "../../components/CardList/RecipeCardList";
import useUser, {
    useUserLikes,
    useUserReceipe,
    useUserScraps,
} from "../../hooks/useUser";
import { useUserStore, useAuthStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useEffect } from "react";

const CustomToastContainer = styled(ToastContainer)`
    .Toastify__toast {
        font-family: "SUITMedium";
        font-size: 15px;
        letter-spacing: 0.02rem;
    }
`;

const MyPage = () => {
    const navigate = useNavigate();
    const { isLoading: isUserLoading } = useUser();
    const { isLoading: isRecipeLoading } = useUserReceipe();
    const { isLoggedIn } = useAuthStore.getState();

    const { data: likes } = useUserLikes();
    const { data: scraps } = useUserScraps();

    const user = useUserStore((state) => state.user);
    const recipes = useUserStore((state) => state.recipes);

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("로그인이 필요해요.", {
                position: "top-center",
                transition: Slide,
                autoClose: 1000,
                onClose: () => {
                    navigate("/login");
                },
            });
        }
    }, [isLoggedIn, navigate]);
    if (isUserLoading || isRecipeLoading) return <div></div>;

    const tabs = [
        {
            label: "나의 레시피",
            content: <RecipeCardList recipes={recipes} showProfile={false} />,
        },
        {
            label: "스크랩 레시피",
            content: <RecipeCardList recipes={scraps} showProfile={true} />,
        },
        {
            label: "좋아요한 레시피",
            content: <RecipeCardList recipes={likes} showProfile={true} />,
        },
    ];

    return (
        <S.MyPage>
            <div>
                <UserProfile
                    showInfo={true}
                    member={user}
                    buttonText={"정보 수정"}
                    buttonOnClick={() => navigate("/modify")}
                    isFollowButtonEnabled={true}
                />
                <UserProfileLevel score={user.score} />
            </div>
            <Tab tabs={tabs} />
            <CustomToastContainer />
        </S.MyPage>
    );
};

export default MyPage;
