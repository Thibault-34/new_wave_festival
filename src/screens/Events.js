import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import { Event } from '.';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const APP_ID = '9baeb2256032eb5d88358aac9577bae7';

const StyledCard = styled(Paper)`
	padding: 5px 50px;
	margin-bottom: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const EventItem = ({ name, date, scene }) => {
	const [data, setData] = useState({});
	const splittedDate = date.split(/T|Z/);
	const [yyyy, mm, dd] = splittedDate[0].split('-');
	let [hours, minutes] = splittedDate[1].split(':');
	hours = +hours + 1;
	hours = hours === 24 ? '00' : hours;

	useEffect(() => {
		const _getWeather = city => {
			return fetch(
				`${API_BASE_URL}?q=${city}&units=metric&&appid=${APP_ID}`,
			)
				.then(response => response.json())
				.then(json => {
					setData(
						json.list.find(
							el => el.dt_txt === `${yyyy}-${mm}-${dd} 12:00:00`,
						),
					);
				});
		};
		_getWeather('montpellier');
	}, []);

	return (
		<StyledCard>
			<Typography style={{ flex: 1 }}>
				{`${dd}/${mm}/${yyyy}`} | {`${hours}:${minutes}`}
			</Typography>
			<Typography style={{ flex: 1 }}>{scene?.name}</Typography>
			<Typography style={{ flex: 1 }}>{name}</Typography>
			{data.weather ? (
				<img
					src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
				/>
			) : (
				'loading...'
			)}
		</StyledCard>
	);
};

const mapStateToProps = state => {
	return {
		events: state?.data?.events,
	};
};

const Events = connect(mapStateToProps)(({ events }) => {
	return (
		<>
			{events &&
				events.map(({ id, ...props }) => (
					<Link key={id} to={`/event/${id}`}>
						<EventItem {...props} />
					</Link>
				))}
		</>
	);
});

const EventsNavigation = () => {
	return (
		<>
			<Switch>
				<Route path="/event/:id" component={Event} />
				<Route path="/" component={Events} />
			</Switch>
		</>
	);
};

export default EventsNavigation;
