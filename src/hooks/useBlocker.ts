import { useCallback, useEffect } from "react";
import { useBlocker as useBlockerRoute } from "react-router-dom";

const useBlocker = (isBlocked: boolean, message = "") => {
    const blocker = useBlockerRoute(
        ({ currentLocation, nextLocation }) =>
            isBlocked && currentLocation.pathname !== nextLocation.pathname
    );

    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (isBlocked) {
                e.preventDefault();
            }
        },
        [isBlocked]
    );

    useEffect(() => {
        if (blocker.state === "blocked") {
            if (confirm(message || "Are you sure you want to leave? ")) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker, message]);

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [handleBeforeUnload]);
};

export default useBlocker;
