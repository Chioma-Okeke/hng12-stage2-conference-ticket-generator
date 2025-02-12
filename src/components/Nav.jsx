import Logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import RightArrow from "../assets/right-arrow.svg";

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
    return (
        <header className="pt-6">
            <div className="mx-auto flex items-center justify-between border border-[#197686] bg-[#05252C]/40 rounded-3xl py-3 px-4 max-w-[1200px]">
                <Link to="/">
                    <img src={Logo} alt="logo image" className="transition-transform ease-in-out duration-200 hover:scale-105"/>
                </Link>
                <nav className="hidden md:block font-jeju">
                    <ul className="flex items-center gap-4 text-lg">
                        {navigationLinks.map((navItem, index) => {
                            return (
                                <NavLink
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
                <button className="font-jeju text-sm lg:text-base text-[#0A0C11] flex items-center gap-1 py-3 lg:py-4 px-4 lg:px-6 rounded-xl bg-white hover:gap-3 transition-all ease-in-out duration-300">
                    <span>MY TICKETS</span>
                    <img src={RightArrow} alt="" />
                </button>
            </div>
        </header>
    );
}

export default NavSection;
