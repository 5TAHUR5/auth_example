import React from 'react';
import cl from "../FirstInput/FirstInput.module.css"

const FirstInput = ({...props}) => {
    return (
        <input
            {...props}
            className={cl.auth_input}
        />
    );
};

export default FirstInput;