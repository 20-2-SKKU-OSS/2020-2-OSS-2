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
	{ sortBy, reverse, bar, json, continent }
) => {
	if (!countryName && !states && !bar && continent) {
		sortValidation(sortBy, spinner);
		const [err, response] = await to(
			axios.get(`https://disease.sh/v3/covid-19/continents`)
		);
		handleError(`API is down, try again later.`, err, false);
		let allContinents = response.data;

		// Format.
		const format = numberFormat(json);

		// Sort & reverse.
		const direction = reverse ? 'asc' : 'desc';
		allContinents = orderBy(
			allContinents,
			[sortingKeys[sortBy]],
			[direction]
		);

		// Push selected data.
		allContinents.map((oneContinent, count) => {
			output.push([
				count + 1,
				oneContinent.continent,
				format(oneContinent.cases),
				format(oneContinent.todayCases),
				format(oneContinent.deaths),
				format(oneContinent.todayDeaths),
				format(oneContinent.recovered),
				format(oneContinent.active),
				format(oneContinent.critical),
				format(oneContinent.casesPerOneMillion)
			]);
		});

		spinner.stopAndPersist();
		const isRev = reverse ? `${dim(` & `)}${cyan(`Order`)}: reversed` : ``;
		if (!json) {
			spinner.info(`${cyan(`Sorted by:`)} ${sortBy}${isRev}`);
		}
		console.log(output.toString());
	}
};
