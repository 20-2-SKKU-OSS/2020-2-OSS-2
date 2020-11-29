const axios = require('axios');
const { cyan, dim } = require('chalk');
const numberFormat = require('./numberFormat');
const { sortingKeys } = require('./table.js');
const to = require('await-to-js').default;
const handleError = require('cli-handle-error');
const orderBy = require('lodash.orderby');
const sortValidation = require('./sortValidation.js');

module.exports = async (
	spinner,
	output,
	states,
	countryName,
	{ sortBy, limit, reverse, bar, json, continent, danger }
) => {
	if (!countryName && !states && !bar && !continent && danger) {
        sortBy = "per-million";
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

        //get worldwide
        const [err2, response2] = await to(
            axios.get(`https://corona.lmao.ninja/v2/all`)
        );
        handleError(`API is down, try again later.`, err2, false);

        let allData = response2.data;
        let worldper = allData.casesPerOneMillion;
        let realCount = 0;

		// Limit.
		allCountries = allCountries.slice(0, limit);

		// Push selected data.
		allCountries.map((oneCountry, count) => {

            if ((realCount < 20) || (oneCountry.casesPerOneMillion > worldper * 3)){
                realCount++;
                output.push([
                    realCount,
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
            }
		});


		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		if (!json) {
            spinner.info(`${cyan(`About Dangerous Country`)}`);
		}
		console.log(output.toString());
	}

};
