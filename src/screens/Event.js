import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Title = styled(Typography)`
	font-weight: bold;
	margin: 20px 0;
`;

const MainTitle = styled(Title)`
	text-transform: uppercase;
`;

const Artist = styled.li`
	display: flex;
`;

const ArtistImage = styled.img`
	width: 30px;
	margin-right: 20px;
	border-radius: 50px;
	align-items: center;
`;

const ArtistName = styled(Typography)`
	text-decoration: underline;
`;

const Event = ({ data }) => {
	const name = data?.name;
	const artist = data?.artists[0];
	const description = data?.description;

	return (
		<div>
			<MainTitle>{name}</MainTitle>
			<Typography>{description}</Typography>

			<Title>Artistes:</Title>
			<ul>
				<Artist>
					<ArtistImage alt={artist?.name} src={artist?.image?.url} />
					<ArtistName>{artist?.name}</ArtistName>
				</Artist>
			</ul>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	const event = state?.data?.events?.find(
		({ id }) => id === props.match.params.id,
	);
	return {
		data: event,
	};
};

export default connect(mapStateToProps)(Event);
