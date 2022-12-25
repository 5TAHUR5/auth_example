import React from 'react';
import cl from "./LTLSeparator.module.css";

const LtlSeparator = ({text, ...props}) => {
    return (
        <div {...props} className={cl.separator}>
            <div className={cl.line_separator}></div>
            <div className={cl.text_separator}>{text}</div>
            <div className={cl.line_separator}></div>
        </div>
    );
};

export default LtlSeparator;