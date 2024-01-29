import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { IoSunny } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import Axios from "axios";
import dateFormat, { masks } from "dateformat";

import { FaLocationDot } from "react-icons/fa6";
import { Building } from "lucide-react";

const darkModeAtom = atomWithStorage("darkMode", false);

const App = () => {
  const now = new Date();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const handleTheme = () => setDarkMode(!darkMode);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState();
  const [repos, setRepos] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState();
  const [gitUrl, setGitUrl] = useState("");
  const [socialId, setSocialId] = useState("");
  const [username, setUsername] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the username is not empty
    if (username.trim() !== "") {
      try {
        const res = await Axios.get(`https://api.github.com/users/${username}`);
        console.log(res);
        // Handle response data
        setName(res.data.name);
        setImg(res.data.avatar_url);
        setId(res.data.login);
        setBio(res.data.bio);
        setRepos(res.data.public_repos);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        setLocation(res.data.location);
        setCompany(res.data.company);
        setDate(res.data.created_at);
        setGitUrl(res.data.html_url);
        setSocialId(res.data.twitter_username);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state
      }
    }
  };

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="flex items-center justify-center w-full h-screen m-auto dark:bg-primaryDarkColor">
        <div className="w-[900px] h-[600px] p-2">
          {/* title */}

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold dark:text-primaryTextColor">
              devfinder.
            </h1>

            <div className="flex items-center justify-center gap-2">
              <p className="font-medium dark:text-primaryTextColor">
                {darkMode ? "LIGHT" : "DARK"}
              </p>
              <button
                onClick={handleTheme}
                className=" dark:text-primaryTextColor"
              >
                {darkMode ? <IoSunny size={24} /> : <IoIosMoon size={24} />}
              </button>
            </div>
          </div>

          {/* search */}

          <form
            action=""
            onSubmit={handleSubmit}
            className="flex items-center px-3 py-3 mb-5 rounded-md shadow-md bg-primaryTextColor dark:bg-boxColor focus-within:ring-2 dark:focus-within:ring-slate-400"
          >
            <IoSearch className="text-3xl text-btnColor" />
            <input
              type="text"
              placeholder="Search Users..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 outline-none bg-inherit dark:text-primaryTextColor"
            />
            <button
              type="submit"
              className="px-4 py-3 text-sm font-medium rounded-md bg-btnColor text-primaryTextColor hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {/* Output */}

          {!username ? (
            <div className="p-2 rounded-md shadow-md dark:bg-boxColor">
              User Not Availble
            </div>
          ) : (
            <div className="w-full p-2 rounded-md shadow-md dark:bg-boxColor">
              <div className="flex items-start justify-between gap-5">
                {/* image */}
                <div className="p-4 overflow-hidden rounded-full dark:bg-primaryDarkColor">
                  <img
                    src={img}
                    alt=""
                    className="w-[80px] h-[80px] rounded-full object-center "
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-start justify-between">
                    {/* userinfo */}
                    <div>
                      <h2 className="mb-1 text-lg font-medium dark:text-btnColor">
                        {name ? name : "No name "}
                      </h2>
                      <p className="mb-5 text-sm dark:text-primaryTextColor">
                        @{id}
                      </p>

                      <p className="text-sm dark:text-primaryTextColor opacity-70">
                        {bio ? bio : "This profile has no bio"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs dark:text-primaryTextColor">
                        Joined {dateFormat(date, "mmmm dS, yyyy")}
                      </p>
                    </div>
                  </div>

                  {/* Repo info */}

                  <div className="flex items-center justify-between p-4 mt-8 mb-8 rounded-md bg-primaryDarkColor">
                    <div>
                      <h2 className="text-sm font-medium uppercase dark:text-primaryTextColor">
                        Repos
                      </h2>
                      <p className="text-xl font-semibold dark:text-primaryTextColor">
                        {repos}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-sm font-medium uppercase dark:text-primaryTextColor">
                        Followers
                      </h2>
                      <p className="text-xl font-semibold dark:text-primaryTextColor">
                        {followers}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-sm font-medium uppercase dark:text-primaryTextColor">
                        Following
                      </h2>
                      <p className="text-xl font-semibold dark:text-primaryTextColor">
                        {following}
                      </p>
                    </div>
                  </div>

                  {/* links */}

                  <div className="grid items-center justify-between grid-cols-2 gap-x-10">
                    <div className="flex items-center gap-2 dark:text-primaryTextColor">
                      <FaLocationDot className="text-lg" />
                      <p className="text-sm">
                        {location ? location : "No Location"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 dark:text-primaryTextColor">
                      <FaTwitter className="text-lg" />
                      <a href="#" className="text-sm">
                        {socialId ? socialId : "Not Available"}
                      </a>
                    </div>
                  </div>

                  <div className="grid items-center justify-between grid-cols-2 mt-4 gap-x-10">
                    <div className="flex items-center gap-2 dark:text-primaryTextColor">
                      <FaLink className="text-lg" />
                      <a
                        href={gitUrl}
                        title={gitUrl}
                        className="overflow-hidden text-ellipsis hover:underline opacity-80"
                      >
                        {gitUrl ? gitUrl : "Not Available"}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 dark:text-primaryTextColor">
                      <Building className="text-lg" />
                      <a href="#" className="text-sm">
                        {company ? company : "Not Available"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
