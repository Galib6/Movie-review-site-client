import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import { ImSpinner9 } from 'react-icons/im';
import { verifyPasswordResetToken } from '../../api/auth';
import { useNotification } from '../../hook';


const ConfirmPassword = () => {
    const { updateNotification } = useNotification()
    const [isVerifying, setVerifying] = useState(true)
    const [isValid, setIsValid] = useState(true)
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const id = searchParams.get("id")
    const navigate = useNavigate()


    useEffect(() => {
        isValidToken()
    })


    const isValidToken = async () => {
        const { error, valid } = await verifyPasswordResetToken(token, id)
        setVerifying(false)
        if (error) return updateNotification("error", error)

        if (!valid) {
            setIsValid(false)
            setVerifying(false)
            return navigate("/auth/reset-password", { replace: true })
        }
        setIsValid(true)
    }



    if (isVerifying) return (
        <FormContainer>
            <Container>
                <p className='flex justify-center '>< ImSpinner9 className='animate-spin h-10 w-10 dark:text-white' /></p>
                <h1 className='text-4xl font-semibold dark:text-white text-primary mt-4'>Please wait we are verifying your token</h1>
            </Container>
        </FormContainer>
    )

    if (!isValid) return (
        <FormContainer>
            <Container>
                <p className='flex justify-center '>< ImSpinner9 className='animate-spin h-10 w-10 dark:text-white' /></p>
                <h1 className='text-4xl font-semibold dark:text-white text-primary mt-4'>Sorry the token is invalid</h1>
            </Container>
        </FormContainer>
    )

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