export const monthLabels = () =>
    Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

export const barLabels = () => {
    return ["5", "4", "3", "2", "1"];
};

export const pieLabels = () => {
    return [
        "단백질",
        "탄수화물",
        "지방",
        "나트륨",
        "당류",
        "콜레스테롤",
        "포화지방산",
        "트랜스지방산",
    ];
};
