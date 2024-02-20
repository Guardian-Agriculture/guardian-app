import { CenterFocusWeak, Layers } from '@mui/icons-material';
import { Button, ThemeProvider } from '@mui/material';
import Geocoder from './geocoder';
import { lightTheme } from '../../common/guardianTheme';

import './mapActionsPanel.scss';

const MapActionsPanel = () => {

    return (
        <ThemeProvider theme={lightTheme} >
        <div className="map-actions-panel">
            <Geocoder />
            {/* <Button 
                variant='contained' 
                value='center'
            >
                <CenterFocusWeak />
            </Button>
            <Button 
                variant='contained' 
                value='layer'
            >
                <Layers />
            </Button> */}
        </div>
        </ThemeProvider>
    )
}

export default MapActionsPanel;
