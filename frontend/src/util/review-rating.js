const totalPeople = (reviews) => reviews.reduce((acc, cur) => acc + cur, 0);

const totalScore = (reviews) =>
    reviews.reduce((acc, cur, index) => acc + cur * (5 - index), 0);

export const scoreAvg = (reviews) =>
    (totalScore(reviews) / totalPeople(reviews)).toFixed(1);

export const reviewPercentageArr = (reviews) => {
    const total = totalPeople(reviews);
    return reviews.map((data) => (data / total) * 100);
};
