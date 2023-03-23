import React from 'react';
import { ImSpinner3 } from "react-icons/im"

const Submit = ({ value, busy }) => {
    return (
        <button
            type="submit"
            className='w-full rounded bg-secondary dark:bg-white  hover:bg-opacity-90 dark:text-primary text-white font-semibold text-lg cursor-pointer h-10 flex items-center justify-center'

        >
            {busy ? <ImSpinner3 className='animate-spin' /> : value}
        </button>
    );
};

export default Submit;