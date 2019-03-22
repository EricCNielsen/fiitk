import React from 'react'
import './Dropdown.css'

export default function Dropdown(props) {
    const{
        options,
        onChange,
        selectedValue,
    } = props
    let selectOptions = null

    if (Array.isArray(options)) {
        selectOptions = options.map(option => (
            <option key={ option.value } value={ option.value }>{option.displayText}</option>
        ))
    }

    return (
        <select className='Dropdown' onChange={ onChange } value={ selectedValue } disabled= { !Array.isArray(options) } >
            <option value="">-- Select --</option>
            {selectOptions}
        </select>
    )
}