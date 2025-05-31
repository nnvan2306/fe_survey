import { ScrollRestoration } from "react-router-dom";
import { routes } from "./routes";
import LoadingOverlay from "../components/atoms/LoadingOverlay";

type Props = {
    children: React.ReactNode;
} & (typeof routes)[number];

const ProtectedRoute = ({ children }: Props) => {
    return (
        <>
            <ScrollRestoration />
            <LoadingOverlay isLoading={false} />
            {children}
        </>
    );
};

export default ProtectedRoute;
