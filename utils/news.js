const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;
const chalk = require('chalk');
const green = chalk.green;

module.exports = async (spinner, { news }) => {

    if (news) {

        await axios.get("https://www.bbc.com/news/coronavirus")
            .then(html => {
                let ulList = [];
                const $ = cheerio.load(html.data);
                const $bodyList = $("div.gs-o-media__body").children("h3.lx-stream-post__header-title.gel-great-primer-bold.qa-post-title.gs-u-mt0.gs-u-mb-");

                $bodyList.each(function (i, elem) {
                    ulList[i] = {
                        title: $(this).find("span.lx-stream-post__header-text.gs-u-align-middle").text(),
                        url: 'www.bbc.com' + $(this).find('a.qa-heading-link.lx-stream-post__header-link').attr('href')
                    };

                });

                const data = ulList.filter(n => n.title);

                const newsTable = require('cli-table3');
                var table = new newsTable();
                for (let i = 0; i < data.length; ++i) {
                    table.push(
                        [{ rowSpan: 2, content: i + 1, vAlign: 'center' }, data[i].title],
                        [green(data[i].url)]
                    );
                }
                spinner.stopAndPersist();
                log(table.toString());
            });

    }


}