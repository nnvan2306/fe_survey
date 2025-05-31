import { useMutation } from "@tanstack/react-query";
import api from "../../libs/axios";
import type { MutationConfig } from "../../libs/query";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PayLoadType = {};

const createToDo = async (payload: PayLoadType) => {
    const { data } = await api.post("/", payload);
    return data;
};

type CreateToDoType = {
    mutationConfig?: MutationConfig<typeof createToDo>;
};

export const useCreateToDo = ({ mutationConfig }: CreateToDoType) => {
    return useMutation({
        ...mutationConfig,
        mutationFn: createToDo,
    });
};
