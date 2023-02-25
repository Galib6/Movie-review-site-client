import React from 'react';
import Container from '../Container';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

const ConfirmPassword = () => {
    return (
        <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
            <Container>
                <form action=" " className='bg-secondary rounded p-6 w-96 space-y-6'>
                    <Title>Enter New Password</Title>
                    <FormInput
                        label="New Password"
                        placeholder="********"
                        name="password"
                        type="password"
                    ></FormInput>
                    <FormInput
                        label="Confirm Password"
                        placeholder="*******"
                        name="confirmPassword"
                        type="password"
                    ></FormInput>
                    <Submit value="Confirm Password"></Submit>
                </form>
            </Container>
        </div>
    );
};

export default ConfirmPassword;