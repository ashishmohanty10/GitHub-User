import {
  Sun,
  MoonStar,
  Search,
  MapPin,
  Twitter,
  Link,
  Building,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import IMG from "./assets/react.svg";
import Axios from "axios";

const theme = atomWithStorage("dark", false);

const App = () => {
  const [appTheme, setAppTheme] = useAtom(theme);
  const handleClick = () => setAppTheme(!appTheme);

  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get("https://api.github.com/users").then((res) => {
      setName(res.data.name);
    });
  }, []);

  const dataExtraction = () => {
    Axios.get("https://api.github.com/users").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className={appTheme ? "dark" : "light"}>
      <div className="flex flex-col bg-[#dfe0e3] min-h-screen w-full dark:bg-[#141c2f] justify-center items-center">
        {/* container */}
        <div className="rounded mx-auto w-full max-w-[600px] p-2 flex flex-col gap-8">
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
                className="w-full h-[40px] px-2 text-sm bg-inherit rounded-lg outline-none dark:text-[#dfe0e3]"
              />
            </section>
            <button
              type="submit"
              onClick={dataExtraction}
              className="px-5 py-2 rounded-lg bg-[#0079ff] text-[#dfe0e3] text-sm font-medium hover:bg-blue-700 "
            >
              Search
            </button>
          </form>

          {/* main */}

          <section className="min-h-[400px] dark:bg-[#1f2a48] px-4 py-8 rounded-lg flex gap-16 items-start shadow-md w-full">
            <div className="p-4 rounded-full object-center overflow-hidden dark:bg-[#141c2f]">
              <img src={IMG} alt="" className="w-[100px] h-[100px]" />
            </div>

            <div className="md:flex flex-col items-start ">
              <div className="flex justify-between items-start gap-x-10 mb-8">
                <div>
                  <h3 className="dark:text-[#dfe0e3]">{name}</h3>
                  <a href="#" className="text-blue-500">
                    @ashishmohanty10
                  </a>

                  <p className="mt-3 text-[#8e94a4]">Bio</p>
                </div>

                <div>
                  <p className="text-[#8e94a4] text-sm font-normal">
                    Joining Date
                  </p>
                </div>
              </div>

              {/* repo summary */}

              <div className="p-4 dark:bg-[#141c2f] rounded-lg flex justify-between items-center w-full shadow-md mb-5">
                <div>
                  <p className="dark:text-[#dfe0e3] text-sm">Repos</p>
                  <span className="dark:text-[#dfe0e3] text-lg font-semibold">
                    8
                  </span>
                </div>

                <div>
                  <p className="dark:text-[#dfe0e3] text-sm">Followers</p>
                  <span className="dark:text-[#dfe0e3] text-lg font-semibold">
                    100
                  </span>
                </div>

                <div>
                  <p className="dark:text-[#dfe0e3] text-sm">Following</p>
                  <span className="dark:text-[#dfe0e3] text-lg font-semibold">
                    20
                  </span>
                </div>
              </div>

              {/* Data */}

              <div className="">
                <div className="md:grid grid-cols-2 justify-between items-center w-full mb-2 gap-x-20">
                  <div className="flex items-center gap-1 md:p-3">
                    <MapPin
                      strokeWidth={2}
                      className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0"
                    />
                    <p className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0">
                      Kolkata
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Twitter
                      strokeWidth={2}
                      className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0"
                    />
                    <p className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0">
                      Social
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 justify-between items-center w-full gap-x-20">
                  <div className="flex items-center gap-1 md:p-3">
                    <Link
                      strokeWidth={2}
                      className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0"
                    />
                    <p className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0">
                      Link
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Building
                      strokeWidth={2}
                      className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0"
                    />
                    <p className="dark:text-[#dfe0e3] text-sm mb-2 md:mb-0">
                      Building
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
