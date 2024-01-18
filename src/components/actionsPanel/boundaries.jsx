import { useRecoilState } from "recoil";
import { recoilZones } from '../../state/actions.state';
import ListItemAdd from "../listItemAdd/listItemAdd";
import { TransitionGroup } from "react-transition-group";
import { Collapse, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
                            <Collapse key={i}>
                                <div className='boundary' key={i}>
                                    I am a boundary
                                    <IconButton
                                        className='boundary__delete'
                                        onClick={() => deleteBoundary(boundary.id)}
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

export default Boundaries;
