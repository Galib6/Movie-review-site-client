import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resendEmailverificationToken, verifyUserEmail } from '../../api/auth';
import { useAuth, useNotification } from '../../hook';
import { commonModalClasses } from '../../utils/Theme';
import Container from '../Container';
import FormContainer from '../form/FormContainer';
import Submit from '../form/Submit';
import Title from '../form/Title';



const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
    let valid = false

    for (let val of otp) {
        valid = !isNaN(parseInt(val))
        if (!valid) break;
    }

    return valid;
}



const Emailverification = () => {
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
    const [activeOtpIndex, setActiveOtpIndex] = useState(0);
    const inputRef = useRef();
    const { updateNotification } = useNotification()
    const { isAuth, authInfo } = useAuth()
    const { isLoggedIn, profile } = authInfo;
    const isVerified = profile?.isVerified

    const { state } = useLocation();
    const user = state?.user
    const navigate = useNavigate()

    const focusNextInputField = (index) => {
        setActiveOtpIndex(index + 1);
    };

    const focusPrevInputField = (index) => {
        let nextIndex;
        const diff = index - 1;
        nextIndex = diff !== 0 ? diff : 0;

        setActiveOtpIndex(nextIndex);
    };

    const handleOtpChange = ({ target }, index) => {
        const { value } = target;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1, value.length);

        if (!value) focusPrevInputField(index);
        else focusNextInputField(index);

        setOtp([...newOtp]);
    };

    const handleOTPResend = async () => {
        const { error, messege } = await resendEmailverificationToken(user.id)
        if (error) return updateNotification("error", error)

        updateNotification("success", messege)
    }

    const handleKeyDown = ({ key }, index) => {
        if (key === "Backspace") {
            focusPrevInputField(index);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidOTP(otp)) return updateNotification("error", 'Invalid OTP')

        //submit the OTP
        const { error, messege, user: userResponse } = await verifyUserEmail({ OTP: otp.join(""), userId: user.id })

        if (error) return updateNotification("error", error)

        updateNotification("success", messege);

        localStorage.setItem("auth-token", userResponse.token);

        isAuth();

    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOtpIndex]);



    useEffect(() => {
        if (!user) navigate("/notfound")
        if (isLoggedIn && isVerified) navigate("/")
    }, [user, isLoggedIn, isVerified])

    return (
        <FormContainer >
            <Container>
                <form onSubmit={handleSubmit} className={commonModalClasses}>
                    <div>
                        <Title>Please Enter the OTP to verify your account</Title>
                        <p className='text-center dark:text-dark-subtle text-light-subtle'>OTP has been sent your email</p>

                    </div>
                    <div className="flex justify-center items-center space-x-4">
                        {otp.map((_, index) => {
                            return (
                                <input
                                    ref={activeOtpIndex === index ? inputRef : null}
                                    key={index}
                                    type="number"
                                    value={otp[index] || ""}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    // onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle  dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                                />
                            );
                        })}
                    </div>
                    <div>
                        <Submit value="Verify Account"></Submit>
                        <button
                            onClick={handleOTPResend}
                            type='button'
                            className='dark:text-white text-blue-500 font-semibold hover:underline mt-2'
                        >I don't have the OTP</button>
                    </div>
                </form>
            </Container>
        </FormContainer>
    );
};

export default Emailverification;