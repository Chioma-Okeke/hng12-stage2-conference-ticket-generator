import { useEffect, useState } from "react";
import EventContainer from "../components/EventContainer";
import AnimatedSection from "../components/shared/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import AttendeeDetailsForm from "../components/AttendeeDetailsForm";
import { FormProvider, useForm } from "react-hook-form";
import EventBooking from "../components/EventBooking";
import CreatedTicket from "../components/CreatedTicket";

function Home() {
    const [stepCounter, setStepCounter] = useState(1);
    const [currentSection, setCurrentSection] = useState("Ticket Selection");
    const storedFormData = localStorage.getItem("formData");
    const defaultFormData = storedFormData ? JSON.parse(storedFormData) : {};
    const methods = useForm({
        defaultValues: defaultFormData,
    });

    useEffect(() => {
        window.scrollTo(0, { top: 0, behavior: "smooth" });

        const currentSection = localStorage.getItem("Current section");
        if (currentSection) {
            const data = JSON.parse(currentSection)
            setStepCounter(data.step)
            setCurrentSection(data.sectionTitle)
        }
    }, []);

    const stepVariants = {
        initial: { opacity: 0.2, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0.2, x: -30 },
    };

    return (
        <div className="mt-[46px]">
            <AnimatedSection>
                <EventContainer
                    currentSection={currentSection}
                    stepCounter={stepCounter}
                    className="mb-[42px] md:mb-[112px]"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={stepCounter}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            variants={stepVariants}
                        >
                            {stepCounter === 1 && (
                                <>
                                    <EventBooking
                                        setStepCounter={setStepCounter}
                                        setCurrentSection={setCurrentSection}
                                    />
                                </>
                            )}
                            {stepCounter === 2 && (
                                <>
                                    <FormProvider {...methods}>
                                        <AttendeeDetailsForm
                                            setStepCounter={setStepCounter}
                                            setCurrentSection={
                                                setCurrentSection
                                            }
                                        />
                                    </FormProvider>
                                </>
                            )}
                            {stepCounter === 3 && (
                                <>
                                    <CreatedTicket
                                        setStepCounter={setStepCounter}
                                        setCurrentSection={setCurrentSection}
                                    />
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </EventContainer>
            </AnimatedSection>
        </div>
    );
}

export default Home;
