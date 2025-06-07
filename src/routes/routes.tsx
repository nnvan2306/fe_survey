import { Home, MySurvey, SurveyEdit, SurveyNew } from "./index";

export const routes = [
    // {
    //     name: "TODo",
    //     path: "/",
    //     element: <ToDo />,
    //     requiresAuth: false,
    // },
    {
        name: "Home",
        path: "/",
        element: <Home />,
        requiresAuth: false,
    },
    {
        name: "SurveyNew",
        path: "/survey/new",
        element: <SurveyNew />,
        requiresAuth: false,
    },
    {
        name: "MySurvey",
        path: "/survey/manage",
        element: <MySurvey />,
        requiresAuth: false,
    },
    {
        name: "SurveyEdit",
        path: "/survey/update/:id",
        element: <SurveyEdit />,
        requiresAuth: false,
    },
] as const;

type RouteName = (typeof routes)[number]["name"];

type RoutesMap = {
    [K in RouteName]: (typeof routes)[number]["path"];
};

export const routesMap = ((): RoutesMap => {
    return routes.reduce((acc, route) => {
        acc[route.name] = route.path;
        return acc;
    }, {} as RoutesMap);
})();
