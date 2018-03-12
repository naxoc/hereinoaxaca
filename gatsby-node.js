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

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
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

      posts.forEach(({ node }) => {
        if (!_.isEmpty(node.frontmatter.tags)) {
          tags = tags.concat(node.frontmatter.tags);
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


      resolve();
    })
  })
};
