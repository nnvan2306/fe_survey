import { lazy } from "react";

export const ToDo = lazy(() => import("../components/pages/ToDo"));
export const Home = lazy(() => import("../components/pages/Home"));
export const SurveyNew = lazy(() => import("../components/pages/SurveyNew"));
export const MySurvey = lazy(() => import("../components/pages/MySurvey"));
export const SurveyEdit = lazy(
    () => import("../components/pages/SurveyUpdate")
);
export const SurveyShare = lazy(
    () => import("../components/pages/SurveyShare")
);
