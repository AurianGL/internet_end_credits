import React from "react";
// import { Link } from "react-router-dom";
import { Password, Text } from "../components";
import { SecretProvider } from "../context";
import { exlibris, latency } from "../data/text";

interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  return (
    <div className="relative w-screen min-h-screen bg-black">
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
        <div className="flex align-top font-mono text-green-500">
          <div className='sm:w-full lg:w-1/2'>
            <Text text={exlibris} />
            <p >
              <span>{"> "}</span>
              <input className="bg-black text-green-500 font-mono border-0 rounded-none focus:outline-none min-w-0" type="text" onChange={event => console.log(event)}/>
              <span className="animate-pulse bg-green-500">{"_"}</span>
            </p>
          </div>
          <div>
            {/* <Text text={latency} /> */}
          </div>
        </div>
      </SecretProvider>
    </div>
  );
};
