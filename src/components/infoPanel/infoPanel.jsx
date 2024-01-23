import { AppBar, Badge, IconButton, List, ListItem, Stack } from '@mui/material';
import './infoPanel.scss';
import { Bolt, LeakAdd, Lightbulb, SatelliteAlt, Settings, Terrain, WaterDrop } from '@mui/icons-material';
import InfoBlock from '../infoBlock/infoBlock';

const InfoPanel = () => {
    return (
        <div className='info-panel'>
            <AppBar className='info-panel__header' elevation={0}>
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
                <IconButton
                    className='info-panel__icon info-panel__settings'
                    onClick={() => {}}
                >
                    <Settings />
                </IconButton>
            </AppBar>
            <div className='info-panel__inner'>
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
            </div>
        </div>
    )
}

export default InfoPanel;
