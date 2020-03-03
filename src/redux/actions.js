import { getContent } from '../services/fetchAPI';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const fetchDataRequest = () => {
	return {
		type: FETCH_REQUEST,
	};
};

export const fetchDataSuccess = data => {
	return {
		type: FETCH_SUCCESS,
		data,
	};
};

export const fetchDataError = () => {
	return {
		type: FETCH_ERROR,
	};
};

export const fetchDataWithRedux = () => {
	return dispatch => {
		// notify app to starting data download
		dispatch(fetchDataRequest());

		// preocess to download
		return getContent().then(([response, json]) => {
			if (response.status === 200) {
				dispatch(fetchDataSuccess(json.data));
			} else {
				dispatch(fetchDataError());
			}
		});
	};
};
