import { useGlobalContext } from "../../../contexts/GlobalContext";
import { createPortal } from "react-dom";
import Spinner from "../../../assets/svg/spin.svg";
import { Box } from "@mui/material";

type Props = {
    isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: Props) => {
    const { isLoadingOverlay } = useGlobalContext();

    return (
        <>
            {(isLoading || isLoadingOverlay) &&
                createPortal(
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/30">
                        <Box
                            sx={{
                                width: 200,
                                height: 200,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={Spinner}
                                alt="Loading"
                                className="w-12 h-12 animate-spin"
                            />
                        </Box>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default LoadingOverlay;
