const process = require('process');
const colors = require('colors');
const marckDownLinks = require('./mdLinksFunctions');

const path = process.argv[2];
const findOption = (defaultOption, shortOption) => process.argv.findIndex((option) => option == shortOption || option == defaultOption);
const statsOptionIndex = findOption('--stats', '-s')
const validateOptionIndex = findOption('--validate', '-v')

const options = {
  validate: validateOptionIndex > 0,
  stats: statsOptionIndex > 0,
};

module.exports = MDLinks = (path, options) => {
    return new Promise((resolve, rejects) => {
      let links = [];
      const files = marckDownLinks.getMds(path);
      files.forEach((file) => {
          const content = marckDownLinks.readFile(file);
          const newLinks = marckDownLinks.getLinks(content);
          links = links.concat(newLinks)      
      })
      if (options.validate && options.stats) {
        return marckDownLinks.validationLinks(links)
          .then(res => {
            const stats = marckDownLinks.globalStats(links)
            stats.broken = marckDownLinks.brokenStats(res)
            resolve(stats, res);
          })
      }
      if (options.validate) {
        resolve(marckDownLinks.validationLinks(links))/*.then(res => console.log(res)))*/
      }
      if (options.stats) {
        const stats = marckDownLinks.globalStats(links)
        resolve(stats)
      }
      if (!options.validate && !options.stats) {
        resolve(links);
      }
      })
}
MDLinks(path,options)
 .then((res) => {console.log(res)})