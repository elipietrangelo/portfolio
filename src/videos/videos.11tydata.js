module.exports = {
    layout: "detail",
    eleventyComputed: {
        permalink: (data) => {
            if (data.detail) {
                return "project/{{title | slug}}/"
            } else {
                return false
            }
        }
    }
}