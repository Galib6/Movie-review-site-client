import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import FormContainer from '../form/FormContainer';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import { ImSpinner9 } from 'react-icons/im';
import { ImCross } from 'react-icons/im';
import { resetPassword, verifyPasswordResetToken } from '../../api/auth';
import { useNotification } from '../../hook';


const ConfirmPassword = () => {
    const [password, setPassword] = useState({
        one: '',
        two: ''
    })
    const { updateNotification } = useNotification()
    const [isVerifying, setVerifying] = useState(true)
    const [isValid, setIsValid] = useState(true)
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const id = searchParams.get("id")
    const navigate = useNavigate()


    useEffect(() => {
        isValidToken()
    }, [])


    const isValidToken = async () => {
        const { error, valid } = await verifyPasswordResetToken(token, id)
        setVerifying(false)
        if (error) {
            setIsValid(false)
            navigate("/auth/reset-password", { replace: true })
            updateNotification("error", error)
        }

        if (!valid) {
            setIsValid(false)
            setVerifying(false)
            return navigate("/auth/reset-password", { replace: true })
        }
        setIsValid(true)
    }

    const handleChange = ({ target }) => {
        const { value, name } = target
        setPassword({ ...password, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.one.trim().length < 8) return updateNotification("error", "Password must be 8 Characters long!")

        if (!password.one.trim()) return updateNotification("error", "Password is missing!")

        if (password.one !== password.two) return updateNotification("error", "Password don't matched!")
        const { error, messege } = await resetPassword({ newPassword: password.one, userId: id, token })
        if (error) return updateNotification("error", error)

        updateNotification("success", messege)

        navigate("/auth/signin", { replace: true })
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
                <p className='flex justify-center '>< ImCross className='h-10 w-10 text-red-600' /></p>
                <h1 className='text-4xl font-semibold dark:text-white text-primary mt-4'>Sorry the token is invalid!</h1>
                <p className='text-primary dark:text-white text-center pt-1'>Please request again for the new password.</p>
            </Container>
        </FormContainer>
    )

    return (
        <FormContainer>
            <Container>
                <form onSubmit={handleSubmit} className={commonModalClasses + '  w-96 '}>
                    <Title>Enter New Password</Title>
                    <FormInput
                        value={password.one}
                        onChange={handleChange}
                        label="New Password"
                        placeholder="********"
                        type="password"
                        name="one"
                    ></FormInput>
                    <FormInput
                        value={password.two}
                        onChange={handleChange}
                        label="Confirm Password"
                        placeholder="*******"
                        type="password"
                        name="two"
                    ></FormInput>
                    <Submit value="Confirm Password"></Submit>
                </form>
            </Container>
        </FormContainer >
    );
};

export default ConfirmPassword;