const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.find((note) => {
		return note.title === title;
	});
	if (!duplicateNotes) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log(chalk.greenBright.inverse('Your note is added!'));
	} else {
		console.log(
			chalk.red.inverse('Sorry...Note with that title already exists! :( ')
		);
	}
};
const removeNotes = (title) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => {
		return note.title !== title;
	});
	if (notesToKeep.length === notes.length) {
		console.log(chalk.red.inverse('Note not found!'));
	} else {
		console.log(chalk.greenBright.inverse('Note removed successfully'));
		saveNotes(notesToKeep);
	}
};
const listNotes = () => {
	console.log(chalk.bold.italic.cyanBright('YOUR NOTES!'));
	const notes = loadNotes();
	notes.forEach((note) => {
		console.log(chalk.greenBright(note.title));
	});
};
const readNotes = (title) => {
	const notes = loadNotes();
	const noteDemanded = notes.find((note) => {
		return note.title === title;
	});
	if (noteDemanded) {
		console.log(chalk.italic.magenta.underline(noteDemanded.title));
		console.log(chalk.inverse(noteDemanded.body));
	} else {
		console.log(chalk.red.inverse('Oops, no note with that title!'));
	}
};
const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};
const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};
module.exports = {
	readNotes: readNotes,
	addNotes: addNotes,
	removeNotes: removeNotes,
	listNotes: listNotes,
};
