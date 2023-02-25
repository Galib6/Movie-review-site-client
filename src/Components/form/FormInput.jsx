import React from 'react';

const FormInput = ({ name, placeholder, label, ...rest }) => {
    return (
        <div className='flex flex-col-reverse'>

            <input type="text"
                name={name}
                id={name}
                className='bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus:border-primary dark:text-white p-1 peer transition'
                placeholder={placeholder}
                {...rest}
            />
            <label
                htmlFor={name}
                className='text-white font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white  peer-focus:text-primary transition  self-start'>{label}</label>
        </div>
    );
};

export default FormInput;