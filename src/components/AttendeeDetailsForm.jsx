import axios from "axios";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import Button from "./shared/Button";
import Spinner from "./shared/Spinner";
import cloud from "../assets/cloud.svg";
import envelop from "../assets/envelop.svg";
import { setCurrentSection, setStepCounter } from "../redux/stepSlice";

function AttendeeDetailsForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = useFormContext();

    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const [showUploadIcon, setShowUploadIcon] = useState(false);

    const formValues = watch();

    useEffect(() => {
        window.scrollTo(0, { top: 0, behavior: "smooth" });
    }, []);

    const saveToLocalStorage = useCallback(
        debounce((values) => {
            localStorage.setItem("formData", JSON.stringify(values));
        }, 500),
        []
    );

    useEffect(() => {
        if (!Object.keys(formValues).length) return;

        saveToLocalStorage(formValues);

        return () => saveToLocalStorage.cancel();
    }, [formValues]);

    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (!storedData) return;
        try {
            const parsedData = JSON.parse(storedData);
            if (!parsedData || typeof parsedData !== "object") return;

            setPreview(parsedData.profilePhoto);
            reset(parsedData);
        } catch (error) {
            console.error("Error parsing form data:", error);
        }
    }, []);

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file) {
            const newPreview = URL.createObjectURL(file);
            setPreview(newPreview);

            await uploadToCloudinary(file);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const newPreview = URL.createObjectURL(file);
            setPreview(newPreview);

            await uploadToCloudinary(file);
        }
    };

    const uploadToCloudinary = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }/image/upload`,
                formData
            );
            const imageUrl = response.data.secure_url;
            setValue("profilePhoto", imageUrl);
            alert("Image upload successful. Nice.");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed. Try again.");
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            localStorage.setItem("formData", JSON.stringify(data));
            reset();
            nextSection();
        } catch (error) {
            console.error(error);
            alert("Failed to submit. Please try again.");
        }
    };

    const nextSection = () => {
        const currentSection = {
            step: 3,
            sectionTitle: "Ready",
        };
        localStorage.setItem("Current section", JSON.stringify(currentSection));
        dispatch(setCurrentSection("Ready"));
        dispatch(setStepCounter(3));
    };

    const previousSection = () => {
        const currentSection = {
            step: 1,
            sectionTitle: "Ticket Selection",
        };
        localStorage.setItem("Current section", JSON.stringify(currentSection));
        dispatch(setCurrentSection("Ticket Selection"));
        dispatch(setStepCounter(1));
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="text-[#FAFAFA] font-roboto flex flex-col gap-8 mx-auto md:p-6 max-w-[604px] rounded-[32px] md:border border-[#0E464F] md:bg-[#08252B]"
        >
            {/* Profile Photo Upload */}
            <div>
                <div className="relative flex flex-col gap-3 md:gap-8 justify-between p-6 rounded-3xl border border-[#07373F] bg-[#052228]">
                    <p id="file-upload-label">
                        Upload Profile Photo <span aria-hidden="true">*</span>
                    </p>
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        className="relative h-[240px] md:flex items-center justify-center curs"
                    >
                        <div
                            aria-hidden="true"
                            className="hidden md:block w-full h-[200px] bg-black/20"
                        ></div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="fileInput"
                            aria-describedby="file-upload-instructions"
                        />
                        <label
                            htmlFor="fileInput"
                            tabIndex={0}
                            role="button"
                            aria-labelledby="file-upload-label file-upload-instructions"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    document
                                        .getElementById("fileInput")
                                        .click();
                                }
                            }}
                            className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-60 max-w-60 rounded-[32px] border-4 border-[#24A0B5]/50 bg-[#0E464F] cursor-pointer"
                        >
                            {preview ? (
                                <div
                                    onMouseEnter={() => setShowUploadIcon(true)}
                                    onMouseLeave={() =>
                                        setShowUploadIcon(false)
                                    }
                                    className="relative"
                                >
                                    <img
                                        src={preview}
                                        tabIndex={0}
                                        aria-label="Uploaded profile picture. Press Enter to change the image."
                                        role="img"
                                        alt="Uploaded preview"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                document
                                                    .getElementById("fileInput")
                                                    .click();
                                            }
                                        }}
                                        className="w-full h-[240px] object-cover rounded-[32px]"
                                    />
                                    {showUploadIcon && (
                                        <div className="bg-black/20 absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center">
                                            <img
                                                src={cloud}
                                                alt="cloud icon"
                                                aria-hidden="true"
                                            />
                                            <p className="text-center px-6">
                                                Drag & drop or click to upload
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
                                    <img src={cloud} alt="cloud icon" />
                                    <p className="text-center px-6">
                                        Drag & drop or click to upload
                                    </p>
                                </div>
                            )}
                        </label>
                    </div>
                    {uploading && (
                        <div
                            className="text-center text-gray-300 "
                            aria-live="polite"
                        >
                            <Spinner />
                            <span className="sr-only">
                                Uploading file, please wait...
                            </span>
                        </div>
                    )}
                </div>
                {errors.profilePhoto && (
                    <InputError message={errors.profilePhoto.message} />
                )}
            </div>
            <input
                type="hidden"
                {...register("profilePhoto", {
                    required: "Avatar image is required",
                })}
            />
            <hr className="h-1 w-full border-[#07373F]" />
            <div className="flex flex-col gap-2">
                <label className="" htmlFor="fullName">
                    Enter your name <span>*</span>
                </label>
                <input
                    type="text"
                    id="fullName"
                    aria-label="Enter your full name"
                    aria-required="true"
                    aria-invalid={errors.fullName ? "true" : "false"}
                    className="border border-[#07373F] rounded-xl p-3 bg-transparent focus:outline-none"
                    {...register("fullName", {
                        required: "Full Name is required",
                    })}
                />
                {errors.fullName && (
                    <InputError message={errors.fullName.message} />
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="" htmlFor="emailAddress">
                    Enter your email <span>*</span>
                </label>
                <div className="flex gap-2 border border-[#07373F] rounded-xl p-3">
                    <img src={envelop} alt="envelop icon" />
                    <input
                        type="text"
                        id="emailAddress"
                        aria-required="true"
                        aria-label="Enter your email address"
                        aria-invalid={errors.emailAddress ? "true" : "false"}
                        placeholder="hello@avioflagos.io"
                        className="flex-1 bg-transparent placeholder:text-[#FAFAFA] focus:outline-none"
                        {...register("emailAddress", {
                            required: "Email address is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                </div>
                {errors.emailAddress && (
                    <InputError message={errors.emailAddress.message} />
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="" htmlFor="specialRequest">
                    Special request?
                </label>
                <textarea
                    id="specialRequest"
                    aria-invalid={errors.specialRequest ? "true" : "false"}
                    aria-label="Enter any special request you have."
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
            <div className="flex flex-col-reverse font-jeju lg:flex-row gap-4 lg:gap-6">
                <Button
                    type="button"
                    onClick={previousSection}
                    aria-label="Cancel and return to ticket selection section"
                    className="flex-1 border border-[#24A0B5] text-[#24A0B5] rounded-lg focus:ring-2 focus:ring-blue-500 hover:text-white hover:bg-[#24A0B5] transition-colors ease-in-out duration-300"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    aria-label="Proceed to conference ticket"
                    className="flex-1 bg-[#24A0B5] rounded-lg text-white focus:ring-2 focus:ring-blue-500 hover:text-[#24A0B5] hover:border hover:border-[#24A0B5] hover:bg-transparent transition-colors ease-in-out duration-300"
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
            transition={{ duration: 0.5 }}
            className="text-red-500 font-semibold text-sm"
        >
            <p role="alert" aria-live="assertive">
                {message}
            </p>
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
