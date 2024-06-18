import React, { useRef } from 'react';

const InputRange = ({ ...props }) => {
    const inPutRef = useRef()

    const minValue = props.min || 0;
    const maxValue = props.max || 100;
    const value = (props.value || inPutRef.current?.value || props.defaultValue || minValue);
    const fillPercentage = ((value - minValue) * 100) / (maxValue - minValue);

    return (
        <input
            ref={inPutRef}
            type="range"
            {...props}
            style={{
                '--fill': `${fillPercentage}%`
            }} // Set the custom property directly in the inline style
        />
    )
}

export default InputRange