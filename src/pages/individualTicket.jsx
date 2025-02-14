import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/shared/Button";
import Spinner from "../components/shared/Spinner";
import Ticket from "../components/Ticket";
import { FaArrowRightLong } from "react-icons/fa6";
import AnimatedSection from "../components/shared/AnimatedSection";

function IndividualTicket() {
    const location = useLocation();
    const { ticket } = location.state || {};
    const resultRef = useRef(null);
    const [isDownloadInProgress, setIsDownloadInProgress] = useState(false);
    console.log(ticket, "logged data");
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth > 1024
    );
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth > 1024);
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const downloadImage = () => {
        if (!resultRef.current) return;
        setIsDownloadInProgress(true);

        toPng(resultRef.current)
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "result.png";
                link.click();
            })
            .catch((error) => {
                console.error("Error capturing image:", error);
            })
            .finally(() => setIsDownloadInProgress(false));
    };

    const navigateBackToTickets = () => {
        navigate("/tickets");
    };

    return (
        <div>
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    e.key === "Enter" && navigateBackToTickets;
                }}
                onClick={navigateBackToTickets}
                className="w-fit flex gap-2 items-center text-[#FAFAFA] font-jeju text-sm md:text-base pl-5 pt-5 cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:underline-offset-4"
            >
                <FaArrowRightLong className="transform rotate-180" />
                <p>Back to tickets</p>
            </div>
            <AnimatedSection>
                <div className="ticket-padding text-[#FAFAFA] p-6 md:p-12 rounded-[40px] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] max-w-[700px] mx-auto mt-10 mb-[42px] mb:mb-[112px]">
                    <Ticket
                        resultRef={resultRef}
                        ticketData={ticket?.ticketData}
                        userData={ticket?.userData}
                        eventData={ticket?.eventData}
                    />
                    <div className="flex font-jeju mt-8 w-full md:w-[50%] mx-auto">
                        <Button
                            onClick={downloadImage}
                            aria-label="Click to download ticket"
                            className=" flex-1 bg-[#24A0B5] rounded-lg text-white focus:ring-2 focus:ring-blue-500 hover:text-[#24A0B5] hover:border hover:border-[#24A0B5] hover:bg-transparent transition-colors ease-in-out duration-300"
                        >
                            Download Ticket
                        </Button>
                    </div>

                    {isDownloadInProgress && isLargeScreen && <Spinner />}
                </div>
            </AnimatedSection>
        </div>
    );
}

export default IndividualTicket;
