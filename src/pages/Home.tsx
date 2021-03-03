import React from "react";
import { Link } from "react-router-dom";
import { Text } from "../components";

interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="w-full h-full">
      <nav className="text-red-500">
        <ul className="flex gap-3 p-2 border-red-500 border-b-2">
          <li>
            <Link to="/" className="text-orange-600 bg-blue ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/1995">back in 1995</Link>
          </li>
          {/* <li>
            <Link to="/deramp">DE RAMP</Link>
          </li> */}
        </ul>
      </nav>
      <Text />
    </div>
  );
};
