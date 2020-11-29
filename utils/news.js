const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;

module.exports = async ( spinner, {news} ) => {

    if (news){

      const datas = await axios.get("https://www.bbc.com/news/coronavirus")
      .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.gs-o-media__body").children("h3.lx-stream-post__header-title.gel-great-primer-bold.qa-post-title.gs-u-mt0.gs-u-mb-")
    
        $bodyList.each(function(i, elem) {
          ulList[i] = {
            title: $(this).find("span.lx-stream-post__header-text.gs-u-align-middle").text().replace("'",""),
            url: 'www.bbc.com' + $(this).find('a.qa-heading-link.lx-stream-post__header-link').attr('href')
          };
          
        });
    
        const data = ulList.filter(n => n.title);
        return data;
      })
      .then(res => log(res));

    }

    spinner.stopAndPersist();

}