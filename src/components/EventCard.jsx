import PropTypes from "prop-types";

function EventCard({ event, cardClass, register }) {
    return (
        <div
        tabIndex={0}
        onKeyDown={(e) => {
            e.key === "Enter" && register()
        }}
            onClick={register}
            className={`flex flex-col items-center sm:h-[243px] md:h-auto justify-between md:justify-start gap-4 md:gap-2 relative py-4 px-3 sm:px-6 md:p-6 rounded-3xl border border-l-2 border-r-2 border-b-2 border-[#07373F] ticket-background ${cardClass}`}
        >
            <div className="flex flex-col sm:gap-2 event-name-card">
                <h1 className="text-center text-5xl md:text-[62px] font-roadRage leading-[62px] ">
                    {event.name}
                </h1>
                <p className="text-center text-sm sm:text-base max-w-[239px] sm:max-w-[340px]">
                    {`Join us for an unforgettable experience at ${event.name}
                     Secure your spot now.`}
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-1 sm:gap-4 items-center text-sm sm:text-base">
                <span>📍 {event.location}</span>
                <span className="hidden md:block">| |</span>
                <span>{event.date}</span>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    event: PropTypes.object,
    cardClass: PropTypes.string,
    register: PropTypes.func
};

export default EventCard;
