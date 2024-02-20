import { useRecoilState, useRecoilValue } from 'recoil';
import { recoilMapDrawMode, recoilDrawReference } from '../../state/map.state';
import { ArrowBackIos, ArrowForwardIos, PanTool, Polyline } from '@mui/icons-material';
import { Button, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { recoilActionsPanelOpen } from '../../state/actions.state';

const ZoneControls = () => {
    const [drawMode, setDrawMode] = useRecoilState(recoilMapDrawMode);
    const [actionsPanelOpen, setActionsPanelOpen] = useRecoilState(recoilActionsPanelOpen);
    const mapDraw = useRecoilValue(recoilDrawReference);
    
    return (
        <div className="zone-controls">
            <div className='zone-controls__toggle'>
                <Tooltip
                    title={actionsPanelOpen ? 'Collapse controls' : 'Expand controls'}
                    placement='right'
                >
                    <Button
                        className='zone-controls__toggle-button'
                        onClick={() => setActionsPanelOpen(!actionsPanelOpen)}
                    >
                        {actionsPanelOpen ? <ArrowBackIos /> : <ArrowForwardIos />}
                    </Button>
                </Tooltip>
            </div>
            <Stack className='zone-controls__actions' spacing={1}>
                <ToggleButtonGroup 
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
                    <Tooltip
                        title='Draw polygon' 
                        placement='right'
                    >
                        <ToggleButton value='draw_polygon'>
                            <Polyline fontSize='small' />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip 
                        title='Pan and select' 
                        placement='right'
                    >
                        <ToggleButton value='simple_select'>
                            <PanTool fontSize='small' />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </Stack>
        </div>
    );
}

export default ZoneControls;
