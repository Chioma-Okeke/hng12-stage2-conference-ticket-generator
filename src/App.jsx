import PageLayout from "./layout/PageLayout";
import AboutProject from "./pages/AboutProject";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import MyTickets from "./pages/MyTickets";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={<PageLayout />}
                errorElement={<ErrorPage />}
            >
                <Route index element={<Home />} />
                <Route path="about" element={<AboutProject />} />
                <Route path="services" element={<MyTickets />} />

                <Route path="*" element />
            </Route>
        </Route>
    )
);

function App() {
    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;
