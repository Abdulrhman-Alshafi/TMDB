import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import ErrorPage from "./pages/NotFound";
import Home from "./pages/Home";
import Search from "./pages/Search";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "search", element: <Search /> }
        ]
    }
]);
export default router;