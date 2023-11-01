import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HomeMap } from "../components/HomeMap";
import { useQueryParams } from "../hooks/useParams";

const isLang = (lang: string): lang is "en" | "fr" => {
  return lang === "en" || lang === "fr";
}

export const WhereIsHome = () => {
  const location = useLocation();
  const { getParam } = useQueryParams();
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    const langParam = getParam("lang");
    if (langParam && isLang(langParam)) {
      setLang(langParam)
    }
  }, [getParam]);

  const handleLangChange = (newLang: "en" | "fr") => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("lang", newLang);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setLang(newLang);
  };

  return (
    <div className='w-full h-full bg-slate-800 min-h-screen min-w-max overflow-y-none'>
      <div className='flex justify-start'>
        <button
          onClick={() => handleLangChange("en")}
          className={`p-2 ${lang === "en" ? "bg-slate-200" : "bg-slate-400"}`}
        >
          EN
        </button>
        <button
          onClick={() => handleLangChange("fr")}
          className={`p-2 ${lang === "fr" ? "bg-slate-200" : "bg-slate-400"}`}
        >
          FR
        </button>
      </div>
      <HomeMap lang={lang} />
    </div>
  );
};
