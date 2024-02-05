import { PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const JobActions = () => {
    return (
        <div>
            <IconButton
                className='job-action__start'
                onClick={() => {}}
            >
                <PlayArrow fontSize='large' />
            </IconButton>
            <IconButton
                className='job-action__start'
                onClick={() => {}}
            >RTL</IconButton>
            <IconButton
                className='job-action__start'
                onClick={() => {}}
            >LIP</IconButton>
            <IconButton
                className='job-action__start'
                onClick={() => {}}
            >EL</IconButton>
            <IconButton
                className='job-action__start'
                onClick={() => {}}
            >DE</IconButton>
        </div>
    )
}

export default JobActions;
