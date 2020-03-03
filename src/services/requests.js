export const artistsQuery = `artists {
    id
    name
}`;

export const stylesQuery = `styles {
    id
    name
}`;

export const scenesQuery = `scenes {
    id
    name
}`;

export const eventsQuery = `events {
    id
    name
    artists {
      id
      name
      description
      styles {
        name
      }
      image {
        url
      }
    }
    date
    description
    scene {
      name
      location {
        latitude
        longitude
      }
    }
}`;

export const eventMutation = ({
	style,
	scene,
	artist,
	name,
	description,
	date,
}) => `createEvent(data: {name: "${name}", description: "${description}", scene: {connect: {id: "${scene}"}}, date: "${date}", artists: {connect: {id: "${artist}"}}}) {
    id
}`;
