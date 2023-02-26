import React from 'react';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

const ForgotPassword = () => {
    return (
        <FormContainer >
            <Container>
                <form className={commonModalClasses + ' w-96 '}>
                    <Title>Please Enter Your Email</Title>
                    <FormInput
                        label="Email"
                        placeholder="galib@gmail.com"
                        name="email"
                    ></FormInput>
                    <Submit value="Send Verification Link"></Submit>
                    <div className="flex justify-between">
                        <CustomLink to="/auth/signin" >Sign in</CustomLink>
                        <CustomLink to="/auth/signup" >Sign up</CustomLink>
                    </div>
                </form>
            </Container>
        </FormContainer>
    );
};

export default ForgotPassword;