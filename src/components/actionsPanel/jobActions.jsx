import { PlayArrow } from "@mui/icons-material";
import { Button, Collapse, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { recoilJobMode } from "../../state/actions.state";
import JobValidation from "./jobValidation";

const JobActions = () => {

    const jobMode = useRecoilValue(recoilJobMode);
    
    return (
        <div className="job-actions">
            <JobValidation />
            <div className="job-actions__mode-toggle">
                <ToggleSwitch />
            </div>
            <Collapse in={jobMode === 'fly'} timeout="auto">
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
            </Collapse>
        </div>
    )
}

export default JobActions;

const ToggleSwitch = () => {
    
    const toggleRef = useRef(null)
    const setJobMode = useSetRecoilState(recoilJobMode);
    const [toggleSwitchStyles, setToggleSwitchStyles] = useState({});

    const onClickToggleSwitch = (e) => {
        const target = e.target;
        const buttonValue = target.value;
        const buttonPos = target.offsetLeft;
        const buttonWidth = target.clientWidth;

        setToggleSwitchStyles({left: buttonPos, width: buttonWidth});
        setJobMode(buttonValue);
    }

    useEffect(() => {
        if (!toggleRef.current) return;
        onClickToggleSwitch({target: toggleRef.current.children[0]});
    }, [])

    return (
        <div ref={toggleRef} onClick={onClickToggleSwitch} className="toggle-button">
            <Button value='plan'>Plan</Button>
            <Button value='fly'>Fly</Button>
            <span className="toggle-button__selection" style={toggleSwitchStyles} />
        </div>
    )
}
