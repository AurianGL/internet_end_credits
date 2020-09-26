/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { colors } from "./style-config"
import styled from "styled-components"
import "./index.scss"

const App = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: fixed;
  overflow: hidden;
  text-align: center;
  background-color: ${colors.deathBlue};
  height: 100vh;
  width: 100vw;
  & > div {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    & > div {
      width: 100%;
      text-align: left;
      position: relative;
      padding: 20px;
      flex-grow: 100;
    }
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <App>
      <div>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <div>{children}</div>
      </div>
    </App>
  )
}

export default Layout
