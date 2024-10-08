import React, { useContext, useEffect, useState } from "react";
import { Console, Dialog, Password, Text } from "../components";
import { ConsoleContext, DispatchTextContext, SecretContext } from "../context";
import { latency } from "../data/text";

export const Home = () => {
	const [open, setOpen] = useState<boolean>(true);
	const secret = useContext(SecretContext);
	const text = useContext(ConsoleContext);
	const dispatchText = useContext(DispatchTextContext);
	useEffect(() => {
		dispatchText({ type: "SET_TEXT", payload: { data: latency } });
	}, [dispatchText]);
	return (
		<div className="relative w-full h-full bg-black">
			{/* <nav className='text-red-500'>
        <ul className='flex gap-3 p-2 border-red-500 border-b-2'>
          <li>
            <Link to='/' className='text-orange-600 bg-blue '>
              Home
            </Link>
          </li>
          <li>
            <Link to='/1995'>back in 1995</Link>
          </li>
          <li>
            <Link to='/deramp'>DE RAMP</Link>
          </li>
        </ul>
      </nav> */}
			{open && (
				<div className="h-full w-full flex justify-center items-center">
					<Dialog>
						<p>type help for help</p>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="bg-white px-4 text-black"
						>
							OK
						</button>
					</Dialog>
				</div>
			)}
			{!open && (
				<div className="flex align-top font-death text-white text-left h-0">
					<div className="sm:w-full lg:w-2/3 bg-black">
						<Text text={text.text} />
						<Console />
					</div>
					{/* <div><Text text={latency} /></div> */}
				</div>
			)}
			{secret.length > 0 && (
				<div className="absolute flex justify-items-center items-center top-1/2 left-1/3">
					<Dialog>
						<Password />
					</Dialog>
				</div>
			)}
		</div>
	);
};
