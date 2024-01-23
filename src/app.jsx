import { ThemeProvider } from '@mui/material';
import Map from './components/map/map'
import ActionsPanel from './components/actionsPanel/actionsPanel'
import { guardianTheme } from './common/guardianTheme';

import './app.scss';
import InfoPanel from './components/infoPanel/infoPanel';

const App = () => {
	return (
		<ThemeProvider theme={guardianTheme}>
			<div className='app'>
				<div className='app__hud'>
					<ActionsPanel />
					<InfoPanel />
				</div>
				<Map />
			</div>
		</ThemeProvider>
	)
}

export default App
