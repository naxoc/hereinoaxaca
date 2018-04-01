import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'basscss/css/basscss.min.css';


import Header from '../components/Header'

const TemplateWrapper = ({children}) => (
  <div>
    <Helmet
      title="Here in Oaxaca"
      meta={[
        {name: 'description', content: 'Sample'},
        {name: 'keywords', content: 'sample, something'},
      ]}
    />
    <Header/>
    <div className="clearfix">
      <div className="max-width-3 mx-auto p1">
        {children()}
      </div>
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper
