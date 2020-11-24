const axios = require('axios');
const { cyan, dim } = require('chalk');
const numberFormat = require('./numberFormat');
const { sortingKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');
const sortValidation = require('./sortValidation.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = async (
	spinner,
	output,
	states,
	countryName,
	{ sortBy, limit, reverse, bar, json }
) => {
	if (!countryName && !states && !bar) {
		sortValidation(sortBy, spinner);
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allCountries = response.data;

		// Format.
		const format = numberFormat(json);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allCountries = orderBy(
			allCountries,
			[sortingKeys[sortBy]],
			[direction]
		);

		// Limit.
		allCountries = allCountries.slice(0, limit);

		// Push selected data.
		allCountries.map((oneCountry, count) => {
			output.push([
				count + 1,
				oneCountry.country,
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
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		if (!json) {
			spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		}
		
		// 파일명 country_chart를 thisCountry.country로 받아온 변수로 수정할 계획
		
		var fs=require('fs');

		if (!fs.existsSync('./output')){
			fs.mkdirSync('./output');
		}
		
		var path_ =  'output/'+thisCountry.country+'_chart.csv';
		
		const csvWriter = createCsvWriter({
			path: path_,
			header: [
			  {id: 'country', title: 'Country'},
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

		csvWriter.writeRecords(oneCountry);
		console.log(output.toString());
	}
};
