import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const Select = ({ options, placeholder = "Select an option", numberOfTickets, setNumberOfTickets }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full text-white">
            {/* Select Box */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 border border-[#07373F] bg-[#052228] rounded-lg focus:ring-2 focus:ring-blue-500"
            >
                <span>{numberOfTickets ? numberOfTickets : placeholder}</span>
                <IoIosArrowDown
                    className={`w-5 h-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul className="absolute left-0 mt-2 w-full  border border-[#07373F] bg-[#052228] rounded-lg max-h-40 overflow-auto z-10">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => {
                                setNumberOfTickets(option);
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 flex justify-between items-center hover:border border-[#07373F] cursor-pointer"
                        >
                            {option}
                            {/* {selected?.value === option.value && (
                                <Check className="w-4 h-4 text-blue-500" />
                            )} */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Select.propTypes = {
    options: PropTypes.array,
    placeholder: PropTypes.string,
    numberOfTickets: PropTypes.number,
    setNumberOfTickets: PropTypes.func
};

export default Select;
