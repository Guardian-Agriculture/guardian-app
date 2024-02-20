import { Dangerous, Verified } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useRecoilValue } from "recoil";
import { recoilZones } from "../../state/actions.state";

const JobValidation = () => {
    const zones = useRecoilValue(recoilZones);

    const boundaryCheck = () => {
        let count = 0;
        zones.forEach((zone) => {
            count += zone.boundaries.length;
        });
        return count > 0;
    }

    return (
        <div className="job-validation">
            <List dense>
                <ListItem>
                    <ListItemIcon>{zones && zones.length > 0 ? <Verified fontSize="small" color='success' /> : <Dangerous fontSize="small" />}</ListItemIcon>
                    <ListItemText>1 zone created</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>{boundaryCheck() ? <Verified fontSize="small" color='success' /> : <Dangerous fontSize="small" />}</ListItemIcon>
                    <ListItemText>1 spray boundary created</ListItemText>
                </ListItem>
            </List>
        </div>
    )
}

export default JobValidation;
