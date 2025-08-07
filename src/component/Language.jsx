import { useState } from "react";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Language = ({ setLang, lang }) => {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);
  const { data } = showMovie.useAllMovieQuery({ endpoint: "configuration/languages" });

  const handleSelect = (iso) => {
    setLang(iso);
    setSelectedLang(iso);
    setOpen(false);
  };

  const selectedLangName = data?.find((l) => l.iso_639_1 === selectedLang)?.english_name;

  return (
    <section className="bg-black text-white rounded-lg p-4 w-full max-w-sm mx-auto mt-10">
      <h2 className="text-lg font-semibold text-red-400 mb-3">🌐 Language</h2>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded-md hover:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-400 transition text-sm"
        >
          <span>{selectedLangName || "Select Language"}</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md max-h-52 overflow-y-auto text-sm">
            <ul>
              {data?.map((ele) => (
                <li key={ele.iso_639_1}>
                  <button
                    onClick={() => handleSelect(ele.iso_639_1)}
                    className={`w-full text-left px-3 py-2 hover:bg-red-700 hover:text-white transition 
                      ${lang === ele.iso_639_1 ? "bg-red-600 text-white font-medium" : "text-white"}`}
                  >
                    {ele.english_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Language;
