import React, { useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { IoSunny, IoMoonSharp, IoSearch } from "react-icons/io5";
import { FaTwitter, FaLink, FaBuilding } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import dateFormat from "dateformat";
import Axios from "axios";

const darkModeAtom = atomWithStorage("darkMode", false);

const App = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    Axios.get(`https://api.github.com/users/${username}`)
      .then((res) => {
        setData(res.data);
        setUsername("");
        setError(null);
      })
      .catch((error) => {
        setData(null);
        setError("User not found");
      });
  };

  return (
    <section className={darkMode ? "dark" : ""}>
      <section className="dark:bg-primaryBG ">
        <div className="container w-full h-screen flex justify-center items-center">
          <div className="h-[600px] md:min-w-[700px]">
            {/* top nav */}
            <div className="py-5 flex justify-between items-center w-full mb-4">
              <h1 className="dark:text-textColor font-bold text-2xl">
                devfinder
              </h1>

              <div
                className=" flex items-center justify-between gap-3 cursor-pointer"
                onClick={handleDarkMode}
              >
                <p className="text-base font-normal dark:text-textColor">
                  {darkMode ? "LIGHT" : "DARK"}
                </p>
                <button className="text-2xl font-bold dark:text-textColor">
                  {darkMode ? <IoSunny /> : <IoMoonSharp />}
                </button>
              </div>
            </div>
            {/* search box */}

            <form
              className="mb-4 shadow-md flex items-center py-2 px-2 dark:bg-boxBG focus-within:ring-1 focus-within:ring-slate-500 rounded-lg"
              onSubmit={handleSearch}
            >
              <IoSearch size={30} className="text-blueBox" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Search Username...."
                type="text"
                className="w-full bg-inherit outline-none pl-4 dark:text-textColor "
              />
              <button className="text-textColor font-bold text-sm py-3 px-4 bg-blueBox rounded-lg">
                Search
              </button>
            </form>
            {/* Output box */}

            <div>
              {error ? (
                <>
                  <div className="w-full  dark:bg-boxBG rounded-lg px-5 py-8 shadow-md dark:text-red-600 font-bold">
                    User Not Found
                  </div>
                </>
              ) : data ? (
                <>
                  <div className="w-full  dark:bg-boxBG rounded-lg px-5 py-8 shadow-md">
                    <div className="flex gap-4 py-2">
                      <img
                        src={data.avatar_url}
                        alt=""
                        className="w-[100px] h-[100px] rounded-full"
                      />

                      <div className="flex flex-col flex-wrap gap-y-1">
                        <h3 className="text-slate-800 dark:text-textColor font-bold text-xl">
                          {data?.name}
                        </h3>

                        <a href="#" className="text-blueBox text-base mb-1">
                          @{data?.login}
                        </a>
                        <p className="dark:text-slate-400 text-base text-slate-400">
                          {dateFormat(data?.created_at, "dd mmm yyyy")}
                        </p>
                        <p className="dark:text-textColor text-sm text-slate-600">
                          {data ? data.bio : "Not Availble"}
                        </p>
                      </div>
                    </div>

                    <section className="mt-2 py-4 rounded-lg shadow-md dark:bg-primaryBG p-2  flex justify-evenly items-center">
                      <div>
                        <p className="text-base font-bold dark:text-white ">
                          Repos
                        </p>
                        <p className="text-blueBox text-lg font-bold">
                          {data?.public_repos}
                        </p>
                      </div>

                      <div>
                        <p className="text-base font-bold dark:text-white ">
                          Followers
                        </p>
                        <p className="text-blueBox text-lg font-bold">
                          {data?.followers}
                        </p>
                      </div>

                      <div>
                        <p className="text-base font-bold dark:text-white ">
                          Following
                        </p>
                        <p className="text-blueBox text-lg font-bold">
                          {" "}
                          {data?.following}
                        </p>
                      </div>
                    </section>

                    <section className="mt-4 flex flex-col gap-y-4">
                      {/* first card */}
                      <div className="grid grid-cols-2">
                        <div className="flex items-center gap-2">
                          <MdLocationOn className="text-slate-600 text-3xl dark:text-iconColor" />

                          <p className="text-slate-700 font-normal text-sm dark:text-textColor opacity-60">
                            {data.location ? data.location : "Not Availble"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaTwitter className="text-slate-600 text-3xl dark:text-iconColor" />

                          <p className="text-slate-700 font-normal text-sm dark:text-textColor opacity-60">
                            {data.twitter_username
                              ? data.twitter_username
                              : "Not Availble"}
                          </p>
                        </div>
                      </div>

                      {/* second card */}
                      <div className="grid grid-cols-2">
                        <div className="flex items-center gap-2">
                          <FaLink className="text-slate-600 text-3xl dark:text-iconColor" />

                          <a
                            href={data.html_url}
                            target="_blank"
                            className="text-slate-700 font-normal text-sm dark:text-textColor hover:underline opacity-60 max-w-[220px] overflow-hidden text-ellipsis"
                          >
                            {data.html_url ? data.html_url : "Not Availble"}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaBuilding className="text-slate-600 text-3xl dark:text-iconColor" />

                          <p className="text-slate-700 font-normal text-sm dark:text-textColor opacity-60">
                            {data.company ? data.company : "Not Availble"}
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default App;
