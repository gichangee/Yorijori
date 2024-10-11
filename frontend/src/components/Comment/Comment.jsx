import PropTypes from "prop-types";
import * as S from "./Comment.styled";
import UserProfileImage from "../UserProfile/UserProfileImage/UserProfileImage";

function Comment({ comment }) {
    return (
        <S.CommentWrapper>
            <S.User>
                <UserProfileImage
                    imageUrl={comment.profileImage}
                    size={"2rem"}
                />
                <S.UserName>{comment.nickname}</S.UserName>
            </S.User>
            <S.Text>{comment.content}</S.Text>
            <S.Info>
                <S.Date>{comment.createdDate}</S.Date>
            </S.Info>
        </S.CommentWrapper>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        profileImage: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
    }).isRequired,
};

export default Comment;
