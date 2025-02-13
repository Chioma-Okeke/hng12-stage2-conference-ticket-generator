import { useEffect, useState } from "react";
import Select from "./shared/Select";
import Button from "./shared/Button";
import PropTypes, { number } from "prop-types";
import { useNavigate } from "react-router-dom";

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

function EventBooking({ setStepCounter, setCurrentSection }) {
    const [selectedTicket, setSelectedTicket] = useState({});
    const [numberOfTickets, setNumberOfTickets] = useState(null);
    const navigate = useNavigate()

    const navigateToAboutPage = () => [
        navigate("/aboutproject")
    ]

    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth",
        });

        const storedData = localStorage.getItem("Selected Ticket Details");
        if (storedData) {
            const data = JSON.parse(storedData);
            console.log("Fetched data:", data);
            setNumberOfTickets(data.numberOfTickets)
            setSelectedTicket(data.selectedTicket)
        }
    }, []);

    const nextSection = () => {
        const ticketDetails = {
            numberOfTickets,
            selectedTicket,
        };

        const currentSection = {
            step: 2,
            sectionTitle: "Attendee Details"
        }

        console.log("Storing in localStorage:", ticketDetails);

        localStorage.setItem(
            "Selected Ticket Details",
            JSON.stringify(ticketDetails)
        );

        console.log(selectedTicket, numberOfTickets);
        localStorage.setItem(
            "Current section",
            JSON.stringify(currentSection)
        );
        setCurrentSection("Attendee Details");
        setStepCounter(2);
    };

    return (
        <section className="text-[#FAFAFA] flex flex-col gap-8 mx-auto md:p-6 max-w-[604px] rounded-[32px] md:border border-[#0E464F] md:bg-[#08252B]">
            <div className="flex flex-col items-center sm:h-[243px] md:h-auto justify-between md:justify-start gap-8 md:gap-2 relative py-4 px-6 md:p-6 rounded-3xl border border-l-2 border-r-2 border-b-2 border-[#07373F] bg-[#0A0C11]/10 bg-[radial-gradient(circle_at_top_left,_#24A0B533,_transparent)]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-center text-3xl sm:text-5xl md:text-[62px] font-roadRage leading-[62px] ">
                        Techember Fest ”25
                    </h1>
                    <p className="text-center text-sm md:text-base max-w-[340px] font-roboto">
                        Join us for an unforgettable experience at [Event Name]!
                        Secure your spot now.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center text-sm sm:text-base">
                    <span>📍 [Event Location]</span>
                    <span className="hidden md:block">| |</span>
                    <span>March 15, 2025 | 7:00 PM</span>
                </div>
            </div>
            <hr className="border- w-full border-[#07373F]" />
            <div className="flex flex-col gap-2">
                <p>Select Ticket Type:</p>
                <div className="grid md:grid-cols-3 gap-8 md:gap-0 bg-[#052228] border border-[#07373F] p-4 rounded-3xl">
                    {availableTickets.map((ticket, index) => {
                        return (
                            <button
                                onClick={() => setSelectedTicket(ticket)}
                                className={`md:max-w-[158px] p-3 border-2 border-[#197686] rounded-xl flex flex-col gap-3 transition-colors ease-in-out duration-300 cursor-pointer hover:bg-[#2C545B] ${
                                    selectedTicket.accessType ===
                                    ticket.accessType
                                        ? "bg-[#12464E]"
                                        : "bg-transparent"
                                }`}
                                key={index}
                            >
                                <p className="font-semibold text-2xl leading-[26.4px] text-white">
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
            </div>
            <div className="flex flex-col gap-2">
                <p>Number of Tickets</p>
                <div>
                    <Select
                        options={[1, 2, 3, 4, 5, 6, 7, 8]}
                        setNumberOfTickets={setNumberOfTickets}
                        numberOfTickets={numberOfTickets}
                    />
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
                <Button onClick={navigateToAboutPage} className="flex-1 border border-[#24A0B5] rounded-lg">
                    Cancel
                </Button>
                <Button
                    onClick={nextSection}
                    className="flex-1 bg-[#24A0B5] rounded-lg text-white"
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
};

export default EventBooking;
