import React from 'react'
import PropTypes from "prop-types";
import get from "lodash/get";


import Featured from '../components/Featured';

class IndexPage extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
              }),
              fields: PropTypes.shape({
                slug: PropTypes.string.isRequired,
              }),
            }),
          }).isRequired
        ),
      }),
    }),
  };


  render() {
    // EDITABLE.
    const intro = `Soufflé marzipan tiramisu chocolate croissant. Toffee gingerbread wafer cheesecake pie gummies. Icing toffee cookie topping jujubes sweet. Fruitcake soufflé cake. Caramels ice cream oat cake cookie dragée muffin liquorice halvah jujubes. Sweet roll dessert danish. Danish marzipan dragée sweet roll. Bonbon macaroon oat cake tart. Marzipan chocolate cake caramels tiramisu marshmallow cake chocolate cake jelly-o. Pie candy canes pudding cake. Marshmallow cheesecake toffee cotton candy topping jelly-o sweet roll cupcake cake. Cookie cheesecake chocolate lollipop fruitcake. Pie halvah carrot cake fruitcake sweet roll powder tiramisu. Cheesecake biscuit cupcake marshmallow.`;
    // END EDITABLE.
    const markdown = get(this, 'props.data.allMarkdownRemark');
    return (
      <div>
        <div>
          {intro}
        </div>
        <div className="flex">
          <Featured
            id="1"
            image="http://via.placeholder.com/200x200"
            text="This is featured"
            url="/language"
          />
          <Featured
            id="2"
            image="http://via.placeholder.com/200x200"
            text="This is featured"
            url="/language"
          />
          <Featured
            id="3"
            image="http://via.placeholder.com/200x200"
            text="This is featured"
            url="/language"
          />
        </div>

        {markdown.edges.map(({node}, idx) => (
          <div key={idx}>
            <p><a href={node.fields.slug}>{node.frontmatter.title}</a></p>
          </div>
        ))}
      </div>
    );
  }
}

export default IndexPage

export const allQuery = graphql`
query allQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;