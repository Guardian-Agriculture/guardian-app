import { useState } from 'react';
import { TextField, Tooltip } from '@mui/material';

import './textEdit.scss';

const TextEdit = (props) => {
    const {
        className,
        size,
        tooltip,
        value
    } = props;
    const [ field, setField ] = useState({
        edit: false,
        value: value
    });

    return (
        <>
            {field.edit
                ? <TextField 
                    autoFocus
                    className={`text-edit text-edit--editing ${size ? `text-edit--${size}` : ''} ${className}`}
                    defaultValue={field.value}
                    onBlur={(e) => setField({
                        edit: false,
                        value: e.target.value
                    })}
                    onKeyDown={(e) => {
                        switch(e.key) {
                            case 'Enter':
                                setField({
                                    edit: false,
                                    value: e.target.value
                                });
                                break;
                            default:
                        }
                    }}
                    size={size}
                    variant='outlined'
                />
                : <Tooltip 
                    className={`text-edit ${size ? `text-edit--${size}` : ''} ${className}`}
                    title={tooltip}
                    onClick={() => setField({...field, edit: true})}
                >
                    <div>{field.value}</div>
                </Tooltip>
            }
        </>
    )   
}

export default TextEdit;
