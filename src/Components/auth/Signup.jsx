import React from 'react';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

const Signup = () => {
    return (
        <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
            <Container>
                <form action=" " className='bg-secondary rounded p-6 w-72 space-y-6'>
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
                        <a className='text-dark-subtle hover:text-white transition' href="">Forget Password</a>
                        <a className='text-dark-subtle hover:text-white transition' href="">Sign in</a>
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default Signup;