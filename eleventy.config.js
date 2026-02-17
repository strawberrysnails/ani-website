
/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  // Passthrough copy for static assets and CMS admin
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({
    "./public/": "/"
  });

eleventyConfig.addCollection("post", function(collectionApi) {
  return collectionApi.getFilteredByTag("post");
});


  // Watch CSS and images for live reload
  eleventyConfig.addWatchTarget("css/**/*.css");
  eleventyConfig.addWatchTarget("assets/**/*.{svg,webp,png,jpg,jpeg,gif}");

  // Optional: add a simple shortcode if you like
  eleventyConfig.addShortcode("currentBuildDate", () => {
    return new Date().toISOString();
  });


// Add date filters
eleventyConfig.addFilter("htmlDateString", (dateObj) => {
  return new Date(dateObj).toISOString().split("T")[0];
});

eleventyConfig.addFilter("readableDate", (dateObj) => {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateObj));
});

// Fix footer year error
eleventyConfig.addFilter("year", (dateObj) => {
  let date;
  if (!dateObj || dateObj === "now") {
    date = new Date(); // use current date
  } else {
    date = new Date(dateObj);
  }
  return date.getFullYear();
});



}

export const config = {
  templateFormats: ["md", "njk", "html", "liquid"],

  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",

  dir: {
    input: "content",         // where your content lives
    includes: "../_includes", // templates directory
    data: "../_data",         // data directory
    output: "_site"           // where Netlify deploys from
  }
};
