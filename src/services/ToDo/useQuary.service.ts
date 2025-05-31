import api from "../../libs/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { QueryConfig } from "../../libs/query";

export const GET_TODO_QUERY_KEY = "todo";

const getGene = async () => {
    const { data } = await api.get(`/`);
    return data;
};

export const getTodDoOptions = () =>
    queryOptions({
        queryKey: [GET_TODO_QUERY_KEY],
        queryFn: () => getGene(),
    });

type UseGetToDoType = {
    queryConfig?: QueryConfig<typeof getTodDoOptions>;
    id: string;
};

export const useGetTodo = ({ queryConfig }: UseGetToDoType) => {
    return useQuery({
        ...getTodDoOptions(),
        ...queryConfig,
    });
};
