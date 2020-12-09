module.exports = {
    layout: "detail",
    eleventyComputed: {
        metaDescription: "Elisa Pietrangelo: {{title}} video",
        permalink: (data) => {
            if (data.detail) {
                return "project/{{title | slug}}/"
            } else {
                return false
            }
        }
    }
}