// @flow
import React, { Component } from 'react';
import MuitThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import os from 'os';

import {readDir, FilterContent, pushInHistory} from '../utils/FileUtils'

class App extends Component {

  componentDidMount () {
    this.props.updatePath(os.homedir()); // set initial path
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.mainStore.currentPath != this.props.mainStore.currentPath) {
      this.props.emptyFiles();
      this.props.updateDirHistory(pushInHistory(nextProps.mainStore.currentPath, this.props.mainStore.currentPath, this.props.mainStore.dir_history));
      this.updateFiles(nextProps.mainStore.currentPath);
    }
  }

  updateFiles = (path) => {
    this._readDir(path, (files) => {
      if(files && files.length) {
        let images = [], directories = [];
        FilterContent(files).then(values => {
          let filteredFiles = values.filter((file) => {
            return file.isDirectory || file.isImage
          }).map((file) => {
            if(file.isDirectory) {
              directories.push(file);
            } else {
              images.push(file);
            }
            return file;
          })
          this.props.updateFiles(images, directories);
        })
      }
    });
  }

  _readDir = (path, cb) => {
    if(path) {
      readDir(path)
        .then((files) => {
          cb(files);
        })
    } else {
      cb([]);
    }
  }

  render() {

    let new_childrens = React.cloneElement(this.props.children, {...this.props, key: this.props.location.pathname});

    return (
      <MuitThemeProvider>
        <div>
          {new_childrens}
        </div>
      </MuitThemeProvider>
    );
  }
}

function mapStateToProps (state) {
  return {
    mainStore: state.mainStore
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);