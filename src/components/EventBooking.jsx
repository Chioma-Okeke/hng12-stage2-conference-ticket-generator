import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Select from "./shared/Select";
import Button from "./shared/Button";
import { clearLocalStorage } from "../utils/storage";
import { setCurrentSection, setStepCounter } from "../redux/stepSlice";
import EventCard from "./EventCard";

const availableTickets = [
    {
        fee: "Free",
        accessType: "REGULAR ACCESS",
        date: "20/52",
    },
    {
        fee: "$150",
        accessType: "VIP ACCESS",
        date: "20/52",
    },
    {
        fee: "$150",
        accessType: "VVIP ACCESS",
        date: "20/52",
    },
];

function EventBooking({ event }) {
    const dispatch = useDispatch();
    const storedData = localStorage.getItem("Selected Ticket Details");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    const [selectedTicket, setSelectedTicket] = useState(
        parsedData.selectedTicket || {}
    );
    const [numberOfTickets, setNumberOfTickets] = useState(
        parsedData.numberOfTickets || 1
    );
    const [errorMessage, setErrorMessage] = useState({
        ticketSelected: "",
        ticketNumber: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedTicket && !numberOfTickets) return

        localStorage.setItem(
            "Selected Ticket Details",
            JSON.stringify({ numberOfTickets, selectedTicket })
        );
    }, [selectedTicket, numberOfTickets]);

    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth",
        });

        const storedData = localStorage.getItem("Selected Ticket Details");
        if (storedData) {
            try {
                const data = JSON.parse(storedData);
                setNumberOfTickets(data.numberOfTickets || null);
                setSelectedTicket(data.selectedTicket || {});
            } catch (error) {
                console.error("Error parsing stored ticket data:", error);
            }
        }
    }, []);

    useEffect(() => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            ticketNumber: numberOfTickets > 0 ? "" : prevErrors.ticketNumber,
            ticketSelected:
                Object.keys(selectedTicket).length > 0
                    ? ""
                    : prevErrors.ticketSelected,
        }));
    }, [numberOfTickets, selectedTicket]);

    const navigateToAboutPage = () => {
        navigate("/");
        clearLocalStorage();
    };

    const nextSection = () => {
        let hasError = false;
        let newErrors = { ...errorMessage };

        if (numberOfTickets <= 0) {
            newErrors.ticketNumber = "Please select number needed";
            hasError = true;
        } else {
            newErrors.ticketNumber = "";
        }

        if (Object.keys(selectedTicket).length <= 0) {
            newErrors.ticketSelected = "Please select a ticket";
            hasError = true;
        } else {
            newErrors.ticketSelected = "";
        }

        setErrorMessage(newErrors);

        if (hasError) return;

        const currentSection = {
            step: 2,
            sectionTitle: "Attendee Details",
        };

        localStorage.setItem(
            "Selected Ticket Details",
            JSON.stringify({ numberOfTickets, selectedTicket })
        );
        localStorage.setItem("Current section", JSON.stringify(currentSection));
        localStorage.setItem("selectedEvent", JSON.stringify(event));
        dispatch(setCurrentSection("Attendee Details"));
        dispatch(setStepCounter(2));
    };

    return (
        <section className="font-roboto text-[#FAFAFA] flex flex-col gap-8 mx-auto md:p-6 max-w-[604px] rounded-[32px] md:border border-[#0E464F] md:bg-[#08252B]">
            <EventCard event={event} />
            <hr className="border- w-full border-[#07373F]" />
            <div className="flex flex-col gap-2">
                <label id="ticketTypeLabel">Select Ticket Type:</label>
                <div
                    className="grid md:grid-cols-3 gap-8 md:gap-4 bg-[#052228] border border-[#07373F] p-4 rounded-3xl"
                    role="radiogroup"
                    aria-labelledby="ticketTypeLabel"
                >
                    {availableTickets.map((ticket, index) => {
                        const isSelected =
                            selectedTicket.accessType === ticket.accessType;
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedTicket(ticket)}
                                role="radio"
                                aria-checked={isSelected}
                                className={`min-h-[110px] p-3 border-[#197686] rounded-xl flex flex-col justify-between transition-colors ease-in-out duration-300 cursor-pointer hover:bg-[#2C545B] ${
                                    isSelected
                                        ? "bg-[#12464E] border"
                                        : "bg-transparent border-2"
                                }`}
                            >
                                <p className="text-start font-semibold text-2xl leading-[26.4px] text-white">
                                    {ticket.fee}
                                </p>
                                <div className="text-start">
                                    <p>{ticket.accessType}</p>
                                    <p className="text-[#D9D9D9] text-sm leading-[21px]">
                                        {ticket.date}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
                {errorMessage && (
                    <p
                        id="ticketError"
                        role="alert"
                        aria-live="assertive"
                        className="text-red-500 font-semibold text-sm"
                    >
                        {errorMessage.ticketSelected}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <p>Number of Tickets</p>
                <div className="flex flex-col gap-1">
                    <Select
                        options={[1, 2, 3, 4, 5, 6, 7, 8]}
                        setNumberOfTickets={setNumberOfTickets}
                        numberOfTickets={numberOfTickets}
                        placeholder="Select required number"
                    />
                    {errorMessage && (
                        <p
                            role="alert"
                            aria-live="assertive"
                            className="text-red-500 font-semibold text-sm"
                        >
                            {errorMessage.ticketNumber}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 font-jeju">
                <Button
                    onClick={navigateToAboutPage}
                    aria-label="Cancel and return to the about page"
                    className="flex-1 border border-[#24A0B5] text-[#24A0B5] rounded-lg focus:ring-2 focus:ring-blue-500 hover:text-white hover:bg-[#24A0B5] transition-colors ease-in-out duration-300"
                >
                    Cancel
                </Button>
                <Button
                    onClick={nextSection}
                    aria-label="Proceed to the next section"
                    className="flex-1 bg-[#24A0B5] rounded-lg text-white focus:ring-2 focus:ring-blue-500 hover:text-[#24A0B5] hover:border hover:border-[#24A0B5] hover:bg-transparent transition-colors ease-in-out duration-300"
                >
                    Next
                </Button>
            </div>
        </section>
    );
}

EventBooking.propTypes = {
    setStepCounter: PropTypes.func,
    setCurrentSection: PropTypes.func,
    event: PropTypes.object,
};

export default EventBooking;
