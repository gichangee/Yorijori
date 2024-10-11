import PropTypes from "prop-types";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import * as S from "./Comment.styled";
import { useComment } from "../../hooks/useRecipe";
function Comments({ id }) {
    const { data: comments = [], isLoading } = useComment(id);

    if (isLoading) return <div></div>;
    return (
        <>
            <S.CommentTitle>댓글 {comments.length}개</S.CommentTitle>
            <S.CommentInputWrapper>
                <CommentInput id={id} />
            </S.CommentInputWrapper>
            {!isLoading && comments.length > 0 && (
                <>
                    {comments.map((comment) => (
                        <S.CommentsWrapper key={comment.id}>
                            <Comment comment={comment} />
                        </S.CommentsWrapper>
                    ))}
                </>
            )}
        </>
    );
}

Comments.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Comments;
