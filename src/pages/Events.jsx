import { FaArrowRightLong } from "react-icons/fa6";
import EventCard from "../components/EventCard";
import AnimatedSection from "../components/shared/AnimatedSection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    resetStep,
    setCurrentSection,
    setStepCounter,
} from "../redux/stepSlice";

const events = [
    {
        name: "Techember Fest ”25",
        location: "Oshodi, Nigeria",
        date: "Feb 15, 2025 | 9:00 AM",
    },
    {
        name: "HacktoberFest ”25",
        location: "Lekki, Nigeria",
        date: "March 15, 2025 | 9:00 AM",
    },
    {
        name: "Unwind Fest ”25",
        location: "VI, Nigeria",
        date: "April 15, 2025 | 9:00 AM",
    },
    {
        name: "Google scholars Fest ”25",
        location: "Gbagadg, Nigeria",
        date: "Jun 15, 2025 | 9:00 AM",
    },
    {
        name: "Lagos tech Fest ”25",
        location: "Lagos, Nigeria",
        date: "July 15, 2025 | 9:00 AM",
    },
];

function Events() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerForEvent = (event) => {
        const currentSection = {
            step: 1,
            sectionTitle: "Ticket Selection",
        };
        localStorage.setItem("Current section", JSON.stringify(currentSection));
        dispatch(resetStep());
        navigate(`/${event.name}`, {
            state: {
                event: event,
            },
        });
    };

    return (
        <div>
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    e.key === "Enter" && navigate("/aboutproject");
                }}
                onClick={() => navigate("/aboutproject")}
                className="w-fit flex gap-2 items-center text-[#FAFAFA] font-jeju text-sm md:text-base md:pl-5 pt-5 cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:underline-offset-4"
            >
                <FaArrowRightLong className="transform rotate-180" />
                <p>Back to project description</p>
            </div>
            <div className="pt-[46px] mb-5 mb:mb-[112px] min-h-screen">
                <AnimatedSection>
                    <div
                        className={`grid lg:grid-cols-2 h-screen overflow-y-auto tickets-container flex-col gap-8 text-[#FAFAFA] p-6 md:p-12 rounded-[40px] border border-[#0E464F] bg-[#08252B] md:bg-[#041E23] max-w-[1200px] mx-auto`}
                    >
                        {events.map((event, index) => {
                            return (
                                <EventCard
                                    key={index}
                                    event={event}
                                    register={() => registerForEvent(event)}
                                    cardClass="cursor-pointer hover:shadow-xl hover:border-2 hover:border-[#24A0B5] transition ease-in-out duration-300"
                                />
                            );
                        })}
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}

export default Events;
