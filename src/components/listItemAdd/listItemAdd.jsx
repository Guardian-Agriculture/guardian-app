import { Add } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

import './listItemAdd.scss';

const ListItemAdd = (props) => {

    const {
        label,
        onClick
    } = props;

    return (
        <div className='list-item-add'>
            <div className='list-item-add__label'>{label}</div>
            <Tooltip title={`Add a ${label.toLowerCase()}`}>
                <span>
                    <IconButton
                        disableRipple
                        onClick={onClick}
                    >
                        <Add fontSize='small' />
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    )
}

export default ListItemAdd;
