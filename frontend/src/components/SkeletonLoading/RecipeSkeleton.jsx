import * as S from "./RecipeSkeleton.styled";

const RecipeCardSkeleton = () => {
    return (
        <S.SkeletonCardList>
            {[1, 2, 3, 4].map((item) => (
                <S.SkeletonCard key={item}>
                    <S.SkeletonThumbnail />
                    <S.SkeletonContent>
                        <S.SkeletonTitle />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            <S.SkeletonText />
                            <S.SkeletonText width="85%" />
                            <S.SkeletonText width="70%" />
                        </div>
                        <S.SkeletonProfile>
                            <S.SkeletonAvatar />
                            <S.SkeletonText width="120px" />
                        </S.SkeletonProfile>
                    </S.SkeletonContent>
                </S.SkeletonCard>
            ))}
        </S.SkeletonCardList>
    );
};

export default RecipeCardSkeleton;
