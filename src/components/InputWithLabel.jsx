import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ id, name, type, value, onChange, children }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                ref={inputRef}
            />
        </>
    );
};

InputWithLabel.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default InputWithLabel;
