import React, { useState } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { postEvent } from '../services/fetchAPI';

import styled from 'styled-components';

const formatNumber = number => {
	return number < 10 ? '0' + number : number;
};

const StyledFormControl = styled(FormControl)`
	margin: 15px 0;
	width: 80%;
`;

class EventForm extends React.PureComponent {
	state = {
		style: '',
		scene: '',
		artist: '',
		name: '',
		description: '',
		date: '2020-03-02T12:00:00.000Z',
	};

	handleChange = (event, name) => {
		if (name === 'date') {
			const date = new Date(event);
			const dd = formatNumber(date.getDate());
			const mm = formatNumber(date.getMonth() + 1);
			const yyyy = date.getFullYear();
			this.setState({ date: `${yyyy}-${mm}-${dd}T12:00:00.000Z` });
		} else {
			this.setState({ [name]: event.target.value });
		}
	};

	onSubmit = () => {
		postEvent(this.state);
	};

	render() {
		const { scenes, artists } = this.props;
		const { scene, artist, date } = this.state;
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<StyledFormControl>
					<TextField
						placeholder="Nom"
						onChange={e => this.handleChange(e, 'name')}
						required
					/>
				</StyledFormControl>

				<StyledFormControl>
					<Select
						value={artist}
						onChange={e => this.handleChange(e, 'artist')}
						displayEmpty
						required>
						<MenuItem value="" disabled>
							Artiste
						</MenuItem>
						{artists.map(({ id, name }) => (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						))}
					</Select>
				</StyledFormControl>

				<StyledFormControl>
					<Select
						value={scene}
						onChange={e => this.handleChange(e, 'scene')}
						displayEmpty
						required>
						<MenuItem value="" disabled>
							Scène
						</MenuItem>
						{scenes.map(({ id, name }) => (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						))}
					</Select>
				</StyledFormControl>

				<StyledFormControl>
					<TextField
						id="filled-textarea"
						label="Description"
						multiline
						rows="4"
						variant="filled"
						onChange={e => this.handleChange(e, 'description')}
						required
					/>
				</StyledFormControl>

				<StyledFormControl>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="dd/MM/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Date picker inline"
							value={date}
							onChange={e => this.handleChange(e, 'date')}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</StyledFormControl>

				<Button
					variant="contained"
					color="primary"
					style={{ margin: '40px 0' }}
					onClick={this.onSubmit}>
					Ajouter
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		scenes: state?.data?.scenes,
		artists: state?.data?.artists,
	};
};

export default connect(mapStateToProps)(EventForm);
