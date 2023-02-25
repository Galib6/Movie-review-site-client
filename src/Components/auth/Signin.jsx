import React from 'react';
import { useTheme } from '../../hook';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

const Signin = () => {

    const theme = useTheme()
    console.log(theme)

    return (
        <FormContainer >
            <Container>
                <form action=" " className={commonModalClasses + ' w-72'}>
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
        </FormContainer >
    );
};

export default Signin;