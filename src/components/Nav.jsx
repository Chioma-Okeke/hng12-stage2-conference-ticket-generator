import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiArrowLongRight } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";

import Logo from "../assets/logo.svg";
import { resetStep } from "../redux/stepSlice";
import { clearLocalStorage } from "../utils/storage";

const navigationLinks = [
    {
        navMenu: "Events",
        link: "/",
    },
    {
        navMenu: "My tickets",
        link: "/tickets",
    },
    {
        navMenu: "About Project",
        link: "/aboutproject",
    },
];

function NavSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const navigateToMyTickets = () => {
        clearLocalStorage();
        dispatch(resetStep());
        navigate("/tickets");
    };

    const navigateHome = () => {
        dispatch(resetStep());
        clearLocalStorage();
        navigate("/");
    };

    return (
        <header className="pt-6 font-jeju">
            <div className="mx-auto flex items-center justify-between border border-[#197686] bg-[#05252C]/40 rounded-3xl py-3 px-4 max-w-[1200px]">
                <div tabIndex={0} onClick={navigateHome}>
                    <img
                        src={Logo}
                        alt="logo image"
                        className="transition-transform ease-in-out duration-200 hover:scale-105 cursor-pointer"
                    />
                </div>
                <nav className="hidden md:block ">
                    <ul className="flex items-center gap-4 text-lg">
                        {navigationLinks.map((navItem, index) => {
                            return (
                                <NavLink
                                    onClick={() => {
                                        clearLocalStorage();
                                        dispatch(resetStep());
                                    }}
                                    className={({ isActive }) => {
                                        return (
                                            "p-[10px] no-underline transition-all ease-in-out duration-100 hover:text-white " +
                                            (!isActive
                                                ? "text-[#B3B3B3]"
                                                : "text-white")
                                        );
                                    }}
                                    to={navItem.link}
                                    key={index}
                                >
                                    {navItem.navMenu}
                                </NavLink>
                            );
                        })}
                    </ul>
                </nav>
                <button
                    onClick={navigateToMyTickets}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    className={`text-xs sm:text-sm lg:text-base flex items-center gap-1 py-3 lg:py-4 px-2 sm:px-4 lg:px-6 rounded-xl transition-all ease-in-out duration-300 ${
                        isButtonHovered
                            ? "bg-[#24A0B5] text-[#D9D9D9]"
                            : "bg-white text-[#0A0C11]"
                    }`}
                >
                    <span>MY TICKETS</span>
                    <HiArrowLongRight
                        size={20}
                        className={`${
                            isButtonHovered
                                ? " -rotate-45 text-[#D9D9D9]"
                                : "text-[#0A0C11]"
                        } transition-all ease-in-out duration-300`}
                    />
                </button>
            </div>
        </header>
    );
}

export default NavSection;
