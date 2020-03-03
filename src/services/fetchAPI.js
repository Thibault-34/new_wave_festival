import {
	artistsQuery,
	stylesQuery,
	scenesQuery,
	eventsQuery,
	eventMutation,
} from './requests';

const URL_BASE =
	'https://api-euwest.graphcms.com/v1/ck6hntdxkcl8201d7fjtf0xaw/master';

const getContent = () => {
	return fetch(URL_BASE, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `query{ 
                    ${artistsQuery}
                    ${stylesQuery}
                    ${scenesQuery}
                    ${eventsQuery}  
                }`,
		}),
		mode: 'cors',
	}).then(response => Promise.all([response, response.json()]));
};

const postEvent = data => {
	return fetch(URL_BASE, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: `mutation{ 
                    ${eventMutation(data)}
                }`,
		}),
		mode: 'cors',
	})
		.then(response => response.json())
		.then(json => console.log(json));
};

export { getContent, postEvent };
