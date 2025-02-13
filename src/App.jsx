import PageLayout from "./layout/PageLayout";
import AboutProject from "./pages/AboutProject";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home"
import { Provider } from "react-redux";
import store from "./redux/store";

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
                <Route path="aboutproject" element={<AboutProject />} />
                <Route path="tickets" element={<MyTickets />} />

                <Route path="*" element />
            </Route>
        </Route>
    )
);

function App() {
    return (
        <div>
            <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
            </Provider>
        </div>
    );
}

export default App;
