import Button from "./shared/Button";
import PropTypes from "prop-types";
import Ticket from "./Ticket";
import { useEffect } from "react";

function CreatedTicket({ setStepCounter, setCurrentSection }) {
    const bookAnotherTicket = () => {
        setCurrentSection("Ticket Selection");
        setStepCounter(1);
    };
    
    useEffect(() => {
            window.scrollTo(0, {
                top: 0,
                behavior: "smooth",
            });
        }, []);

    return (
        <section className="text-[#FAFAFA] mx-auto max-w-[700px] rounded-3xl">
            <div className="flex flex-col items-center gap-3 lg:gap-4">
                <h1 className="text-2xl lg:text-[32px] leading-[33.6px] lg:leading-[40.96px] text-center text-white">
                    Your Ticket is Booked!
                </h1>
                <p className="font-roboto text-center text-[#FAFAFA]">
                    Check your email for a copy or you can{" "}
                    <span className="hidden lg:inline font-bold">download</span>
                </p>
            </div>
            <div className="mt-[32px] mb-6 py-[32px]">
                <Ticket />
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6">
                <Button
                    onClick={bookAnotherTicket}
                    className="flex-1 border border-[#24A0B5] rounded-lg"
                >
                    Book Another Ticket
                </Button>
                <Button className="flex-1 bg-[#24A0B5] rounded-lg text-white">
                    Download Ticket
                </Button>
            </div>
        </section>
    );
}

CreatedTicket.propTypes = {
    setStepCounter: PropTypes.func,
    setCurrentSection: PropTypes.func,
};

export default CreatedTicket;
