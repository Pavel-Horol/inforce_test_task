import {createBrowserRouter, Navigate} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import Home, {homeLoader} from "../pages/Home.tsx";
import ProductPage from "../pages/ProductPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Navigate to="/home" />
            },
            {
                loader: homeLoader,
                path: "home",
                element: <Home/>,
            },
            {
                path: "home/:id",
                element: <ProductPage/>
            }
        ]
    }
])