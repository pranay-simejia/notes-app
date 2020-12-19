const notes = require('./notes.js');
const yargs = require('yargs');


// yargs.version('1.1.0')

//add note
yargs.command({
	command: 'add',
	description: 'Adding a note!',
	builder: {
		title: {
			description: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			description: 'Note body',
			demandOption: true,
			type: 'string',
		},
	},
	handler: function (argv) {
		notes.addNotes(argv.title, argv.body);
	},
});

yargs.command({
	command: 'remove',
	description: 'Removing a note!',
	builder: {
		title: {
			description: 'Note Titile',
			demandOption: true,
			type: 'string',
		},
	},
	handler: function (argv) {
		notes.removeNotes(argv.title);
	},
});

yargs.command({
	command: 'list',
	description: 'listing a note!',
	handler: function () {
		notes.listNotes()
	},
});
yargs.command({
	command: 'read',
	description: 'reading a note!',
	builder: {
		title:{
			description:'notes title',
			demandOption:true,
			type: 'string'
		}
	},
	handler: function (argsv) {
		notes.readNotes(argsv.title)
	},
});
yargs.parse();
