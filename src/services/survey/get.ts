import { queryOptions, useQuery } from "@tanstack/react-query";
import api from "../../libs/axios";
import type { QueryConfig } from "../../libs/query";

export const GET_QUERY_KEY = "edit";

const get = async (id: number) => {
    const { data } = await api.get(`/survey?id=${id}`);
    return data;
};

export const getTodDoOptions = (id: number) =>
    queryOptions({
        queryKey: [GET_QUERY_KEY],
        queryFn: () => get(id),
    });

type UseGetType = {
    queryConfig?: QueryConfig<typeof getTodDoOptions>;
    id: number;
};

export const useGetSurvey = ({ queryConfig, id }: UseGetType) => {
    return useQuery({
        ...getTodDoOptions(id),
        ...queryConfig,
        enabled: Boolean(id),
    });
};
