import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { clearTicketsDB, getTicketsFromDB } from "../utils/storage";
import AnimatedSection from "../components/shared/AnimatedSection";
import Button from "../components/shared/Button";
import Spinner from "../components/shared/Spinner";
import TicketCard from "../components/TicketCard";

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
                if (JSON.stringify(data) !== JSON.stringify(fetchedData)) {
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
                setFetchedData([]);
            }, 500);
        } catch (error) {
            console.error("Error when fetching data:", error);
        } finally {
            setIsDeleteInProgress(false);
        }
    };

    const openTicket = useCallback(
        (ticket) => {
            navigate("/individualticket", {
                state: { ticket },
            });
        },
        [navigate]
    );

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
                            fetchedData.length > 1
                                ? "grid"
                                : "h-[70%] flex items-center"
                        } grid-cols-1 md:grid-cols-2 gap-6 mx-auto `}
                    >
                        {fetchedData.length > 0 ? (
                            fetchedData.map((ticket, index) => (
                                <TicketCard
                                    key={index}
                                    ticket={ticket}
                                    viewTicket={openTicket}
                                />
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

export default MyTickets;
