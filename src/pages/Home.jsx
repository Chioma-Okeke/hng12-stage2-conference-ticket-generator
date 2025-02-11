import { useState } from "react";
import EventContainer from "../components/EventContainer";
import AnimatedSection from "../components/shared/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import Events from "../components/Events";

function Home() {
    const [stepCounter, setStepCounter] = useState(1);

    const stepVariants = {
        initial: { opacity: 0.2, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0.2, x: -30 },
    };

    return (
        <div>
            <AnimatedSection>
                <EventContainer stepCounter={stepCounter}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={stepCounter} // Ensures re-render and animation trigger
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            variants={stepVariants}
                        >
                            {stepCounter === 1 && (
                                <>
                                    <Events setStepCounter={setStepCounter}/>
                                </>
                            )}
                            {stepCounter === 2 && (
                                <>
                                    <h1 className="bg-white text-black">
                                        Section 2
                                    </h1>
                                    <div>
                                        <button className="bg-white text-black">
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-white text-black"
                                            onClick={() => setStepCounter(3)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                            {stepCounter === 3 && (
                                <>
                                    <h1 className="bg-white text-black">
                                        Section 3
                                    </h1>
                                    <div>
                                        <button className="bg-white text-black">
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-white text-black"
                                            onClick={() => setStepCounter(1)}
                                        >
                                            Restart
                                        </button>
                                    </div>
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
