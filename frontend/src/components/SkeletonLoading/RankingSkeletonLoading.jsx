import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonContainer = styled.div`
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.gray.lighter};
    border-radius: 5px;
    overflow: hidden;
`;

const SkeletonHeader = styled.div`
    display: flex;
    background-color: #eaf0ec;
    padding: 15px 0;
`;

const SkeletonHeaderCell = styled.div`
    height: 24px;
    width: ${(props) => props.width};
    background-color: rgba(0, 0, 0, 0.1);
    margin: 0 15px;
    border-radius: 4px;
`;

const SkeletonRow = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 15px;
    height: 70px;
    background-color: white;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray.lighter};
`;

const SkeletonCell = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height || "24px"};
    margin: 0 15px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
    border-radius: 4px;
`;

const SkeletonUserCell = styled(SkeletonCell)`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SkeletonAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 1000px 100%;
    animation: ${shimmer} 2s infinite linear;
`;

const RankingSkeletonLoading = () => {
    return (
        <SkeletonContainer>
            <SkeletonHeader>
                <SkeletonHeaderCell width="10%" />
                <SkeletonHeaderCell width="40%" />
                <SkeletonHeaderCell width="15%" />
                <SkeletonHeaderCell width="15%" />
                <SkeletonHeaderCell width="20%" />
            </SkeletonHeader>
            {[...Array(10)].map((_, index) => (
                <SkeletonRow key={index}>
                    <SkeletonCell width="10%" />
                    <SkeletonUserCell width="40%">
                        <SkeletonAvatar />
                        <SkeletonCell width="70%" />
                    </SkeletonUserCell>
                    <SkeletonCell width="15%" />
                    <SkeletonCell width="15%" />
                    <SkeletonCell width="20%" />
                </SkeletonRow>
            ))}
        </SkeletonContainer>
    );
};

export default RankingSkeletonLoading;
