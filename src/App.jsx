import { Sun, MoonStar, Search } from "lucide-react";
import React from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const theme = atomWithStorage("dark", false);

const App = () => {
  const [appTheme, setAppTheme] = useAtom(theme);
  const handleClick = () => setAppTheme(!appTheme);

  return (
    <div className={appTheme ? "dark" : "light"}>
      <div className="flex flex-col bg-[#dfe0e3] min-h-screen w-full dark:bg-[#141c2f] justify-center items-center">
        {/* container */}
        <div className="border rounded mx-auto w-full max-w-[600px] p-2 flex flex-col gap-8">
          <section className="flex justify-between items-center">
            <p className="font-secondarFont text-2xl font-bold dark:text-[#dfe0e3]">
              devfinder
            </p>
            <div className="flex justify-between items-center gap-x-2 dark:text-[#dfe0e3]">
              <p className="font-medium">{!appTheme ? "DARK" : "LIGHT"}</p>
              <button onClick={handleClick}>
                {!appTheme ? (
                  <MoonStar strokeWidth={2} />
                ) : (
                  <Sun strokeWidth={2} />
                )}
              </button>
            </div>
          </section>

          {/* search */}

          <form
            action=""
            className="mb-2 rounded-lg flex items-center shadow-md gap-2 focus-within:ring-1 dark:focus-within:ring-gray-200 focus-within:ring-slate-400 p-2 dark:bg-[#1f2a48]"
          >
            <section className="flex items-center w-full h-full ">
              <Search strokeWidth={2} className="text-blue-500" />
              <input
                type="text"
                placeholder="Search GitHub username..."
                className="w-full h-[40px] px-1 text-sm bg-inherit rounded-lg outline-none dark:text-[#dfe0e3]"
              />
            </section>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#0079ff] text-[#dfe0e3] text-sm font-medium hover:bg-blue-700 "
            >
              Search
            </button>
          </form>

          {/* main */}

          <section className="min-h-[400px] dark:bg-[#1f2a48] px-4 py-8 rounded-lg flex justify-between items-start">
            <div>
              <img src="" alt="" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
