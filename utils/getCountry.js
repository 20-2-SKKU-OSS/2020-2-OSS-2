const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const transformName = require('./transformName.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports = async (spinner, table, states, countryList, options) => {
	if (countryList && !states && !options.chart && !options.continent && !options.danger) {

		var countries_data = []

		for(let i=0;i<countryList.length;++i){
			countryList[i] = await transformName(countryList[i]);
			const [err, response] = await to(
				axios.get(`https://corona.lmao.ninja/v2/countries/${countryList[i]}`)
			);
			exitCountry(err, spinner, countryList);
			err && spinner.stopAndPersist();
			handleError(`API is down, try again later.`, err, false);
			const thisCountry = response.data;

			// Format.
			const format = numberFormat(options.json);

			table.push([
				i+1,
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
	
			var data=[
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
				}
			]

			countries_data.push(data[0]);
		
			if(i==countryList.length-1){
				spinner.stopAndPersist();
				console.log(table.toString());
			}
		}

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