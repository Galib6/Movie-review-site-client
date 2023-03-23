import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useNotification, useTheme } from '../../hook';
import { isValidEmail } from '../../utils/helper';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';


const validateUserInfo = ({ name, email, password }) => {
    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
        return { ok: false, error: "Password must be 8 characters long!" };
    return { ok: true };
};



const Signin = () => {
    const { updateNotification } = useNotification()
    const { handleLogin, authInfo } = useAuth()
    const { isPending, isLoggedIn } = authInfo

    const navigate = useNavigate()


    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const handleChange = ({ target }) => {
        const { value, name } = target
        setUserInfo({ ...userInfo, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { ok, error } = validateUserInfo(userInfo);
        if (!ok) return updateNotification("error", error)

        handleLogin(userInfo.email, userInfo.password)

    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        } // we want to move out user somewhere else
    }, [isLoggedIn])

    return (
        <FormContainer >
            <Container>
                <form onSubmit={handleSubmit} action=" " className={commonModalClasses + ' w-72'}>
                    <Title>Sign in</Title>
                    <FormInput
                        value={userInfo.email}
                        onChange={handleChange}
                        label="Email"
                        placeholder="galib@gmail.com"
                        name="email"
                    ></FormInput>
                    <FormInput
                        value={userInfo.password}
                        onChange={handleChange}
                        label="Password"
                        placeholder="******"
                        name="password"
                        type="password"
                    ></FormInput>

                    <Submit value="Sign in" busy={isPending}></Submit>

                    <div className="flex justify-between">
                        <CustomLink to="/auth/forgot-password" children="Forget Password"></CustomLink>
                        <CustomLink to="/auth/signup" children="Sign up"></CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer >
    );
};

export default Signin;