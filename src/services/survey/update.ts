import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import type { MutationConfig } from "../../libs/query";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PayLoadType = {};

const update = async (payload: PayLoadType) => {
    const { data } = await api.post("/survey", payload);
    return data;
};

type UpdateType = {
    mutationConfig?: MutationConfig<typeof update>;
};

export const useUpdateSurvey = ({ mutationConfig }: UpdateType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: update,
    });
};
