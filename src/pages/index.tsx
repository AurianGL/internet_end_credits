import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import {WinButton} from "../components/button"
import {GenericWindowsBox, HeaderWindowsBox} from '../components/box'
import {AlertContainer} from '../components/alert'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AlertContainer className="windows" style={{ maxHeight: "100vw" }}>
      <HeaderWindowsBox>
        <p>Welcome to AurianGL</p>
      </HeaderWindowsBox>
      <div className="content">
        <div className="message">What are you looking for ?</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <WinButton>
            <Link to="/art">
              <p>ART</p>
            </Link>
          </WinButton>
          <WinButton>
            <Link to="/dev">
              <p>DEV</p>
            </Link>
          </WinButton>
        </div>
      </div>
    </AlertContainer>
  </Layout>
)

export default IndexPage
