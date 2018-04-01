const _ = require(`lodash`);
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const articleTemplate = path.resolve("src/templates/article.js");
  const tagTemplate = path.resolve("src/templates/tags.js");
  const categoryTemplate = path.resolve("src/templates/category.js");

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
                category
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      const posts = result.data.allMarkdownRemark.edges;

      let tags = [];
      let categories = [];

      posts.forEach(({ node }) => {
        if (!_.isEmpty(node.frontmatter.tags)) {
          tags = tags.concat(node.frontmatter.tags);
        }
        if (!_.isEmpty(node.frontmatter.category)) {
          categories = categories.concat(node.frontmatter.category);
        }

        // Create an article page.
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/article.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        });
      });
      // Remove duplicates from tags.
      tags = _.uniq(tags);
      categories = _.uniq(categories);

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/tags/${_.kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        });
      });
      categories.forEach(category => {
        createPage({
          path: `/category/${_.kebabCase(category)}/`,
          component: categoryTemplate,
          context: {
            category,
          },
        });
      });


      resolve();
    })
  })
};
