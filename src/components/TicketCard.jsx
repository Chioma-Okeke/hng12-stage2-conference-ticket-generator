import PropTypes from "prop-types";
import barcode from "../assets/barcode.svg";
import { MdDeleteForever } from "react-icons/md";

const TicketCard = ({ ticket, viewTicket, deleteTicket }) => {
    const removeTicket = (e, ticket) => {
        console.log("worked", ticket.id)
        e.stopPropagation();
        deleteTicket(ticket);
    };

    return (
        <div
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && viewTicket(ticket)}
            onClick={() => viewTicket(ticket)}
            className="relative cursor-pointer sm:w-[280px] lg:w-[350px] bg-[#07333c] border border-[#24A0B5] hover:border-2 rounded-xl p-4 shadow-lg text-white flex flex-col justify-between"
        >
            <div
                className="flex justify-end mb-2"
                onClick={(e) => removeTicket(e, ticket)}
            >
                <MdDeleteForever
                    className="text-red-600 hover:scale-105"
                    size={20}
                />
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold text-center">
                    {ticket?.eventData?.name || "Techember Fest '25"}
                </h2>
                <p className="text-sm opacity-80">
                    📍{" "}
                    {ticket?.eventData?.location ||
                        "04 Rumens Road, Ikoyi, Lagos"}
                </p>
                <p className="text-sm opacity-80">
                    📅 {ticket?.eventData?.date || "March 15, 2025 | 7:00 PM"}
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
    viewTicket: PropTypes.func,
    deleteTicket: PropTypes.func,
};

export default TicketCard;
