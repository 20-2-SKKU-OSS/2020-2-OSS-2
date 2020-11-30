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

		//get month_data
        const [err3, response3] = await to(
            axios.get(`https://corona.lmao.ninja/v2/historical`)
        );
        handleError(`API is down, try again later.`, err3, false);
		if (response3.status === 404) {
			spinner.stopAndPersist();
			console.log(
				`${red(
					`${sym.error} Nops. A country does not exist…`
				)}\n`
			);
			process.exit(0);
		}

        let allData = response2.data;
        let worldper = allData.casesPerOneMillion;
        let realCount = 0;
		let code = 0;
		let flag = 0;
		let cdc_flag = 0;
		let con_pop = 0;
		let month_case = 0;

		// Limit.
		allCountries = allCountries.slice(0, Number.MAX_SAFE_INTEGER);

		// Push selected data.
		allCountries.map((oneCountry, count) => {

			flag = 0;
			cdc_flag = 0;
			month_case = 0;

			for(let i = 0;i<271;i++){
				if (response3.data[i].country == oneCountry.country){
					let cases = Object.values(response3.data[i].timeline.cases);
					month_case += cases[cases.length - 1] - cases[0];
					flag = 1;
				}
			}

			if (flag){

				con_pop = oneCountry.cases/oneCountry.casesPerOneMillion * 1000000;
				con_pop = Math.floor(con_pop);
				if (month_case/con_pop*100000 > 100){
					// console.log(oneCountry.country);
					// console.log(month_case/con_pop*100000);
					cdc_flag = 1;
				}
			}

            if (cdc_flag && realCount<limit){
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
			spinner.info(`${cyan(`About Dangerous Country, referring to CDC's Incidence Rate Ranges for COVID-19 Travel Health Notice Level 4`)}
  https://www.cdc.gov/coronavirus/2019-ncov/travelers/how-level-is-determined.html`);
			spinner.info(`${cyan(`The sort order is Per Million for convenience, but the following countries are all Level 4 countries.`)}`);
		}
		console.log(output.toString());
	}

};
