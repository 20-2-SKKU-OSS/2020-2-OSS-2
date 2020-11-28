const chalk = require('chalk');
const cli = require('./cli');
const plain = text => text;
const json = cli.flags.json;
const green = json ? plain : chalk.green;
const red = json ? plain : chalk.red;
const yellow = json ? plain : chalk.yellow;
const dim = json ? plain : chalk.dim;

module.exports = {
	single: [
		`#`,
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Recovered`,
		`Active`,
		`Critical`,
		`Per Million`
	],
	colored: [
		`#`,
		`Country`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${green(`Recovered`)}`,
		`${yellow(`Active`)}`,
		`${red(`Critical`)}`,
		`Per Million`
	],
	singleStates: [
		`#`,
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`Deaths`,
		`Deaths ${dim(`(today)`)}`,
		`Active`
	],
	coloredStates: [
		`#`,
		`State`,
		`Cases`,
		`Cases ${dim(`(today)`)}`,
		`${red(`Deaths`)}`,
		`${red(`Deaths (today)`)}`,
		`${yellow(`Active`)}`
	],
	style: { head: ['cyan'] },
	borderless: {
		top: '',
		'top-mid': '',
		'top-left': '',
		'top-right': '',
		bottom: '',
		'bottom-mid': '',
		'bottom-left': '',
		'bottom-right': '',
		left: '',
		'left-mid': '',
		mid: '',
		'mid-mid': '',
		right: '',
		'right-mid': '',
		middle: ' '
	},
	sortingKeys: {
		country: 'country',
		ca: 'cases' ,
		cases: 'cases',
		'cases-today': 'todayCases',
		'ca-t':'todayCases',
		deaths: 'deaths',
		d: 'deaths',
		'deaths-today': 'todayDeaths',
		'd-t': 'todayDeaths',
		recovered: 'recovered',
		r: 'recovered',
		a: 'active',
		active: 'active',
		critical: 'critical',
		c: 'critical',
		'per-million': 'casesPerOneMillion',
		'p-m': 'casesPerOneMillion',
		
		
	},
	sortingStateKeys: {
		state: 'state',
		cases: 'cases',
		ca: 'cases',
		'cases-today': 'todayCases',
		d: 'deaths',
		deaths: 'deaths',
		'deaths-today': 'todayDeaths',
		active: 'active'
	}
};
