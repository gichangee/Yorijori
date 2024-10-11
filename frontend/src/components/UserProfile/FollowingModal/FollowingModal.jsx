import PropTypes from "prop-types";
import * as S from "./FollowingModal.styled";
import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import FollowingItem from "./FollowingItem";

const FollowingModal = ({ isOpen, onClose, followers, followings }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!isOpen) return null;

    const getActiveList = () => {
        switch (activeTab) {
            case 0:
                return followers;
            case 1:
                return followings;
            default:
                return [];
        }
    };

    // eslint-disable-next-line react/prop-types
    const Row = ({ index, style }) => {
        const member = getActiveList()[index];
        return (
            <div style={style}>
                <FollowingItem member={member} />
            </div>
        );
    };

    return (
        <S.ModalWrapper onClick={onClose}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
                <S.TabButtons>
                    <S.TabButton
                        isActive={activeTab === 0}
                        onClick={() => setActiveTab(0)}
                    >
                        팔로우
                    </S.TabButton>
                    <S.TabButton
                        isActive={activeTab === 1}
                        onClick={() => setActiveTab(1)}
                    >
                        팔로잉
                    </S.TabButton>
                </S.TabButtons>

                <S.UserList>
                    <List
                        height={300}
                        itemCount={getActiveList().length}
                        itemSize={64}
                        width={"100%"}
                    >
                        {Row}
                    </List>
                </S.UserList>
            </S.ModalContent>
        </S.ModalWrapper>
    );
};

FollowingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    followers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            nickname: PropTypes.string.isRequired,
            profileImage: PropTypes.string,
        }),
    ).isRequired,
    followings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            nickname: PropTypes.string.isRequired,
            profileImage: PropTypes.string,
        }),
    ).isRequired,
};
export default FollowingModal;
