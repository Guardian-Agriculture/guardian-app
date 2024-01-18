import { useRecoilState } from "recoil";
import { recoilZones } from '../../state/actions.state';
import ListItemAdd from '../listItemAdd/listItemAdd';
import { TransitionGroup } from "react-transition-group";
import { Collapse, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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

    const deleteMarker = (id) => {
        const updatedZone = {...props, markers: markers.filter(m => m.id !== id)};
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
        <div className="markers">
            <ListItemAdd label='Marker' onClick={addMarker} />
            <div className="markers__content">
                <TransitionGroup>
                    {markers && markers.map((marker, i) => {
                        return (
                            <Collapse key={i}>
                                <div className="marker" key={i}>
                                    I am a marker
                                    <IconButton
                                        className='marker__delete'
                                        onClick={() => deleteMarker(marker.id)}
                                    >
                                        <Delete fontSize='small' />
                                    </IconButton>
                                </div>
                            </Collapse>
                        )
                    })}
                </TransitionGroup>
            </div>
        </div>
    )
}

export default Markers;
