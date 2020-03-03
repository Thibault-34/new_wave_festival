import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

import { Events, EventForm, Gallery } from './screens';

import { fetchDataWithRedux } from './redux/actions';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

class App extends React.Component {
	state = {
		value: 0,
		data: [],
	};

	componentDidMount() {
		this.props.fetchDataWithRedux();
	}

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	render() {
		const { value, data } = this.state;
		return (
			<div style={{ backgroundColor: 'ivory' }}>
				<AppBar position="static">
					<Tabs
						value={value}
						onChange={this.handleChange}
						aria-label="simple tabs example">
						<Tab label="Concerts" {...a11yProps(0)} />
						<Tab label="Ajouter un concert" {...a11yProps(1)} />
						<Tab label="Galerie" {...a11yProps(2)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<Events events={data.events} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<EventForm />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Gallery />
				</TabPanel>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchDataWithRedux: () => dispatch(fetchDataWithRedux()),
	};
};

export default connect(null, mapDispatchToProps)(App);
