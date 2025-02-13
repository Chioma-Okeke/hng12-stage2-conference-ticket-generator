import { Outlet } from "react-router-dom";

import NavSection from "../components/Nav";

function PageLayout() {
    return (
        <main className="relative px-5 lg:p-0 bg-[]">
            <NavSection />
            <div tabIndex={0}>
                <Outlet />
            </div>
        </main>
    );
}

export default PageLayout;
