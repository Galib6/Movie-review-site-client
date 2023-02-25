import React from 'react';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import CustomLink from '../CustomLink';
import { commonModalClasses } from '../../utils/Theme';
import FormContainer from '../form/FormContainer';

const Signup = () => {
    return (
        <FormContainer>
            <Container>
                <form action=" " className={commonModalClasses + ' w-72 '}>
                    <Title>Sign up</Title>
                    <FormInput
                        label="Name"
                        placeholder="Rahim Islam"
                        name="name"
                    ></FormInput>
                    <FormInput
                        label="Email"
                        placeholder="galib@gmail.com"
                        name="email"
                    ></FormInput>
                    <FormInput
                        label="Password"
                        placeholder="******"
                        name="password"
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