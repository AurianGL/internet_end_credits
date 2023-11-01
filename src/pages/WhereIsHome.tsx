import { useState } from "react";
import { HomeMap } from "../components/HomeMap";

export const WhereIsHome = () => {
  const [lang, setLang] = useState<"en" | "fr">("en");

  return (
    <div className='w-full h-full bg-slate-800 min-h-screen min-w-max overflow-y-none'>
      <div className='flex justify-start'>
        <button
          onClick={() => setLang("en")}
          className={`p-2 ${lang === "en" ? "bg-slate-200" : "bg-slate-400"}`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("fr")}
          className={`p-2 ${lang === "fr" ? "bg-slate-200" : "bg-slate-400"}`}
        >
          FR
        </button>
      </div>
      <HomeMap lang={lang} />
    </div>
  );
};
