import React from 'react';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

const ConfirmPassword = () => {
    return (
        <FormContainer>
            <Container>
                <form className={commonModalClasses + '  w-96 '}>
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
        </FormContainer >
    );
};

export default ConfirmPassword;