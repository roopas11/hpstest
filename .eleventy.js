const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const { format } = require('date-fns/format');

module.exports = function(eleventyConfig) {

    // Add date filter for sitemap.xml
    eleventyConfig.addFilter('date', function (date, dateFormat) {
        return format(date, dateFormat)
    });

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addWatchTarget('dist/_assets/');
    eleventyConfig.setUseTemplateCache(false);

    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: 'en' // Required
    });

    return {
        TemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        dir: {
            input: "src/templates/",
            output: "dist",
            layouts: "_layouts",
        },
    }

};
