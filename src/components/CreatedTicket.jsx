import Button from "./shared/Button";
import PropTypes from "prop-types";
import Ticket from "./Ticket";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Spinner from "./shared/Spinner";
import { clearLocalStorage, saveTicketToDB } from "../utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection, setStepCounter } from "../redux/stepSlice";

function CreatedTicket() {
    const dispatch = useDispatch();
    const [fetchedUserData, setFetchedUserData] = useState({});
    const [fetchedTicketData, setFetchedTicketData] = useState({});
    const resultRef = useRef(null);
    const [isDownloadInProgress, setIsDownloadInProgress] = useState(false);
    const currentSection = useSelector((state) => state.step.currentSection);

    const downloadImage = () => {
        setIsDownloadInProgress(true);
        if (resultRef.current) {
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
        }
    };

    useEffect(() => {
        window.scrollTo(0, { top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        const ticketData = localStorage.getItem("Selected Ticket Details");

        if (storedData && ticketData) {
            try {
                const user = JSON.parse(storedData);
                const ticket = JSON.parse(ticketData);

                setFetchedUserData(user);
                setFetchedTicketData(ticket);
            } catch (error) {
                console.error("Error parsing form data:", error);
            }
        }
    }, []);

    useEffect(() => {
        const saveTicket = async () => {
            const storedTicketData = localStorage.getItem(
                "Selected Ticket Details"
            );
            const storedUserData = localStorage.getItem("formData");

            if (storedTicketData && storedUserData && currentSection === "Ready") {
                try {
                    const ticketData = JSON.parse(storedTicketData);
                    const userData = JSON.parse(storedUserData);

                    const alreadySaved = localStorage.getItem("TicketSaved");
                    if (!alreadySaved) {
                        await saveTicketToDB({
                            ticketData,
                            userData,
                            timestamp: new Date().toISOString(),
                        });

                        localStorage.setItem("TicketSaved", "true");
                    }
                } catch (error) {
                    console.error("Error saving ticket:", error);
                }
            }
        };

        saveTicket();
    }, []);

    const bookAnotherTicket = async () => {
        clearLocalStorage()

        dispatch(setStepCounter(1));
        dispatch(setCurrentSection("Ticket Selection"));
    };

    return (
        <section className="text-[#FAFAFA] mx-auto max-w-[700px] rounded-3xl relative">
            <div className="flex flex-col items-center gap-3 lg:gap-4">
                <h1 className="text-2xl lg:text-[32px] leading-[33.6px] lg:leading-[40.96px] text-center text-white">
                    Your Ticket is Booked!
                </h1>
                <p className="font-roboto text-center text-[#FAFAFA]">
                    Check your email for a copy or you can{" "}
                    <span className="hidden lg:inline font-bold">download</span>
                </p>
            </div>
            <div
                tabIndex={0}
                aria-label="Generated Ticket"
                className="mt-[32px] mb-6 py-[32px]"
            >
                <Ticket
                    resultRef={resultRef}
                    ticketData={fetchedTicketData}
                    userData={fetchedUserData}
                />
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
                <Button
                    onClick={bookAnotherTicket}
                    aria-label="Book another ticket"
                    className="flex-1 border border-[#24A0B5] rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-[#24A0B5] transition-colors ease-in-out duration-300"
                >
                    Book Another Ticket
                </Button>
                <Button
                    onClick={downloadImage}
                    aria-label="Click to download ticket"
                    className="flex-1 bg-[#24A0B5] rounded-lg text-white focus:ring-2 focus:ring-blue-500 hover:border hover:border-[#24A0B5] hover:bg-transparent transition-colors ease-in-out duration-300"
                >
                    Download Ticket
                </Button>
            </div>

            {isDownloadInProgress && window.innerWidth > 1024 && <Spinner />}
        </section>
    );
}

CreatedTicket.propTypes = {
    setStepCounter: PropTypes.func,
    setCurrentSection: PropTypes.func,
};

export default CreatedTicket;
