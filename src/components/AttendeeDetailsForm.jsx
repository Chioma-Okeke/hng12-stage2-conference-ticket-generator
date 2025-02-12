import Button from "./shared/Button";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import envelop from "../assets/envelop.svg";
import cloud from "../assets/cloud.svg";
import { useEffect } from "react";

function AttendeeDetailsForm({ setStepCounter, setCurrentSection }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useFormContext();

    useEffect(()=> {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth"
        })
    }, [])

    const onSubmit = async (data) => {
        try {
            // const response = await axios.post(
            //     apiUrl,
            //     data,
            //     { headers: { Accept: "application/json" } }
            // );
            // console.log("Message sent: ", response);
            console.log(data);
            reset();
        } catch (error) {
            console.error(error);
            alert("Failed to send message. Please try again.");
        }
    };

    const nextSection = () => {
        setCurrentSection("Ready");
        setStepCounter(3);
    };

    const previousSection = () => {
        setCurrentSection("Ticket Selection");
        setStepCounter(1);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="text-[#FAFAFA] font-roboto flex flex-col gap-8 mx-auto lg:p-6 max-w-[604px] rounded-[32px] lg:border border-[#0E464F] lg:bg-[#08252B]"
        >
            <div className="relative flex flex-col gap-3 lg:gap-8 sm:h-[243px] lg:h-auto justify-between p-6 rounded-3xl border border-[#07373F] bg-[#052228]">
                <p>Upload Profile Photo</p>
                <div className="relative h-[240px] lg:flex items-center justify-center">
                    <div className="hidden lg:block w-full h-[200px] bg-black/20"></div>
                    <div tabIndex={0} className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col gap-4 justify-center items-center h-60 w-60 rounded-[32px] p-6 border-4 border-[#24A0B5]/50 bg-[#0E464F] cursor-pointer">
                        <img src={cloud} alt="cloud icon" />
                        <p className="text-center">
                            Drag & drop or click to upload
                        </p>
                    </div>
                </div>
            </div>
            <hr className="h-1 w-full border-[#07373F]" />
            <div className="flex flex-col gap-2">
                <label className="" htmlFor="name">
                    Enter your name
                </label>
                <input
                    type="text"
                    id="name"
                    aria-invalid={errors.name ? "true" : "false"}
                    className="border border-[#07373F] rounded-xl p-3 bg-transparent focus:outline-none"
                    {...register("name")}
                />
                {errors.name && <InputError message={errors.name.message} />}
            </div>
            <div className="flex flex-col gap-2">
                <label className="" htmlFor="email">
                    Enter your email <span>*</span>
                </label>
                <div className="flex gap-2 border border-[#07373F] rounded-xl p-3">
                    <img src={envelop} alt="envelop icon" />
                    <input
                        type="text"
                        id="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        placeholder="hello@avioflagos.io"
                        className="flex-1 bg-transparent placeholder:text-[#FAFAFA] focus:outline-none"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                </div>
                {errors.email && <InputError message={errors.email.message} />}
            </div>
            <div className="flex flex-col gap-2">
                <label className="" htmlFor="specialRequest">
                    Special request?
                </label>
                <textarea
                    id="specialRequest"
                    aria-invalid={errors.specialRequest ? "true" : "false"}
                    type="text"
                    placeholder="Textarea"
                    className="border border-[#07373F] rounded-xl p-3 bg-transparent focus:outline-none"
                    rows={5}
                    {...register("specialRequest")}
                ></textarea>
                {errors.specialRequest && (
                    <InputError message={errors.specialRequest.message} />
                )}
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
                <Button
                    onClick={previousSection}
                    className="flex-1 border border-[#24A0B5] rounded-lg "
                >
                    Back
                </Button>
                <Button
                    onClick={nextSection}
                    className="flex-1 bg-[#24A0B5] rounded-lg text-white"
                >
                    Get My Free Ticket
                </Button>
            </div>
        </form>
    );
}

function InputError({ message }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-500 font-semibold text-sm"
        >
            <span>{message}</span>
        </motion.div>
    );
}

InputError.propTypes = {
    message: PropTypes.string,
};

AttendeeDetailsForm.propTypes = {
    setStepCounter: PropTypes.func,
    setCurrentSection: PropTypes.func,
};

export default AttendeeDetailsForm;
