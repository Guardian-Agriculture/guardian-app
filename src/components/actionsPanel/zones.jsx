import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Collapse, IconButton } from '@mui/material';
import { recoilZones, recoilAddZone, recoilDeleteZone, recoilActiveItem, recoilJobMode } from '../../state/actions.state';
import {
    recoilDrawReference,
} from '../../state/map.state';
import { TransitionGroup } from 'react-transition-group';
import ListItemAdd from '../listItemAdd/listItemAdd';
import Markers from './markers';
import Boundaries from './boundaries';
import TextEdit from '../textEdit/textEdit';

import { ArrowDropDown, ArrowDropUp, Delete, Visibility, VisibilityOff } from '@mui/icons-material';

import './zones.scss';


const Zones = () => {

    const zones = useRecoilValue(recoilZones);
    const addZone = useSetRecoilState(recoilAddZone);

    return (
        <div className='zones'>
            <div className='zones__inner'>
                <ListItemAdd label='Zones' onClick={() => addZone()} />
                <div className='zones__content'>
                    <div className='zones__content-inner'>
                        <TransitionGroup>
                            {zones && [...zones].reverse().map((zone) => {
                                return (
                                    <Collapse key={zone.id}>
                                        <Zone {...zone} />
                                    </Collapse>
                                )
                            })}
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Zone = (props) => {
    const [ zones, setZones ] = useRecoilState(recoilZones);
    const [ dropDown, setDropDown ] = useState(true);
    const [ zoneVisibility, setZoneVisibility ] = useState(true);
    const activeItem = useRecoilValue(recoilActiveItem);
    const mapDraw = useRecoilValue(recoilDrawReference);
    const jobMode = useRecoilValue(recoilJobMode);

    const deleteZone = useSetRecoilState(recoilDeleteZone);

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

    const hasActiveItem = (x) => {
        return JSON.stringify(props).includes(activeItem);
    }

    return (
        <div 
            className={`zone ${hasActiveItem() ? `zone--active` : ''}`}
            tabIndex={0}
        >
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
                        size='small'
                    />
                    {props.status && <span className='zone__header-status'>Flight Status</span>}
                </div>
                <div className='zone__header-actions'>
                    <IconButton
                        className='zone__header-delete'
                        onClick={() => {
                            mapDraw.current.changeMode('simple_select');
                            deleteZone(props.id);
                        }}
                        disabled={jobMode === 'fly'}
                    >
                        <Delete fontSize='small' />
                    </IconButton>
                    <IconButton
                        className='zone__accordion'
                        onClick={() => setDropDown(!dropDown)}
                        disabled={jobMode === 'fly'}
                    >
                        {dropDown ? <ArrowDropUp /> : <ArrowDropDown />}
                    </IconButton>
                </div>
            </div>
            <Collapse in={dropDown} timeout="auto">
                <div className='zone__content'>
                    <Collapse in={jobMode === 'plan'}>
                        <div className='zone__content-inner'>
                            <Markers {...props} />
                            <Boundaries  {...props} />
                        </div>
                    </Collapse>
                </div>
            </Collapse>
        </div>
    )
}

export default Zones;
