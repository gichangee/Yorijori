const allergyImages = import.meta.glob("../assets/allergy-images/*.png", {
    eager: true,
});

export function getAllergyImage(allergyId) {
    const imageKey = `../assets/allergy-images/${allergyId}.png`;
    const imageModule = allergyImages[imageKey];

    return imageModule?.default || null;
}
