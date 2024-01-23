import { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';

import './textEdit.scss';

const TextEdit = (props) => {
    const {
        active,
        className,
        size,
        tooltip,
        value,
        onBlur
    } = props;

    const [ field, setField ] = useState({
        edit: false,
        value: value
    });

    const updateField = (e) => {
        setField({
            edit: false,
            value: e.target.value
        });

        if (typeof onBlur === 'function') {
            onBlur(e);
        }
    }

    return (
        <>
            {field.edit
                ? <TextField 
                    autoFocus
                    className={`text-edit text-edit--editing ${size ? `text-edit--${size}` : ''} ${className}`}
                    defaultValue={field.value}
                    onBlur={(e) => updateField(e)}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                    onKeyDown={(e) => {
                        switch(e.key) {
                            case 'Enter':
                                updateField(e);
                                break;
                            default:
                        }
                    }}
                    size={size}
                    variant='outlined'
                />
                : <Tooltip 
                    className={`text-edit ${size ? `text-edit--${size}` : ''} ${className}`}
                    title={active ? tooltip : ''}
                    onClick={() => {
                        console.log('woah', active);
                        if (active) {
                            setField({...field, edit: true})
                        }
                    }}
                >
                    <div>{field.value}</div>
                </Tooltip>
            }
        </>
    )   
}

TextEdit.defaultProps = {
    active: true
}

export default TextEdit;
