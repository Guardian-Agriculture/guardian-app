import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Collapse } from '@mui/material';
import { recoilZones } from '../../state/actions.state';
import { TransitionGroup } from 'react-transition-group';
import { IconButton } from '@mui/material';
import ListItemAdd from '../listItemAdd/listItemAdd';
import Markers from './markers';
import Boundaries from './boundaries';
import TextEdit from '../textEdit/textEdit';

import { ArrowDropDown, ArrowDropUp, Delete, PlayArrow, Visibility, VisibilityOff } from '@mui/icons-material';

import './zones.scss';

const Zones = () => {

    const [ zones, setZones ] = useRecoilState(recoilZones);
    const creationDate = Date.now(); // Mapbox draw hates non integers in IDs ¯\_(ツ)_/¯

    const addZone = () => {
        setZones([...zones, {
            boundaries: [],
            id: creationDate,
            markers: [],
            value: 'Untitled Zone'
        }]);
    }

    return (
        <div className='zones'>
            <ListItemAdd label='Zone' onClick={addZone} />
            <div className='zones__content'>
                <TransitionGroup>
                    {zones && zones.map((zone, i) => {
                        return (
                            <Collapse key={zone.id}>
                                <Zone {...zone} />
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </div>
        </div>
    )
}

const Zone = (props) => {
    const [ zones, setZones ] = useRecoilState(recoilZones);
    const [ dropDown, setDropDown ] = useState(true);
    const [ zoneVisibility, setZoneVisibility ] = useState(true);

    const deleteZone = () => {
        const filteredZones = zones.filter(z => z.id !== props.id);
        setZones(filteredZones);
    }

    const updateZone = (e) => {
        const updatedZones = zones.map(z => {
            const zClone = {...z};
            if (z.id === props.id) {
                zClone.value = e.target.value;
            }
            return zClone;
        });
        setZones(updatedZones);
    }

    return (
        <div className='zone'>
            <div className='zone__header'>
                <IconButton
                    onClick={() => setZoneVisibility(!zoneVisibility)}
                >
                    {zoneVisibility ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                </IconButton>
                <div className='zone__header-info'>
                    <TextEdit 
                        className='zone__text-edit'
                        tooltip='Edit zone name'
                        value={props.value}
                        onBlur={updateZone}
                    />
                    {props.status && <span className='zone__header-status'>Flight Status</span>}
                </div>
                <IconButton
                    className='zone__accordion'
                    onClick={() => setDropDown(!dropDown)}
                >
                    {dropDown ? <ArrowDropUp /> : <ArrowDropDown />}
                </IconButton>
            </div>
            <Collapse in={dropDown} timeout="auto">
                <Markers {...props} />
                <Boundaries  {...props} />
            </Collapse>
            <div className='zone__control'>
                <IconButton
                    className='job-action__start'
                    onClick={() => {}}
                >
                    <PlayArrow fontSize='large' />
                </IconButton>
            </div>
            <div className='zone__actions'>
                <Button
                    className='zone__header-delete'
                    onClick={deleteZone}
                    endIcon={
                        <Delete fontSize='small' />
                    }
                    variant='contained'
                >
                    Delete Zone
                </Button>
            </div>
        </div>
    )
}

export default Zones;
