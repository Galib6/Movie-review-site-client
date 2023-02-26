import React, { useState } from 'react';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/Theme';
import FormContainer from '../form/FormContainer';


const validateUserInfo = ({ name, email, password }) => {

}


const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = ({ target }) => {
        const { value, name } = target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        validateUserInfo(userInfo);
    }


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