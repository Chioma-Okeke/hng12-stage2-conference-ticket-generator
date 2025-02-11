import { Outlet } from "react-router-dom";
// import BackToTop from "../components/BackToTop";
// import Nav from "../components/Nav";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setTransparentNav } from "../store/navSlice";
import NavSection from "../components/Nav";

function PageLayout() {
    // const [showNav, setShowNav] = useState(false);
    // const { pathname } = useLocation();
    // const dispatch = useDispatch();
    // console.log(pathname);

    // useEffect(() => {
    //     dispatch(setTransparentNav(pathname === "/outreaches"));
    // }, [pathname, dispatch]);

    // function handleNavToggle() {
    //     setShowNav(!showNav);
    // }

    return (
        <main className="relative px-5 lg:p-0">
            <NavSection
            // handleNavToggle={handleNavToggle}
            // showNav={showNav}
            // setShowNav={setShowNav}
            />
            <div tabIndex={0} className="pt-[46px]">
                <Outlet />
            </div>
        </main>
    );
}

export default PageLayout;
