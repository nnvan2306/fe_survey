import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "./contexts/GlobalContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { routes } from "./routes/routes";

const router = createBrowserRouter(
    routes.map((route) => ({
        ...route,
        element: <ProtectedRoute {...route}>{route.element}</ProtectedRoute>,
    }))
);

function App() {
    return (
        <Suspense
            fallback={
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 animate-spin border-4 border-t-transparent border-white rounded-full"></div>
                </div>
            }
        >
            <GlobalProvider>
                <RouterProvider router={router} />
            </GlobalProvider>
            <ToastContainer />
        </Suspense>
    );
}

export default App;
