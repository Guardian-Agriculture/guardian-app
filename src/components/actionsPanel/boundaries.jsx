import { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { 
    recoilZones, 
    recoilActiveItem,
    recoilUpdateBoundary,
} from '../../state/actions.state';
import {
    recoilMapDrawMode,
    recoilDrawReference,
} from '../../state/map.state';
import ListItemAdd from "../listItemAdd/listItemAdd";
import { TransitionGroup } from "react-transition-group";
import { Button, Collapse, FormControl, IconButton, MenuItem, TextField } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import TextEdit from "../textEdit/textEdit";
import Recipe from "./recipe";

const nameMap = {
    'geoFence': {
        name: 'Geofence',
        color: '#ffdc00',
    },
    'sprayFence': {
        name: 'Spray Fence',
        color: '#057fb9',
    },
    'road': {
        name: 'Road',
        color: '#f70000',
    },
    'flightExclusion': {
        category: 'Flight Exclusion',
        color: '#f70000',
    },
    'sprayExclusion': {
        name: 'Spray Exclusion',
        color: '#f70000',
    }
};

const Boundaries = (props) => {
    const {
        boundaries
    } = props;
    const [ zones, setZones ] = useRecoilState(recoilZones);
    const setDrawMode = useSetRecoilState(recoilMapDrawMode);
    const setActiveItem = useSetRecoilState(recoilActiveItem);
    const mapDraw = useRecoilValue(recoilDrawReference);
    const creationDate = Date.now();
	const updateBoundary = useSetRecoilState(recoilUpdateBoundary);

    const addBoundary = () => {
        const updatedZone = {...props, boundaries: [...boundaries, {id: creationDate}]};
        updateZones(updatedZone);
        focusBoundary({id: creationDate});
    }

    const deleteBoundary = (boundary) => {
        const mapId = boundary?.features?.id;
        if (mapId) {
            mapDraw.current.delete(mapId);
        }
        const updatedZone = {...props, boundaries: boundaries.filter(b => b.id !== boundary.id)};
        updateZones(updatedZone);
    }

    const focusBoundary = (boundary) => {
        
        if (boundary.hasOwnProperty('features')) {
            mapDraw.current.changeMode('direct_select', {featureId: boundary.features.id});
        } else {
            mapDraw.current.changeMode('draw_polygon');
            setDrawMode('draw_polygon');
        }

        setActiveItem(boundary.id);
    }

    const onChangeBoundary = (e, boundary) => {
        const updatedBoundary = {...boundary};
        const boundaryType = e.target.value;
        const boundaryColor = nameMap[boundaryType].color;

        updatedBoundary.type = boundaryType;
        updatedBoundary.features = {...updatedBoundary.features, properties: {layerColor: boundaryColor}};

        mapDraw.current.setFeatureProperty(boundary.id, 'layerColor', boundaryColor);

        updateBoundary(updatedBoundary);
    }

    const updateZones = (updatedZone) => {
        const updatedZones = zones.map((zone) => {
            if (zone.id === updatedZone.id) return updatedZone;
            return zone;
        });
        setZones(updatedZones);
    }

    return (
        <div className="boundaries">
            <ListItemAdd label='Boundary' onClick={addBoundary} />
            <div className="boundaries__content">
                <TransitionGroup>
                    {boundaries && boundaries.map((boundary, i) => {
                        return (
                            <Collapse key={i}>
                                <Boundary 
                                    onFocus={focusBoundary}
                                    onChange={onChangeBoundary}
                                    onDelete={deleteBoundary}
                                    onKeyDown={(e) => {
                                        switch(e.key) {
                                            case 'Delete':
                                                deleteBoundary(boundary);
                                                break;
                                            default:
                                        }
                                    }}
                                    tabIndex='0'
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
        onFocus,
        onChange,
        onDelete,
        onKeyDown,
    } = props;
    const [ dropDown, setDropDown ] = useState(false);
    const [ boundaryVisibility, setBoundaryVisibility ] = useState(true);
    const activeItem = useRecoilValue(recoilActiveItem);
    
    return (
        <>
            <div 
                className={`boundary ${props.id === activeItem ? `boundary--active` : ''}`}
                onFocus={() => onFocus(props)}
                onKeyDown={onKeyDown}
                tabIndex='0'
            >
                <IconButton
                    onClick={() => setBoundaryVisibility(!boundaryVisibility)}
                >
                    {boundaryVisibility ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                </IconButton>
                <TextEdit 
                    active={props.id === activeItem}
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
                            defaultValue='sprayFence'
                            label='Boundary type'
                            variant='filled'
                            onChange={(e) => onChange(e, props)}
                        >
                            <MenuItem value='sprayFence'>Spray Fence</MenuItem>
                            <MenuItem value='sprayExclusion'>Spray Exclusion</MenuItem>
                            <MenuItem value='flightExclusion'>Flight Exclusion</MenuItem>
                        </TextField>
                    </FormControl>
                    <Recipe />
                    <div className="boundary__action">
                        <Button
                            className='boundary__delete'
                            endIcon={
                                <Delete fontSize='small' />
                            }
                            onClick={() => onDelete(props)}
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
