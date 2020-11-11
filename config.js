module.exports = {

    devFolder: "src",
    distFolder: "dist",
    layoutsFolder: "layouts",
    assetsFolder: "assets",
    stylesFolder: "css",
    scriptsFolder: "js",
    mediaFolder: "media",

    // filter collections by order key value (front matter or other)
    sortByOrder: function (values) {
        let vals = [...values];     // this *seems* to prevent collection mutation...
        return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
    }

}