import { useState } from "react";
import { useRecoilState } from "recoil";
import { recoilZones } from '../../state/actions.state';
import ListItemAdd from "../listItemAdd/listItemAdd";
import { TransitionGroup } from "react-transition-group";
import { Button, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import TextEdit from "../textEdit/textEdit";
import Recipe from "./recipe";

const Boundaries = (props) => {
    const {
        boundaries
    } = props;
    const [ zones, setZones ] = useRecoilState(recoilZones);
    const creationDate = Date.now();

    const addBoundary = () => {
        const updatedZone = {...props, boundaries: [...boundaries, {id: creationDate}]};
        updateZones(updatedZone);
    }

    const deleteBoundary = (id) => {
        const updatedZone = {...props, boundaries: boundaries.filter(m => m.id !== id)};
        updateZones(updatedZone);
    }

    const focusBoundary = (id) => {
        const updatedBoundaries = boundaries.map((boundary) => {
            const boundaryClone = {...boundary};
            boundaryClone.active = false;
            if (boundaryClone.id === id) {
                boundaryClone.active = true;
            }
            return boundaryClone;
        });
        const updatedZone = {...props, boundaries: updatedBoundaries}
        updateZones(updatedZone);
    }

    const updateZones = (updatedZone) => {
        const updatedZones = zones.map(zone => {
            if (zone.id === updatedZone.id) return updatedZone;
            return zone;
        })
        setZones(updatedZones);
    }

    return (
        <div className="boundaries">
            <ListItemAdd label='Boundary' onClick={addBoundary} />
            <div className="boundaries__content">
                <TransitionGroup>
                    {boundaries && boundaries.map((boundary, i) => {
                        return (
                            <Collapse key={boundary.id}>
                                <Boundary 
                                    onDelete={deleteBoundary}
                                    onFocus={focusBoundary}
                                    {...boundary}
                                />
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </div>
        </div>
    )
}

const Boundary = (props) => {
    const {
        onDelete,
        onFocus
    } = props;
    const [ dropDown, setDropDown ] = useState(true);
    const [ boundaryVisibility, setBoundaryVisibility ] = useState(true);

    return (
        <>
            <div 
                className={`boundary ${props.active ? `boundary--active` : ''}`}
                onFocus={() => onFocus(props.id)}
                tabIndex='0'
            >
                <IconButton
                    onClick={() => setBoundaryVisibility(!boundaryVisibility)}
                >
                    {boundaryVisibility ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                </IconButton>
                <TextEdit 
                    active={props.active}
                    className='boundary__text-edit'
                    tooltip='Edit boundary name'
                    value='Untitled boundary'
                    size='small'
                />
                <IconButton
                    className='boundary__accordion'
                    onClick={() => setDropDown(!dropDown)}
                >
                    {dropDown ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
            </div>
            <Collapse in={dropDown} timeout="auto">
                <div className="boundary__content">
                    <p>X acres selected</p>
                    <FormControl fullWidth>
                        <TextField
                            select
                            defaultValue='spray'
                            label='Boundary type'
                            labelId={`label-${props.id}`}
                            variant="filled"
                        >
                            <MenuItem value='spray'>Spray</MenuItem>
                            <MenuItem value='spray exclusion'>Spray Exclusion</MenuItem>
                            <MenuItem value='flight exclusion'>Flight Exclusion</MenuItem>
                        </TextField>
                    </FormControl>
                    <Recipe />
                    <div className="boundary__action">
                        <Button
                            className='boundary__delete'
                            endIcon={
                                <Delete fontSize='small' />
                            }
                            onClick={() => onDelete(props.id)}
                            variant='contained'
                        >
                            Delete Boundary
                        </Button>
                    </div>
                </div>
            </Collapse>
        </>
    )
}

export default Boundaries;
