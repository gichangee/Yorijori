import * as S from "./UserProfile.styled";
import UserProfileImage from "./UserProfileImage/UserProfileImage";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { formatNumber } from "../../util/format-number";
import { useState } from "react";
import FollowingModal from "./FollowingModal/FollowingModal";

const UserProfile = ({
    showInfo,
    member,
    buttonText,
    buttonOnClick,
    isFollowButtonEnabled = false,
}) => {
    const follow = formatNumber(member.followers.length);
    const following = formatNumber(member.followings.length);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const onClickModifyButton = () => {
        buttonOnClick();
    };

    return (
        <S.UserProfile>
            <S.ProfileImage>
                <UserProfileImage imageUrl={member.profileImage} size="180px" />
            </S.ProfileImage>
            {showInfo && (
                <S.UserStat>
                    <S.TextWrapper>
                        <div className="nickname">
                            {member.nickname}({member.name})
                        </div>
                        <div className="discription">{member.summary}</div>
                        <div className="discription">{member.email}</div>
                        <S.StatWrapper
                            isClickable={isFollowButtonEnabled}
                            onClick={
                                isFollowButtonEnabled ? openModal : undefined
                            }
                        >
                            <S.Stat>
                                <div className="stat">팔로우</div>{" "}
                                <div>{follow}</div>
                            </S.Stat>
                            <S.Stat>
                                <div className="stat">팔로잉</div>{" "}
                                <div>{following}</div>
                            </S.Stat>
                        </S.StatWrapper>
                    </S.TextWrapper>
                    <Button
                        text={buttonText}
                        width="80px"
                        height="32px"
                        type="small"
                        onClick={onClickModifyButton}
                    />
                </S.UserStat>
            )}
            <FollowingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                followers={member.followers}
                followings={member.followings}
            />
        </S.UserProfile>
    );
};

const FollowerFollowingShape = PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    profileImage: PropTypes.string,
});

UserProfile.propTypes = {
    showInfo: PropTypes.bool,
    member: PropTypes.shape({
        profileImage: PropTypes.string,
        nickname: PropTypes.string,
        name: PropTypes.string,
        summary: PropTypes.string,
        email: PropTypes.string,
        followers: PropTypes.arrayOf(FollowerFollowingShape),
        followings: PropTypes.arrayOf(FollowerFollowingShape),
    }).isRequired,
    buttonText: PropTypes.string,
    buttonOnClick: PropTypes.func,
    isFollowButtonEnabled: PropTypes.bool,
};

export default UserProfile;
