import React from 'react'
import PropTypes from "prop-types";
import get from "lodash/get";

import Featured from '../components/Featured';
import Menu from '../components/Menu';
import Teaser from '../components/Teaser';

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
        <div className="flex mb4">
          <Featured
            image="http://via.placeholder.com/200x200"
            text="This is featured"
            url="/language"
          />
          <Featured
            image="http://via.placeholder.com/200x200"
            text="This is featured"
            url="/language"
          />
          <Featured
            image="http://via.placeholder.com/200x200"
            text="This is featured"
            url="/language"
          />
        </div>

        <div className="col col-9">
          <ul className="list-reset">
          {markdown.edges.map(({node}, idx) => (
            <Teaser
              key={idx}
              title={node.frontmatter.title}
              summary={node.frontmatter.summary}
              url={node.fields.slug}
              category={node.frontmatter.category}
            />
          ))}
          </ul>
        </div>

        <div className="col col-3">
        <Menu />
        </div>
      </div>
    );
  }
}

export default IndexPage

export const allQuery = graphql`
  query allQuery {
    allMarkdownRemark(
      limit:3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            summary
            category
          }
        }
      }
    }
  }
`;