import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Signin from "../Components/auth/Signin";
import Signup from "../Components/auth/Signup";
import Home from "../Components/Home";
import Emailverification from "../Components/auth/Emailverification";
import ForgotPassword from "../Components/auth/ForgotPassword";
import ConfirmPassword from "../Components/auth/ConfirmPassword";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "auth/signin",
                element: <Signin></Signin>
            },
            {
                path: "auth/signup",
                element: <Signup></Signup>
            },
            {
                path: "auth/verification",
                element: <Emailverification></Emailverification>
            },
            {
                path: "auth/forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "auth/confirm-password",
                element: <ConfirmPassword></ConfirmPassword>
            },

        ]
    },

])