module.exports = {
    layout: "detail",
    eleventyComputed: {
        permalink: (data) => {
            if (data.description) {
                return "project/{{title | slug}}/"
            } else {
                return false
            }
        }
    }
}