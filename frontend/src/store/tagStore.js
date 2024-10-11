import { create } from "zustand";
import { persist } from "zustand/middleware";

const mapCommonCode = (data) => {
    return data.reduce((acc, item) => {
        acc[item.commonCodeNum] = item.commonCodeName;
        return acc;
    }, {});
};

export const useTagStore = create(
    persist(
        (set) => ({
            tags: null,
            setTags: (newTags) => {
                const mappedTags = mapCommonCode(newTags);
                set({ tags: mappedTags });
            },
        }),
        {
            name: "tag-storage",
            getStorage: () => sessionStorage,
        },
    ),
);
