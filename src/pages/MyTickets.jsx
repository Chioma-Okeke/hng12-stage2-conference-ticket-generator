import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import barcode from "../assets/barcode.svg";
import { clearTicketsDB, getTicketsFromDB } from "../utils/storage";
import AnimatedSection from "../components/shared/AnimatedSection";
import Button from "../components/shared/Button";
import Spinner from "../components/shared/Spinner";

function MyTickets() {
    const [fetchedData, setFetchedData] = useState([]);
    const navigate = useNavigate();
    const [isDeleteInProgress, setIsDeleteInProgress] = useState(false);

    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getTicketsFromDB();
                if (data) {
                    setFetchedData(data);
                }
            } catch (error) {
                console.error("Error when fetching data:", error);
            }
        };

        fetchTickets();
    }, []);

    const clearDB = async () => {
        setIsDeleteInProgress(true);
        try {
            await clearTicketsDB();
            setTimeout(() => {
                navigate(0);
            }, 500);
        } catch (error) {
            console.error("Error when fetching data:", error);
        } finally {
            setIsDeleteInProgress(false);
        }
    };

    return (
        <div className="pt-[46px] mb-[42px] mb:mb-[112px] min-h-screen">
            <AnimatedSection>
                <div
                    className={`${
                        fetchedData.length > 0 ? "flex" : " block"
                    } h-screen overflow-y-auto tickets-container flex-col gap-8 text-[#FAFAFA] p-6 md:p-12 rounded-[40px] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] max-w-[1000px] mx-auto`}
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold mb-6">
                            🎟️ Your Tickets
                        </h1>
                        {fetchedData.length > 0 && (
                            <Button
                                onClick={clearDB}
                                aria-label="Delete all tickets"
                                className="border border-[#24A0B5] text-[#24A0B5] rounded-lg focus:ring-2 focus:ring-blue-500 hover:text-white hover:bg-[#24A0B5] transition-colors ease-in-out duration-300"
                            >
                                Delete all Tickets
                            </Button>
                        )}
                    </div>
                    <div
                        className={`${
                            fetchedData.length > 0
                                ? "grid"
                                : "h-[70%] flex items-center"
                        } grid-cols-1 md:grid-cols-2 gap-6 mx-auto `}
                    >
                        {fetchedData.length > 0 ? (
                            fetchedData.map((ticket, index) => (
                                <TicketCard key={index} ticket={ticket} />
                            ))
                        ) : (
                            <p className="text-center mx-auto text-xl">
                                No tickets found.
                            </p>
                        )}
                    </div>
                    {isDeleteInProgress && <Spinner />}
                </div>
            </AnimatedSection>
        </div>
    );
}

const TicketCard = ({ ticket }) => {
    return (
        <div className="relative sm:w-[280px] lg:w-[350px] bg-[#07333c] border border-[#24A0B5] rounded-xl p-4 shadow-lg text-white flex flex-col justify-between">
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold text-center">
                    {ticket.eventName || "Techember Fest '25"}
                </h2>
                <p className="text-sm opacity-80">
                    📍 {ticket.location || "04 Rumens Road, Ikoyi, Lagos"}
                </p>
                <p className="text-sm opacity-80">
                    📅 {ticket.date || "March 15, 2025 | 7:00 PM"}
                </p>
            </div>

            <div className="w-full flex justify-center my-4">
                <img
                    src={ticket?.userData?.profilePhoto}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-[#24A0B5]"
                />
            </div>

            <div className="bg-[#031E21] p-3 rounded-lg border border-[rgb(18,70,78)]">
                <div className="flex flex-col sm:flex-row gap-4  justify-between border-b border-[#12464e] pb-2">
                    <div>
                        <p className="text-xs opacity-50">Name</p>
                        <p className="text-sm font-bold">
                            {ticket.userData.fullName}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs opacity-50">Email</p>
                        <p className="text-sm font-bold break-all">
                            {ticket.userData.emailAddress}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between border-b border-[#12464e] py-2">
                    <div>
                        <p className="text-xs opacity-50">Ticket Type</p>
                        <p className="text-sm">
                            {ticket?.ticketData?.selectedTicket?.accessType}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs opacity-50">Quantity</p>
                        <p className="text-sm">
                            {ticket.ticketData.numberOfTickets}
                        </p>
                    </div>
                </div>

                {ticket.userData.specialRequest && (
                    <div className="pt-2">
                        <p className="text-xs opacity-50">Special Request</p>
                        <p className="text-sm">
                            {ticket.userData.specialRequest}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-4">
                <img src={barcode} alt="barcode" className="w-24" />
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.object,
};

export default MyTickets;
