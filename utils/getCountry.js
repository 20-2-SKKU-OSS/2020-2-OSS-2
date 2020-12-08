const axios = require('axios');
const { cyan } = require('chalk');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const transformName = require('./transformName.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { sortingKeys } = require('./table.js');
const orderBy = require('lodash.orderby');
const sortValidation = require('./sortValidation.js');

module.exports = async (spinner, table, states, countryList, options) => {
	if (countryList[0] && !states && !options.chart && !options.continent && !options.danger && !options.news) {
		sortValidation(options.sortBy, spinner);
		var countries_data = []

		for(let i=0;i<countryList.length;++i){
			//Country name is transformed into standards for a comprehensive search.
			countryList[i] = await transformName(countryList[i]);
			const [err, response] = await to(
				axios.get(`https://corona.lmao.ninja/v2/countries/${countryList[i]}`)
			);
			exitCountry(err, spinner, countryList);
			err && spinner.stopAndPersist();
			handleError(`API is down, try again later.`, err, false);
			const thisCountry = response.data;

			var data=
				{
					countryName: thisCountry.country,
					cases: thisCountry.cases,
					todayCases: thisCountry.todayCases,
					deaths: thisCountry.deaths,
					todayDeaths: thisCountry.todayDeaths,
					recovered: thisCountry.recovered,
					active: thisCountry.active,
					critical: thisCountry.critical,
					casesPerOneMillion: thisCountry.casesPerOneMillion
				};
			countries_data.push(data);			
		}
		
		// Sort & reverse.
		const direction = options.reverse ? 'asc' : 'desc';
		countries_data = orderBy(
			countries_data,
			[sortingKeys[options.sortBy]],
			[direction]
		);

		// Format.
		const format = numberFormat(options.json);

		countries_data.map((oneCountry, count) => {
			table.push([
				count + 1,
				oneCountry.countryName,
				format(oneCountry.cases),
				format(oneCountry.todayCases),
				format(oneCountry.deaths),
				format(oneCountry.todayDeaths),
				format(oneCountry.recovered),
				format(oneCountry.active),
				format(oneCountry.critical),
				format(oneCountry.casesPerOneMillion)
			]);
		});

		spinner.stopAndPersist();
		if(countries_data.length>1){
			const isRev = options.reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
			if (!options.json) {
				spinner.info(`${cyan(`Sorted by:`)} ${options.sortBy}${isRev}`);
			}
		}
		console.log(table.toString());

		if(options.csv){
			var fs=require('fs');

			if (!fs.existsSync('./output')){
				fs.mkdirSync('./output');
			}

			var path_ =  'output/country.csv';
				
			const csvWriter = createCsvWriter({
				path: path_,
				header: [
				  {id: 'countryName', title: 'CountryName'},
				  {id: 'cases', title: 'Cases'},
				  {id: 'todayCases', title: 'TodayCases'},
				  {id: 'deaths', title: 'Deaths'},
				  {id: 'todayDeaths', title: 'Deaths (today)'},
				  {id: 'recovered', title: 'Recovered'},
				  {id: 'active', title: 'Active'},
				  {id: 'critical', title: 'Critical'},
				  {id: 'casesPerOneMillion', title: 'CasesPerOneMillion'},
				]
			});
			
			csvWriter.writeRecords(countries_data);
		}

	}
};