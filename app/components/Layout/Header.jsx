import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import OnEvent from 'react-onevent';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import HomeIcon from 'material-ui/svg-icons/action/home';
import {List, ListItem} from 'material-ui/List';
import ImageDialog from '../ImageDialog';
import {updateWindowTitle} from '../../utils/FileUtils';
import Subheader from 'material-ui/Subheader';
import os from 'os';


injectTapEventPlugin(); // to support onTouchTap

class Header extends Component {

	constructor (props) {
		super(props);
		this.state = {
			currentPath: props.mainStore.currentPath,
			openDialog: false
		}
	}

	componentWillReceiveProps (nextProps) {
		if(nextProps.mainStore.currentPath != this.state.currentPath) {
			this.changePath(nextProps.mainStore.currentPath);
		}

		if(nextProps.mainStore.currentImage && nextProps.mainStore.currentImage.path != '' && nextProps.mainStore.currentImage.path != this.props.mainStore.currentImage.path) {
			this.openDialog();
		}
	}

	handleChangePath = (e) => {
		this.setState({
			currentPath: e.target.value
		});
	}

	changePath = (path) => {
		this.setState({
			currentPath: path
		})
	}

	updatePath = (e) => {
		this.props.updatePath(e.target.value);
	}

	closeDialog = () => {
		this.props.emptyImage();
		this.setState({
			openDialog: false
		})
	}

	openDialog = () => {
		this.setState({
			openDialog: true
		})
	}

	updateImageByIndex = (index) => {
		let {images} = this.props.mainStore;
		let firstIndex = (index === 0);
		let lastIndex = (index == images.length - 1);
		let {path, filename} = images[index];
		this.props.updateImage(path, filename, index, lastIndex, firstIndex);
	}

	goForward = () => {
		let {currentPath, dir_history} = this.props.mainStore;
		let nextDir = dir_history.lastIndexOf(currentPath) + 1; 
		if(dir_history[nextDir]){
			this.props.updatePath(dir_history[nextDir]);
		}
	}

	goBack = () => {
		let {currentPath, dir_history} = this.props.mainStore;
		let prevDir = dir_history.lastIndexOf(currentPath) - 1;
		if(dir_history[prevDir]){
			this.props.updatePath(dir_history[prevDir]);
		}
	}

	renderDirs = (dirs) => {
		// else return
		return dirs.map((dir, index) => {
			return <ListItem onClick={() => {this.props.updatePath(dir.path); updateWindowTitle(dir.filename)}} key={index} primaryText={dir.filename} leftIcon={<FolderIcon />} />
		})
	}

	render(){
		const {currentPath, open, openDialog} = this.state;
		const {directories, currentImage} = this.props.mainStore;
		const buttonStyle = {
			marginLeft: 5,
			marginRight: 5,
			cursor: 'pointer'
		}
		return (
			<div className="header">
				<Toolbar>
					<ToolbarGroup>
						<ArrowBack style={buttonStyle} onClick={this.goBack} />
						<HomeIcon style={buttonStyle} onClick={() => this.props.updatePath(os.homedir())} />
						<ArrowForward style={buttonStyle} onClick={this.goForward} />
						<OnEvent enter={this.props.updatePath}>
							<TextField
								style={{
									marginLeft: 40
								}}
								hintText="Type anything"
								value={currentPath}
								onChange={e => this.handleChangePath(e)}
								onBlur={this.updatePath}
							/>
						</OnEvent>
					</ToolbarGroup>
				</Toolbar>
				<Drawer containerClassName="drawer-container" docked={true} open={open}>
					<List>
						<Subheader>Folders List</Subheader>
						{this.renderDirs(directories)}
					</List>
				</Drawer>
				<ImageDialog onNavigation={this.updateImageByIndex} onClose={this.closeDialog} open={openDialog} image={currentImage} />
			</div>
		)
	}
}

export default Header;