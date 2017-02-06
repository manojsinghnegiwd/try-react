import fs from 'fs';
import path from 'path';

const checkIfImage = (ext) => {
	ext = ext.toLowerCase(ext);
	return (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif')
}

const isDirOrImage = (file) => {
	return new Promise (
		(res, rej) => {
			if(!file.isImage) {
				fs.stat(file.path, (err, stat) => {
					if(err)
						rej(err)

					let isDirectory = stat.isDirectory();
					res({
						...file,
						isDirectory
					})
				})
			} else {
				res({
					...file,
					isDirectory: false
				})
			}
		}
	)
}

const FilterContent = (files) => {
	let AllPromises = [];

	AllPromises = files.map((file) => {
		return isDirOrImage(file)
	})

	return Promise.all(AllPromises)
}

const readDir = (dirSrc) => {
	return new Promise (
		(res, rej) => {
			fs.readdir(dirSrc, (err, files) => {
				if(err)
					rej(err);

				res(files.map((file) => {
					isDirOrImage
					return {
						filename: file,
						path: path.join(dirSrc, file),
						isImage: checkIfImage(file.substr(file.lastIndexOf('.') + 1))
					}
				}))
			})
		}
	)
}

const updateWindowTitle = (title) => {
	let PageTitle = document.querySelectorAll('title')
	PageTitle[0].innerHTML = title;
}

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };

}

const pushInHistory = (nextDir, currentDir, browser_history) => {

	if(!nextDir) {
		return;
	}

	let dir_index = browser_history.lastIndexOf(nextDir);
	if(dir_index == -1){
		if(currentDir == browser_history[browser_history.length - 2]) {
			browser_history.splice(browser_history.length - 1, 1);
		}
		browser_history.push(nextDir);
	}
	return browser_history;
}


export {
	readDir,
	checkIfImage,
	FilterContent,
	calculateAspectRatioFit,
	updateWindowTitle,
	pushInHistory
}