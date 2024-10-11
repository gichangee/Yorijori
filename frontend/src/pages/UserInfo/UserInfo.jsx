import RecipeCardList from "../../components/CardList/RecipeCardList";
import UserProfile from "../../components/UserProfile/UserProfile";
import Tab from "../../components/Tab/Tab";
import { useNavigate, useParams } from "react-router-dom";
import {
    useOtherUserInfo,
    useOtherUserRecipe,
    useUnfollowUser,
} from "../../hooks/useUser";
import FloatingButton from "../../components/Button/FloatingButton";
import { useEffect, useState } from "react";
import useUser, { useFollowUser } from "../../hooks/useUser";
import { useUserStore } from "../../store/userStore";

const isFollowing = (user, id) => {
    if (!user || !user.followings) return false;
    return user.followings.some(
        (following) => String(following.id) === String(id),
    );
};

const UserInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading: isLoadingUser } = useUser();
    const { data: member, isLoading, error } = useOtherUserInfo(id);
    const { data: recipes, isLoading: recipeIsLoading } =
        useOtherUserRecipe(id);
    const { mutate: followUser } = useFollowUser(id);
    const { mutate: unfollowUser } = useUnfollowUser(id);
    const user = useUserStore((state) => state.user);

    const [isFollow, setIsFollow] = useState(false);
    const [buttonText, setButtonText] = useState("팔로우");

    useEffect(() => {
        if (user && user.followings && id) {
            const followingStatus = isFollowing(user, id);
            setIsFollow(followingStatus);
            setButtonText(followingStatus ? "팔로잉" : "팔로우");
        }
    }, [user, id]);

    if (isLoading || recipeIsLoading || isLoadingUser)
        return <div>Loading...</div>;

    if (!member || error) {
        navigate("/user-not-found");
    }

    const handleButtonClick = () => {
        if (!user) {
            return;
        }

        if (isFollow) {
            unfollowUser();
            setIsFollow(false);
            setButtonText("팔로우");
        } else {
            followUser();
            setIsFollow(true);
            setButtonText("팔로잉");
        }
    };

    const tabs = [
        {
            label: "등록 레시피",
            content: <RecipeCardList recipes={recipes} showProfile={false} />,
        },
    ];

    return (
        <div>
            <UserProfile
                showInfo={true}
                member={member}
                buttonText={buttonText}
                buttonOnClick={handleButtonClick}
                isFollowButtonEnabled={true}
            />
            <Tab tabs={tabs} />
            <FloatingButton />
        </div>
    );
};

export default UserInfo;
