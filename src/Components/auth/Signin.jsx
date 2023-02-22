import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

const Signin = () => {
    return (
        <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
            <Container>
                <form action=" " className='bg-secondary rounded p-6 w-72 space-y-6'>
                    <Title>Sign in</Title>
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
                    <Submit value="Sign in"></Submit>
                    <div className="flex justify-between">
                        <CustomLink to="/auth/forgot-password" children="Forget Password"></CustomLink>
                        <CustomLink to="/auth/signup" children="Sign up"></CustomLink>
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default Signin;