// @flow
import React, { Component } from 'react';
import Home from '../components/Home/';
import Header from '../components/Layout/Header';

export default class HomePage extends Component {
  render() {
  	let {images} = this.props.mainStore;
    return (
    	<div className="main-container">
    		<Header {...this.props}/>
			<Home images_msg={this.props.mainStore.images_msg} images={images} emptyImage={this.props.emptyImage} updateImage={this.props.updateImage} onImageClick={this.props.updateImage} />
		</div>
    );
  }
}
