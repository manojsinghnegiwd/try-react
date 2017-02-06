import React, {Component} from 'react';
import ImagePreview from '../Image';
var Masonry = require('react-masonry-component');


// main HomePage class
class Listing extends Component {

	constructor (props) {
		super(props);
	}

	renderImages = (files) => {
		return files.map((file, index) => {
			return (
				<div key={index} className="item">
					<ImagePreview lastIndex={(index == (files.length - 1))} firstIndex={(index === 0)} fileIndex={index} emptyImage={this.props.emptyImage} updateImage={this.props.updateImage} file={file} />
				</div>
			)
		})
	}

	render(){
		const {images} = this.props;
		return (
			<div className="listing">
				<Masonry
	                className={'my-gallery-class'}
	                disableImagesLoaded={false}
	                updateOnEachImageLoad={true}
	                options={{
	                	gutter: 10
	                }}>
					{this.renderImages(images)}
	            </Masonry>
			</div>
		)
	}
}

export default Listing