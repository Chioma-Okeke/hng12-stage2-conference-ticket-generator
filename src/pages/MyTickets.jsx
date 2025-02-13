import { useEffect, useState } from "react";
import AnimatedSection from "../components/shared/AnimatedSection";
import { getTicketsFromDB } from "../utils/storage";
import barcode from "../assets/barcode.svg"
import PropTypes from "prop-types"

function MyTickets() {
    const [fetchedData, setFetchedData] = useState([]);

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
                console.log(data);
                if (data) {
                    setFetchedData(data);
                }
            } catch (error) {
                console.error("Error when fetching data:", error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="pt-[46px] mb-[42px] mb:mb-[112px] h-screen">
            <AnimatedSection>
                <div className="flex flex-col gap-8 p-6 md:p-12 rounded-[40px] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] max-w-[800px] mx-auto">
                <h1 className="text-2xl font-bold text-white mb-6">
                🎟️ Your Tickets
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {fetchedData.length > 0 ? (
                    fetchedData.map((ticket, index) => (
                        <TicketCard key={index} ticket={ticket} />
                    ))
                ) : (
                    <p className="text-gray-400">No tickets found.</p>
                )}
            </div>
                </div>
            </AnimatedSection>
        </div>
    );
}

const TicketCard = ({ ticket }) => {
  return (
      <div className="relative w-[280px] lg:w-[350px] bg-[#07333c] border border-[#24A0B5] rounded-xl p-4 shadow-lg text-white">
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

          <div className="bg-[#031E21] p-3 rounded-lg border border-[#12464e]">
              <div className="flex justify-between border-b border-[#12464e] pb-2">
                  <div>
                      <p className="text-xs opacity-50">Name</p>
                      <p className="text-sm font-bold">{ticket.userData.fullName}</p>
                  </div>
                  <div>
                      <p className="text-xs opacity-50">Email</p>
                      <p className="text-sm font-bold break-all">
                          {ticket.userData.emailAddress}
                      </p>
                  </div>
              </div>

              <div className="flex gap-4 border-b border-[#12464e] py-2">
                  <div>
                      <p className="text-xs opacity-50">Ticket Type</p>
                      <p className="text-sm">{ticket?.ticketData?.selectedTicket?.accessType}</p>
                  </div>
                  <div>
                      <p className="text-xs opacity-50">Quantity</p>
                      <p className="text-sm">{ticket.ticketData.numberOfTickets}</p>
                  </div>
              </div>
{/* 
              {ticket.specialRequest && (
                  <div className="pt-2">
                      <p className="text-xs opacity-50">Special Request</p>
                      <p className="text-sm">{ticket.userData.specialRequest}</p>
                  </div>
              )} */}
          </div>

          <div className="flex justify-center mt-4">
              <img src={barcode} alt="barcode" className="w-24" />
          </div>
      </div>
  );
};

TicketCard.propTypes = {
  ticket: PropTypes.object
}

export default MyTickets;
