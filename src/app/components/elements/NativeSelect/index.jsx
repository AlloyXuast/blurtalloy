import React from 'react';
import PropTypes from 'prop-types';

const NativeSelect = ({ options, className, currentlySelected, onChange }) => {
    const handleChange = (event) => {
        onChange(event.target);
    };

    const opts = options.map((val, key) => {
        return (
            <option 
                key={`${key}-NativeSelect-${val.name}-${val.label}`}
                value={val.value}
                disabled={val.disabled ? val.disabled : false}
                style={val.title ? { backgroundColor: '#f4f4f4', fontWeight: 'bolder' } : {}}
            >
                {val.label}
            </option>
        );
    });

    return (
        <select
            onChange={handleChange}
            className={`nativeSelect ${className}`}
            value={currentlySelected}
        >
            {opts}
        </select>
    );
};

NativeSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.string,
            link: PropTypes.string,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    currentlySelected: PropTypes.string.isRequired,
};
NativeSelect.defaultProps = {
    className: '',
};

export default NativeSelect;
