const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = async (spinner, table, states, countryName, options) => {
	if (countryName && !states && !options.chart) {
		const [err, response] = await to(
			axios.get(`https://corona.lmao.ninja/v2/countries/${countryName}`)
		);
		exitCountry(err, spinner, countryName);
		err && spinner.stopAndPersist();
		handleError(`API is down, try again later.`, err, false);
		const thisCountry = response.data;

		// Format.
		const format = numberFormat(options.json);

		table.push([
			`—`,
			thisCountry.country,
			format(thisCountry.cases),
			format(thisCountry.todayCases),
			format(thisCountry.deaths),
			format(thisCountry.todayDeaths),
			format(thisCountry.recovered),
			format(thisCountry.active),
			format(thisCountry.critical),
			format(thisCountry.casesPerOneMillion)
		]);
		spinner.stopAndPersist();
		
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

		csvWriter.writeRecords(thisCountry);
		console.log(table.toString());
	}
};
