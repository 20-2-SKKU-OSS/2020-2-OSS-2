const sym = require('log-symbols');
const { sortingKeys } = require('./table.js');
const { red, green, dim } = require('chalk');

module.exports = (sortBy, spinner) => {
	if (sortBy !== 'cases') {
		if (Object.keys(sortingKeys).indexOf(sortBy) === -1) {
			spinner.stop();
			console.log(`${sym.error} ${red(`Wrong sorting key!`)}`);
			console.log(`${sym.info} You can only sort data by:
${dim(`-`)} ${green(`cases or ca`)}
${dim(`-`)} ${green(`cases-today or ca-t`)}
${dim(`-`)} ${green(`deaths or d`)}
${dim(`-`)} ${green(`deaths-today or d-t`)}
${dim(`-`)} ${green(`recovered or r`)}
${dim(`-`)} ${green(`active or a`)}
${dim(`-`)} ${green(`critical or c`)}
${dim(`-`)} ${green(`per-million or p-m`)}\n`);
			process.exit(0);
		}
		// It is a custom sort.
		return true;
	}
	// Not a custom sort.
	return false;
};
