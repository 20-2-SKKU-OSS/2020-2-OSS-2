const axios = require('axios');
const numberFormat = require('./numberFormat');
const exitCountry = require('./exitCountry');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');

module.exports = async (spinner, table, states, countryList, options) => {
	if (countryList && !states && !options.chart && !options.continent) {
		for(let i=0;i<countryList.length;++i){
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
			if(i==countryList.length-1){
				spinner.stopAndPersist();
				console.log(table.toString());
			}
		}
	}
};
