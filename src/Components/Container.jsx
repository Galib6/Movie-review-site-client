import React from 'react';

const Container = ({ children, className }) => {
    return (
        <div className={" max-w-screen-xl mx-auto p-2 " + className} >
            {children}
        </div>
    );
};

export default Container;