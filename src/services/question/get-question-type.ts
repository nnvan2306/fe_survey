import api from "../../libs/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { QueryConfig } from "../../libs/query";

export const GET_QUESTION_TYPE_QUERY_KEY = "question-type";

const get = async () => {
    const { data } = await api.get(`/`);
    return data;
};

export const getOptions = () =>
    queryOptions({
        queryKey: [GET_QUESTION_TYPE_QUERY_KEY],
        queryFn: () => get(),
    });

type UseGetType = {
    queryConfig?: QueryConfig<typeof getOptions>;
};

export const useGetQuestionType = ({ queryConfig }: UseGetType) => {
    return useQuery({
        ...getOptions(),
        ...queryConfig,
    });
};
