module.exports = {
  siteMetadata: {
    title: `Here in Oaxaca`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
};
