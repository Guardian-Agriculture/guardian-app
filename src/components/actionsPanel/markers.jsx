import { useRecoilState } from "recoil";
import { recoilZones } from '../../state/actions.state';
import ListItemAdd from '../listItemAdd/listItemAdd';
import { TransitionGroup } from "react-transition-group";
import { Button, Collapse, FormControl, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Delete } from "@mui/icons-material";
import TextEdit from "../textEdit/textEdit";
import { useState } from "react";

const Markers = (props) => {
    const {
        markers
    } = props;
    
    const [ zones, setZones ] = useRecoilState(recoilZones);
    const creationDate = Date.now();

    const addMarker = () => {
        const updatedZone = {...props, markers: [...markers, {id: creationDate}]};
        updateZones(updatedZone);
    }

    const updateZones = (updatedZone) => {
        const updatedZones = zones.map((zone) => {
            if (zone.id === updatedZone.id) return updatedZone;
            return zone;
        })
        setZones(updatedZones);
    }

    const deleteMarker = (id) => {
        const updatedZone = {...props, markers: markers.filter(m => m.id !== id)};
        updateZones(updatedZone);
    }

    const focusMarker = (id) => {
        const updatedMarkers = markers.map((marker) => {
            const markerClone = {...marker};
            markerClone.active = false;
            if (markerClone.id === id) {
                markerClone.active = true;
            }
            return markerClone;
        });
        const updatedZone = {...props, markers: updatedMarkers}
        updateZones(updatedZone);
    }

    return (
        <div className="markers">
            <ListItemAdd label='Marker' onClick={addMarker} />
            <div className="markers__content">
                <TransitionGroup>
                    {markers && markers.map((marker) => {
                        return (
                            <Collapse key={marker.id}>
                                <Marker 
                                    onDelete={deleteMarker}
                                    onFocus={focusMarker}
                                    {...marker} 
                                />
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </div>
        </div>
    )
}

const Marker = (props) => {
    const {
        onDelete,
        onFocus
    } = props;
    const [ dropDown, setDropDown ] = useState(false);

    return (
        <>
            <div 
                className={`marker ${props.active ? `marker--active` : ''}`}
                onFocus={() => onFocus(props.id)}
                tabIndex='0'
            >
                <TextEdit 
                    active={props.active}
                    className='marker__text-edit'
                    tooltip='Edit marker name'
                    value='Untitled marker'
                    size='small'
                />
                <IconButton
                    className='marker__accordion'
                    onClick={() => setDropDown(!dropDown)}
                >
                    {dropDown ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
            </div>
            <Collapse in={dropDown} timeout="auto">
                <div className="marker__content">
                    <p>Drag and drop the marker</p>
                    <Stack spacing={1}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                label='Marker type'
                                labelId={`label-${props.id}`}
                                variant="filled"
                            >
                                <MenuItem value='operator'>Operator</MenuItem>
                                <MenuItem value='launch'>Launch</MenuItem>
                                <MenuItem value='guided path'>Guided Path</MenuItem>
                            </TextField>
                        </FormControl>
                        <TextField label='Latitude' variant='filled' />
                        <TextField label='Longitude' variant='filled' />
                    </Stack>
                    <div className="marker__action">
                        <Button
                            className='boundary__delete'
                            endIcon={
                                <Delete fontSize='small' />
                            }
                            onClick={() => onDelete(props.id)}
                            variant='contained'
                        >
                            Delete Marker 
                        </Button>
                    </div>
                </div>
            </Collapse>
        </>
    )
}

export default Markers;
