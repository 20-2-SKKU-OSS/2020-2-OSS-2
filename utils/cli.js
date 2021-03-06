const meow = require('meow');
const { green, yellow, cyan } = require('chalk');

module.exports = meow(
	`
	Usage
	  ${green(`corona`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

	Commands
	  ${cyan(`country-name`)}  Get data for a given country
	  ${cyan(`states`)}        Get data for all USA states

	Options
	  ${yellow(`-s`)}, ${yellow(`--sort`)}      Sort data by type
	  ${yellow(`-r`)}, ${yellow(`--reverse`)}   Reverse print order
	  ${yellow(`-l`)}, ${yellow(`--limit`)}     Print only N entries
	  ${yellow(`-b`)}, ${yellow(`--bar`)}       Print stats in bar charts
	  ${yellow(`-c`)}, ${yellow(`--chart`)}     Print chart for a country
	  ${yellow(`-g`)}, ${yellow(`--log`)}       Print logarithmic chart
	  ${yellow(`-x`)}, ${yellow(`--xcolor`)}    Single colored output
	  ${yellow(`-m`)}, ${yellow(`--minimal`)}   Minimalistic CLI output
	  ${yellow(`-j`)}, ${yellow(`--json`)}      Output JSON only data
	  ${yellow(`--continent`)}     		    Print continental data
	  ${yellow(`--danger`)}        		    Print dangerous countries referring to CDC Health Notice Level
	  ${yellow(`--csv`)}           		    CSV-file export
	  ${yellow(`--news`)}          	     	    Print corona news

	Examples
	  ${green(`corona`)} ${cyan(`china`)}		Print data of ${cyan(`china`)}
	  ${green(`corona`)} ${cyan(`states`)}		Print data of all ${cyan(`states`)}
	  ${green(`corona`)} ${yellow(`--bar`)}		Print stats in ${yellow(`bar`)} charts
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`--chart`)}			Print chart for ${cyan(`china`)}
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`--chart`)} ${yellow(`--log`)}	Print ${yellow(`log`)} chart for ${cyan(`china`)}
	  ${green(`corona`)} ${yellow(`--csv`)} ${cyan(`states`)}         		Extract ${cyan(`states`)} data to ${yellow(`csv`)} 
	  ${green(`corona`)} ${yellow(`--sort`)} ${cyan(`cases-today`)}			Print ${yellow(`sorted`)} data by ${cyan(`cases-today`)}
	  ${green(`corona`)} ${yellow(`--csv`)} ${yellow(`-s`)} ${cyan(`deaths`)} ${cyan(`korea china japan`)}
											Print ${yellow(`sorted`)} data by ${cyan(`deaths`)} of ${cyan(`korea china japan`)}
	  ${green(`corona`)} ${yellow(`-s`)} ${yellow(`-l4`)} ${cyan(`critical`)}	Print ${yellow(`four sorted`)} data by ${cyan(`critical`)}

	Sort Key
	  ${yellow(`Country`)}: Name of the country
	  ${yellow(`Cases or Ca`)}: Total number of cases in a country
	  ${yellow(`Cases (today) or Ca-t`)}: Cases in 24 hours GMT/UTC
	  ${yellow(`Deaths or D`)}: Total number of deaths in a country
	  ${yellow(`Deaths (today) or D-t`)}: Deaths in 24 hours GMT/UTC
	  ${yellow(`Recovered or R`)}: Total number of recovered patients
	  ${yellow(`Active or A`)}: Total number of active patients
	  ${yellow(`Critical or C`)}: Total number of critical patients
	  ${yellow(`Per Million or P-m`)}: Affected patients per million

	❯ You can also run command + option at once:
	  ${green(`corona`)} ${cyan(`china`)} ${yellow(`-x`)} ${yellow(`-s cases`)}
`,
	{
		booleanDefault: undefined,
		hardRejection: false,
		inferType: false,
		flags: {
			xcolor: {
				type: 'boolean',
				default: false,
				alias: 'x'
			},
			sort: {
				type: 'string',
				default: 'cases',
				alias: 's'
			},
			reverse: {
				type: 'boolean',
				default: false,
				alias: 'r'
			},
			limit: {
				type: 'number',
				default: Number.MAX_SAFE_INTEGER,
				alias: 'l'
			},
			chart: {
				type: 'boolean',
				default: false,
				alias: 'c'
			},
			log: {
				type: 'boolean',
				default: false,
				alias: 'g'
			},
			bar: {
				type: 'boolean',
				default: false,
				alias: 'b'
			},
			minimal: {
				type: 'boolean',
				default: false,
				alias: 'm'
			},
			json: {
				type: 'boolean',
				default: false,
				alias: 'j'
			},
			continent: {
				type: 'boolean',
				default: false
				// alias: 'b'
			},
			danger: {
				type: 'boolean',
				default: false
			},
			csv: {
				type: 'boolean',
				default: false,
			},
			news: {
				type: 'boolean',
				default: false,
			}			
		}
	}
);
