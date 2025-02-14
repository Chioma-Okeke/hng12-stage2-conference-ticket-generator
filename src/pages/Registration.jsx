import { useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FormProvider, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
    resetStep,
    setCurrentSection,
    setStepCounter,
} from "../redux/stepSlice";

import EventBooking from "../components/EventBooking";
import CreatedTicket from "../components/CreatedTicket";
import EventContainer from "../components/EventContainer";
import AnimatedSection from "../components/shared/AnimatedSection";
import AttendeeDetailsForm from "../components/AttendeeDetailsForm";
import { useLocation, useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../utils/storage";

function Registration() {
    const stepCounter = useSelector((state) => state.step.stepCounter);
    const currentSection = useSelector((state) => state.step.currentSection);
    const methods = useForm();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    useEffect(() => {
        window.scrollTo(0, { top: 0, behavior: "smooth" });

        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            methods.reset(JSON.parse(storedFormData));
        }

        const currentSection = localStorage.getItem("Current section");
        if (currentSection) {
            try {
                const data = JSON.parse(currentSection);
                dispatch(setStepCounter(data.step));
                dispatch(setCurrentSection(data.sectionTitle));
            } catch (error) {
                console.error(error);
            }
        }

        const checkStorageClear = () => {
            if (!localStorage.getItem("formData")) {
                methods.reset();
            }
        };

        window.addEventListener("storage", checkStorageClear);
        return () => window.removeEventListener("storage", checkStorageClear);
    }, [methods, dispatch]);

    const stepVariants = {
        initial: { opacity: 0.2, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0.2, x: -30 },
    };

    const navigateBackToEvents = () => {
        clearLocalStorage();
        dispatch(resetStep());
        navigate("/");
    };

    return (
        <div>
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    e.key === "Enter" && navigateBackToEvents;
                }}
                onClick={navigateBackToEvents}
                className="w-fit flex gap-2 items-center text-[#FAFAFA] font-jeju text-sm md:text-base pl-5 pt-5 cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:underline-offset-4"
            >
                <FaArrowRightLong className="transform rotate-180" />
                <p>Back to available events</p>
            </div>
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
                                    <EventBooking event={event} />
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

export default Registration;
