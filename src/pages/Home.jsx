import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSection, setStepCounter } from "../redux/stepSlice";

import EventBooking from "../components/EventBooking";
import CreatedTicket from "../components/CreatedTicket";
import EventContainer from "../components/EventContainer";
import AnimatedSection from "../components/shared/AnimatedSection";
import AttendeeDetailsForm from "../components/AttendeeDetailsForm";

function Home() {
    const stepCounter = useSelector((state) => state.step.stepCounter);
    const currentSection = useSelector((state) => state.step.currentSection);
    const methods = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            methods.reset(JSON.parse(storedFormData));
        }
    }, [methods]);

    useEffect(() => {
        const checkStorageClear = () => {
            if (!localStorage.getItem("formData")) {
                methods.reset();
            }
        };

        window.addEventListener("storage", checkStorageClear);
        return () => window.removeEventListener("storage", checkStorageClear);
    }, [methods]);

    useEffect(() => {
        window.scrollTo(0, { top: 0, behavior: "smooth" });

        const currentSection = localStorage.getItem("Current section");
        if (currentSection) {
            const data = JSON.parse(currentSection);
            dispatch(setStepCounter(data.step));
            dispatch(setCurrentSection(data.sectionTitle));
        }
    }, [dispatch]);

    const stepVariants = {
        initial: { opacity: 0.2, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0.2, x: -30 },
    };

    return (
        <div>
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
                                    <EventBooking />
                                </>
                            )}
                            {stepCounter === 2 && (
                                <>
                                    <FormProvider {...methods}>
                                        <AttendeeDetailsForm />
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
