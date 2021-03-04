import React from "react";
import { Link } from "react-router-dom";
import { Password, Text } from "../components";
import { SecretProvider } from "../context/SecretContext";
import { exlibris, latency } from "../data/text";

interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="relative w-full h-full">
      {/* <nav className="text-red-500">
        <ul className="flex gap-3 p-2 border-red-500 border-b-2">
          <li>
            <Link to="/" className="text-orange-600 bg-blue ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/1995">back in 1995</Link>
          </li>
          <li>
            <Link to="/deramp">DE RAMP</Link>
          </li>
        </ul>
      </nav> */}
      <SecretProvider>
        <div className="absolute flex justify-items-center items-center top-1/2 left-1/3">
          <Password></Password>
        </div>
        <div className="flex align-top">
          <div>
            <Text text={exlibris} />
          </div>
          <div>
            <Text text={latency} />
          </div>
        </div>
      </SecretProvider>
    </div>
  );
};
