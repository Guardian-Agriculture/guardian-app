import { ThemeProvider } from '@mui/material';
import Map from './components/map/map'
import ActionsPanel from './components/actionsPanel/actionsPanel'
import { guardianTheme } from './common/guardianTheme';

import './app.scss';

const App = () => {
	return (
		<ThemeProvider theme={guardianTheme}>
			<div className='app'>
				<div className='app__hud'>
					<ActionsPanel />
				</div>
				<Map />
			</div>
		</ThemeProvider>
	)
}

export default App
