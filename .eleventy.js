const config = require("config");
const path = require("path");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
module.exports = function(eleventyConfig) {

    //needed to refresh browser upon css changes
    eleventyConfig.addWatchTarget(path.join(config.devFolder,config.assetsFolder,config.stylesFolder,'**/*.scss'));

    //Specify which types of templates should be transformed.
    eleventyConfig.setTemplateFormats("njk,yml,md");

    eleventyConfig.addPassthroughCopy({[path.join(config.devFolder,config.assetsFolder,config.mediaFolder)]: config.mediaFolder})
    eleventyConfig.addPassthroughCopy({[path.join(config.devFolder,config.assetsFolder,config.scriptsFolder)]: config.scriptsFolder})

    eleventyConfig.setDataDeepMerge(true);

    //needed not to type out path to layout when used
    eleventyConfig.addLayoutAlias('base', path.join(config.layoutsFolder,'/base.njk'));
    eleventyConfig.addLayoutAlias('baseLogin', path.join(config.layoutsFolder,'/baseLogin.njk'));
    eleventyConfig.addLayoutAlias('home', path.join(config.layoutsFolder,'/home.njk'));
    eleventyConfig.addLayoutAlias('mywork', path.join(config.layoutsFolder,'/my-work.njk'));
    eleventyConfig.addLayoutAlias('detail', path.join(config.layoutsFolder,'/detail.njk'));

    eleventyConfig.addCollection("videos", function(collectionApi) {
        // get unsorted items
        return collectionApi.getFilteredByGlob("./src/videos/**/*.md");
    });

    eleventyConfig.addCollection("homePage", function(collectionApi) {
        // get unsorted items
        return collectionApi.getFilteredByGlob("./src/pages/home/home.md");
    });

    eleventyConfig.addCollection("categories", function(collectionApi) {
        // get unsorted items
        return collectionApi.getFilteredByGlob("./src/categories/**/*.md");
    });

    eleventyConfig.addCollection("homeSections", function(collectionApi) {
        // get unsorted items
        let hashSet = new Set();
        collectionApi.getFilteredByGlob("./src/pages/home/sections/**/*.md").forEach(function(item) {
            if( "hash" in item.data.eleventyNavigation ) {
                let hash = item.data.eleventyNavigation.hash;
                hashSet.add(hash);
            }
        });

        // returning an array in addCollection works in Eleventy 0.5.3
        return [...hashSet];
    });

    eleventyConfig.addCollection("videoTagList", function(collectionApi) {
        let tagSet = new Set();
        collectionApi.getFilteredByGlob("./src/videos/**/*.md").forEach(function(item) {
            if( "tags" in item.data ) {
                let tags = item.data.tags;

                for (const tag of tags) {
                    tagSet.add(tag);
                }
            }
        });

        // returning an array in addCollection works in Eleventy 0.5.3
        return [...tagSet];
    });

    //uses native 11ty navigation plugin to scaffold navigation
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addNunjucksFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });

    const md = require('markdown-it') ({
        html: false,
        breaks: true,
        linkify: true
    });
    eleventyConfig.addNunjucksFilter("markdownify", markdownString => md.render(markdownString));
    eleventyConfig.addFilter("keys", obj => Object.keys(obj));
    eleventyConfig.addFilter("sortByOrder", config.sortByOrder);

    //changes pre-defined broswerSync options
    eleventyConfig.setBrowserSyncConfig({
        open: true,
        port: 3000,
        watch: true
    });

    return {
        dir: {
            input: config.devFolder,
            output: config.distFolder
        }
    };

};
