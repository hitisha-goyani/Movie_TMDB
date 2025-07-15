
import { useState } from "react";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";


 const Language = ({ setLang, lang }) => {
  const [open, setOpen] = useState(false);
 const [selectedLang, setSelectedLang] = useState(null);
  const { data } = showMovie.useAllMovieQuery({ endpoint: "configuration/languages" });

  const handleSelect = (iso) => {
    setLang(iso);
     setSelectedLang(iso);
    setOpen(false);
  };

  // Find selected language name to show on button
  const selectedLangName = data?.find((l) => l.iso_639_1 === selectedLang)?.english_name;

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} /* ...other button props */>
        {selectedLangName || "Select Language"}
        {/* arrow icon */}
      </button>

      {open && (
        <div className="z-10 absolute mt-2 w-44 max-h-60 overflow-y-auto bg-white /* ... */">
          <ul>
            {data && data.map((ele) => (
              <li key={ele.iso_639_1}>
                <button
                  onClick={() => handleSelect(ele.iso_639_1)}
                  className={`block w-full text-left px-4 py-2 cursor-pointer
                    ${lang === ele.iso_639_1 ? "font-bold" : ""}`}
                >
                  {ele.english_name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

 export default Language;