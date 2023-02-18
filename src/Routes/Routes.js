import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Signin from "../Components/auth/Signin";
import Signup from "../Components/auth/Signup";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/signin",
                element: <Signin></Signin>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },

        ]
    },

])