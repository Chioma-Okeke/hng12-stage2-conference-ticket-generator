import PageLayout from "./layout/PageLayout";
import AboutProject from "./pages/AboutProject";
import ErrorPage from "./pages/ErrorPage";
import Registration from "./pages/Registration";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import MyTickets from "./pages/MyTickets";
import Events from "./pages/Events";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={<PageLayout />}
                errorElement={<ErrorPage />}
            >
                <Route index element={<Events />} />
                <Route path=":event" element={<Registration />} />
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
