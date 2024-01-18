import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { recoilZones } from '../../state/actions.state';
import { IconButton } from '@mui/material';
import { Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import Markers from './markers';
import Boundaries from './boundaries';
import TextEdit from '../textEdit/textEdit';

import './zone.scss';

const Zone = (props) => {
    const [ zones, setZones ] = useRecoilState(recoilZones);
    const [ zoneVisibility, setZoneVisibility ] = useState(true);

    const deleteZone = () => {
        const filteredZones = zones.filter(z => z.id !== props.id);
        setZones(filteredZones);
    }

    return (
        <div className='zone'>
            <div className='zone__header'>
                <IconButton
                    onClick={() => setZoneVisibility(!zoneVisibility)}
                >
                    {zoneVisibility ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                </IconButton>
                <TextEdit 
                    className='zone__text-edit'
                    tooltip='Edit zone name'
                    value='Untitled zone'
                    size='small'
                />
                <IconButton
                    className='zone__header-delete'
                    onClick={deleteZone}
                >
                    <Delete fontSize='small' />
                </IconButton>
            </div>
            <Markers {...props} />
            <Boundaries  {...props} />
        </div>
    )
}

export default Zone;
