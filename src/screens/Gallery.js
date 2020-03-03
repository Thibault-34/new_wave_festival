import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

class Gallery extends React.Component {
	state = {
		files: [],
	};

	handleChange = files => {
		this.setState({
			files: files,
		});
	};

	render() {
		return (
			<DropzoneArea
				acceptedFiles={['image/*', 'video/*', 'application/*']}
				onChange={this.handleChange}
				showFileNames
				showAlerts={false}
				filesLimit={20}
			/>
		);
	}
}

export default Gallery;
