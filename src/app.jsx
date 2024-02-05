import { ThemeProvider } from '@mui/material';
import Map from './components/map/map'
import ActionsPanel from './components/actionsPanel/actionsPanel'
import { guardianTheme } from './common/guardianTheme';

import './app.scss';
import InfoPanel from './components/infoPanel/infoPanel';
import MapActionsPanel from './components/mapActionsPanel/mapActionsPanel';

const App = () => {
	return (
		<ThemeProvider theme={guardianTheme}>
			<div className='app'>
				<div className='app__hud'>
					<ActionsPanel />
					<MapActionsPanel />
					<InfoPanel />
				</div>
				<Map />
			</div>
		</ThemeProvider>
	)
}

export default App
