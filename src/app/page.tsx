"use client";

import ThemeToggler from "@/components/ThemeToggler";
import { DataProp } from "@/types/types";
import {
  BuildingIcon,
  LinkIcon,
  Loader2Icon,
  Mail,
  MapPin,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<DataProp | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();

      setUserData(data);
      setError(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (!loading) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="dark:bg-[#141c30] w-full h-screen flex justify-center items-center">
      <div className="w-[700px] h-[600px] p-2">
        {/* Heading */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">devfinder</h1>
          <ThemeToggler />
        </div>

        <div className="flex flex-col space-y-10">
          {/* Input fields */}
          <div className="dark:bg-[#1F2A48] flex items-center gap-x-4 px-3 py-2 rounded-lg shadow-lg">
            <SearchIcon size={30} className="text-blue-600" />
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Search Here..."
              className="w-full py-2 px-4 bg-inherit focus:outline-none"
            />
            <button
              type="submit"
              className="text-white py-2 px-4 bg-blue-600 rounded-lg"
              onClick={() => getData()}
            >
              Search
            </button>
          </div>

          {error ? (
            <div className="dark:bg-[#1F2A48] px-3 py-4 w-full h-fit grid grid-cols-4 rounded-lg shadow-lg">
              <p className="text-red-600 text-center">No user found</p>
            </div>
          ) : userData ? (
            <div className="dark:bg-[#1F2A48] px-3 py-4 w-full h-fit grid grid-cols-4 rounded-lg shadow-lg">
              {/* Left side*/}
              <div className="overflow-hidden col-span-1 w-[100px] h-[100px] bg-slate-400 rounded-full flex items-center justify-center">
                <Image
                  src={userData.avatar_url}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                />
              </div>

              {/* Right side - User information */}
              <div className="col-span-3">
                <div className="flex justify-between mb-2 text-ellipsis">
                  <h2 className="text-lg font-semibold">{userData.name}</h2>
                  <p className="text-slate-500 font-medium text-sm truncate">
                    Joined {new Date(userData.created_at).toLocaleDateString()}
                  </p>
                </div>

                <p className="text-sm font-semibold text-blue-600 mb-6">
                  @{userData.login}
                </p>

                <p className="text-base font-medium text-slate-400 text-balance mb-6 overflow-hidden truncate">
                  {userData.bio}
                </p>

                {/* Stats */}
                <div className="p-4 rounded-lg dark:bg-[#141c30] grid grid-cols-3 mb-6">
                  <div>
                    <p className="mb-2">Repo</p>
                    <p>{userData.public_repos}</p>
                  </div>
                  <div>
                    <p className="mb-2">Followers</p>
                    <p>{userData.followers}</p>
                  </div>
                  <div>
                    <p className="mb-2">Following</p>
                    <p>{userData.following}</p>
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-3 text-ellipsis">
                  <div className="flex items-center gap-x-2 mb-2">
                    <MapPin />
                    <p className="truncate">{userData.location}</p>
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <Mail />
                    <p className="truncate">{userData.email || "N/A"}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <LinkIcon />
                    <p className="truncate">{userData.blog}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BuildingIcon />
                    <p className="truncate">{userData.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Page;
