import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/Theme';
import FormContainer from '../form/FormContainer';
import { createUser } from '../../api/auth';
import { useAuth, useNotification } from '../../hook';
import { isValidEmail } from '../../utils/helper';



const validateUserInfo = ({ name, email, password }) => {

    // const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const isValidName = /^[a-z A-Z]+$/;

    if (!name.trim()) return { ok: false, error: "Name is missing!" };
    if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

    if (!email.trim()) return { ok: false, error: "Email is missing!" };
    if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

    if (!password.trim()) return { ok: false, error: "Password is missing!" };
    if (password.length < 8)
        return { ok: false, error: "Password must be 8 characters long!" };

    return { ok: true };
};



const Signup = () => {
    const navigate = useNavigate()

    const { updateNotification } = useNotification()
    const { handleLogin, authInfo } = useAuth()
    const { isPending, isLoggedIn } = authInfo


    const [userInfo, setUserInfo] = useState({
        name: "",
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
        const response = await createUser(userInfo);
        if (response.error) return updateNotification("error", response.error);

        navigate("/auth/verification",
            {
                state: { user: response.user },
                replace: true
            })
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/")
        } // we want to move out user somewhere else
    }, [isLoggedIn])


    const { name, email, password } = userInfo

    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className={commonModalClasses + ' w-72 '}>
                    <Title>Sign up</Title>
                    <FormInput
                        value={name}
                        onChange={handleChange}
                        label="Name"
                        placeholder="Rahim Islam"
                        name="name"
                    ></FormInput>
                    <FormInput
                        value={email}
                        onChange={handleChange}
                        label="Email"
                        placeholder="galib@gmail.com"
                        name="email"
                    ></FormInput>
                    <FormInput
                        value={password}
                        onChange={handleChange}
                        label="Password"
                        placeholder="******"
                        name="password"
                        type="password"
                    ></FormInput>
                    <Submit value="Sign up"></Submit>
                    <div className="flex justify-between">
                        <CustomLink to="/auth/forgot-password">Forget Password</CustomLink>
                        <CustomLink to="/auth/signin">Sign in</CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer>
    );
};

export default Signup;