import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import Ticket from "./Ticket";
import Button from "./shared/Button";
import { toPng } from "html-to-image";
import Spinner from "./shared/Spinner";
import { clearLocalStorage, saveTicketToDB } from "../utils/storage";
import { resetStep } from "../redux/stepSlice";
import { useNavigate } from "react-router-dom";

function CreatedTicket() {
    const dispatch = useDispatch();
    const [fetchedUserData, setFetchedUserData] = useState({});
    const [fetchedTicketData, setFetchedTicketData] = useState({});
    const [fetchedEventData, setFetchedEventData] = useState({});
    const resultRef = useRef(null);
    const navigate = useNavigate();
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
        const eventData = localStorage.getItem("selectedEvent");

        if (storedData && ticketData && eventData) {
            try {
                const user = JSON.parse(storedData);
                const ticket = JSON.parse(ticketData);
                const event = JSON.parse(eventData);

                setFetchedUserData(user);
                setFetchedTicketData(ticket);
                setFetchedEventData(event);

                if (currentSection === "Ready") {
                    const alreadySaved = localStorage.getItem("TicketSaved");
                    if (!alreadySaved) {
                        saveTicketToDB({
                            ticketData: ticket,
                            userData: user,
                            eventData: event,
                            timestamp: new Date().toISOString(),
                        })
                            .then(() => {
                                localStorage.setItem("TicketSaved", "true");
                            })
                            .catch((error) => {
                                console.error("Error saving ticket:", error);
                            });
                    }
                }
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
            }
        }
    }, [currentSection]);

    const bookAnotherTicket = () => {
        clearLocalStorage();
        dispatch(resetStep());
        navigate("/");
    };

    return (
        <section className="text-[#FAFAFA] mx-auto max-w-[700px] rounded-3xl relative font-roboto">
            <div className="flex flex-col items-center gap-3 lg:gap-4">
                <h1 className="text-2xl lg:text-[32px] leading-[33.6px] lg:leading-[40.96px] text-center text-white font-alatsi">
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
                className="mt-[32px] mb-6 py-[32px] lg:px-[21px]"
            >
                <Ticket
                    resultRef={resultRef}
                    ticketData={fetchedTicketData}
                    userData={fetchedUserData}
                    eventData={fetchedEventData}
                />
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 font-jeju">
                <Button
                    onClick={bookAnotherTicket}
                    aria-label="Book another ticket"
                    className="flex-1 border border-[#24A0B5] text-[#24A0B5] rounded-lg focus:ring-2 focus:ring-blue-500 hover:text-white hover:bg-[#24A0B5] transition-colors ease-in-out duration-300"
                >
                    Book Another Ticket
                </Button>
                <Button
                    onClick={downloadImage}
                    aria-label="Click to download ticket"
                    className="flex-1 bg-[#24A0B5] rounded-lg text-white focus:ring-2 focus:ring-blue-500 hover:text-[#24A0B5] hover:border hover:border-[#24A0B5] hover:bg-transparent transition-colors ease-in-out duration-300"
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
