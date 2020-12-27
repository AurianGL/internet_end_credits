import React from 'react'
import {
  Link
} from "react-router-dom";

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
      <div>
        hello world
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/1995">back in 1995</Link>
            </li>
            <li>
              <Link to="/deramp">DE RAMP</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
}