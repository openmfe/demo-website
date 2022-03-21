const pluginSass = require("eleventy-plugin-sass")
const pluginOpenMFE = require("@openmfe/eleventy-plugin")
const beautify = require("js-beautify").html

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "src/assets": "_assets",
        "src/assets/favicon.ico": "/favicon.ico"
    })

    eleventyConfig.addPlugin(pluginSass, {
        watch: ["src/styles/*.scss"],
        outputDir : "dist/_assets/css"
    })

    eleventyConfig.addPlugin(pluginOpenMFE, {
        manifest: process.env.MFE_MANIFEST_URL
    })

    eleventyConfig.addTransform("beautify", async (content, path) => {
        return path.endsWith(".html")
            ? beautify(content, { preserve_newlines: false })
            : content
    })

    return {
        dir: {
            input: "src/pages",
            output: "dist",
            layouts: "../templates",
            includes: "../templates",
            data: "../data"
        },
        passthroughFileCopy: true,
        templateFormats: ["njk", "md", "html"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    }
}
