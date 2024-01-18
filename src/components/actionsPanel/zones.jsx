import { useRecoilState } from 'recoil';
import { Collapse } from '@mui/material';
import { recoilZones } from '../../state/actions.state';

import './zones.scss';
import { TransitionGroup } from 'react-transition-group';
import Zone from './zone';
import ListItemAdd from '../listItemAdd/listItemAdd';

const Zones = () => {

    const [ zones, setZones ] = useRecoilState(recoilZones);
    const creationDate = Date.now(); // Mapbox draw hates non integers in IDs ¯\_(ツ)_/¯

    const addZone = () => {
        setZones([...zones, {
            id: creationDate,
            markers: [],
            boundaries: []
        }]);
    }

    return (
        <div className='zones'>
            <ListItemAdd label='Zone' onClick={addZone} />
            <div className='zones__content'>
                <TransitionGroup>
                    {zones && zones.map((zone, i) => {
                        return (
                            <Collapse key={i}>
                                <Zone {...zone} />
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </div>
        </div>
    )
}

export default Zones;
