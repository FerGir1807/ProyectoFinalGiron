import React from 'react'
import Form from 'react-bootstrap/Form';

export const SelectElement = (props) => {

    const createSelectOptions = () => {
        const selectOptions = [];

        for (let i = 1; i <= props.optionNumber; i++) {
            selectOptions.push(
                <option key={i} value={i}>{i}</option>
            )
        }
        return (
            selectOptions
        )
    };

    return (
        <Form.Select >
            <option>Seleccione una cantidad</option>
            {createSelectOptions()}
        </Form.Select>
    )
}
