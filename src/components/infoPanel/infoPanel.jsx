import { AppBar, Badge, Collapse, IconButton, List, ListItem, Stack } from '@mui/material';
import './infoPanel.scss';
import { Bolt, LeakAdd, Lightbulb, SatelliteAlt, Settings, Terrain, Warning, WaterDrop } from '@mui/icons-material';
import InfoBlock from '../infoBlock/infoBlock';
import { useState } from 'react';

const InfoPanel = () => {
    const [aircraftConnected, setAircraftConnected] = useState(false);

    return (
        <div className='info-panel'>
            <AppBar className='info-panel__header' elevation={0}>
                {aircraftConnected &&
                    <>
                        <IconButton
                            className='info-panel__icon'
                            onClick={() => {}}
                        >
                            <Bolt />
                        </IconButton>
                        <IconButton
                            className='info-panel__icon'
                            onClick={() => {}}
                        >
                            <Lightbulb />
                        </IconButton>
                        <IconButton
                            className='info-panel__icon'
                            onClick={() => {}}
                        >
                            <Badge badgeContent='0' color='primary'>
                                <SatelliteAlt />
                            </Badge>
                        </IconButton>
                        <IconButton
                            className='info-panel__icon'
                            onClick={() => {}}
                        >
                            <Badge badgeContent='0' color='primary'>
                                <LeakAdd />
                            </Badge>
                        </IconButton>
                        <IconButton
                            className='info-panel__icon'
                            onClick={() => {}}
                        >
                            <WaterDrop />
                        </IconButton>
                        
                    </>
                }
                {!aircraftConnected && 
                    <>
                        <div className='info-panel__no-aircraft'><Warning color='warning' className='info-panel__no-aircraft-icon' /> No aircraft connected</div>    
                    </>
                }
                <IconButton
                    className='info-panel__icon info-panel__settings'
                    onClick={() => {}}
                >
                    <Settings />
                </IconButton>
            </AppBar>
            <div className='info-panel__inner'>
                <Collapse in={aircraftConnected} timeout="auto">
                    <div className='info-panel__aircraft'>
                        <InfoBlock 
                            title="Altitude"
                            unit='m'
                            value="100"
                        />
                        <InfoBlock 
                            title="Speed"
                            unit='m/s'
                            value="10"
                        />
                        <InfoBlock 
                            title="Spray"
                            unit='gpa'
                            value="20"
                        />
                        <InfoBlock 
                            title="Battery"
                            unit='v'
                            value="32"
                        />
                        <InfoBlock 
                            title="Motor 1"
                            value='19'
                            unit='c'
                        />
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default InfoPanel;
