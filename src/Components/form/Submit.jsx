import React from 'react';

const Submit = ({ value }) => {
    return (
        <input type="submit" className='w-full rounded bg-white hover:bg-opacity-90 font-semibold text-lg cursor-pointer p-1' value={value} />
    );
};

export default Submit;