import { useRecoilState, useRecoilValue } from 'recoil';
import { recoilMapDrawMode, recoilDrawReference } from '../../state/map.state';
import { CenterFocusWeak, Layers, PanTool, Polyline } from '@mui/icons-material';
import { Stack, ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { lightTheme } from '../../common/guardianTheme';
import Geocoder from './geocoder';

import './mapActionsPanel.scss';

const MapActionsPanel = () => {
    const [drawMode, setDrawMode] = useRecoilState(recoilMapDrawMode);
    const mapDraw = useRecoilValue(recoilDrawReference);

    return (
        <ThemeProvider theme={lightTheme}>
            <div className="map-actions-panel">
                <Geocoder />
                <Stack className="map-actions-panel__controls" spacing={1}>
                    <ToggleButtonGroup 
                        className='map-actions-panel__map-controls'
                        orientation='vertical'
                        size='small'
                    >
                        <ToggleButton value='center'>
                            <CenterFocusWeak fontSize='small' />
                        </ToggleButton>
                        <ToggleButton value='layer'>
                            <Layers fontSize='small' />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup 
                        className='map-actions-panel__draw-controls'
                        exclusive
                        onChange={(e, mode) => {
                            if (mode) {
                                mapDraw.current.changeMode(mode);
                                setDrawMode(mode);
                            }
                        }}
                        orientation='vertical'
                        size='small'
                        value={drawMode}
                    >
                        <ToggleButton value='simple_select'>
                            <PanTool fontSize='small' />
                        </ToggleButton>
                        <ToggleButton value='draw_polygon'>
                            <Polyline fontSize='small' />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </div>
        </ThemeProvider>
    )
}

export default MapActionsPanel;
