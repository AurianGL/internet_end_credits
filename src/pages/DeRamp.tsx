import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "../components";
import { IMAGES } from "../constants/images";
import { LoadingContext } from "../context";

interface DeRampProps {}

export const DeRamp: React.FC<DeRampProps> = () => {
  const [image, setImage] = useState(IMAGES[0]);
  const [page, setPage] = useState("intro");
  const { loading } = useContext(LoadingContext);

  const cycleImage = (operator: number) => {
    const newImage =
      IMAGES[
        (IMAGES.findIndex((img) => img === image) + operator) % IMAGES.length
      ];
    setImage(newImage);
  };

  return (
    <div className='p-10 bg-black text-gray-100 h-screen max-w-screen flex-col justify-between flex'>
      {loading && (
        <div className='absolute flex w-screen h-screen items-center justify-center inset-0'>
          <span>Deleting 1 Pixel</span>
        </div>
      )}
      <div className='text-gray-100 font-extrabold '>
        {page === "intro" && <Link to='/'>{"< "}</Link>}
        {page === "galerie" && (
          <span onClick={() => setPage("intro")}>{"< "}</span>
        )}
        DE RAMP - {page === "galerie" ? image : "synopsis"}
      </div>
      <div className='h-5/6 w-full flex justify-center items-center text-gray-100'>
        {page === "intro" && (
          <div>
            <p>
              On Saturday, 31 January 1953 a major flood struck Netherlands,
              north-west Belgium, England and Scotland. <br /> Dykes breached
              and for a moment earth disappeard under water. <br /> Since then
              more polders were built, and more lands were won over the sea.{" "}
              <br /> But in recent years more and more polders are returned to
              the sea, in an effort to work, not against but with the sea and in
              anticipation of its rise. <br /> Consequently the landscape is
              changing.
            </p>
            <button
              onClick={() => setPage("galerie")}
              className='text-2xl cursor-pointer'>
              See Images
            </button>
          </div>
        )}
        {page === "galerie" && <Canvas image={image}></Canvas>}
      </div>
      {page === "galerie" && (
        <div className='flex w-full justify-between'>
          <button
            disabled={loading}
            className='text-gray-100 font-extrabold text-3xl'
            onClick={() => cycleImage(-1)}>
            {"<"}
          </button>
          <button
            disabled={loading}
            className='text-gray-100 font-extrabold text-3xl'
            onClick={() => cycleImage(+1)}>
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};
