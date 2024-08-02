"use client";

import ThemeToggler from "@/components/ThemeToggler";
import { DataProp } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { BuildingIcon, LinkIcon, Mail, MapPin, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import LoaderComponent from "./loading";

const Page = () => {
  const [username, setUsername] = useState("Octocat");

  const { data, refetch, isLoading } = useQuery<DataProp>({
    queryKey: ["Data"],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}`).then((res) =>
        res.json()
      ),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading) return <LoaderComponent />;

  return (
    <div className="dark:bg-[#141c30] w-full h-screen flex justify-center items-center">
      <div className="w-[700px] h-[600px] p-2 min-w-[400px]">
        {/* Heading */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">devfinder</h1>
          <ThemeToggler />
        </div>

        <div className="flex flex-col space-y-10">
          {/* Input fields */}
          <form
            onSubmit={handleSubmit}
            className="dark:bg-[#1F2A48] flex items-center gap-x-4 px-3 py-2 rounded-lg shadow-lg"
          >
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
            >
              Search
            </button>
          </form>

          {data?.message ? (
            <div className="dark:bg-[#1F2A48] px-3 py-4 w-full h-fit md:grid md:grid-cols-4 rounded-lg shadow-lg">
              <p className="text-red-600 text-center">No user found</p>
            </div>
          ) : data ? (
            <div className="dark:bg-[#1F2A48] px-3 py-4 w-full h-fit rounded-lg shadow-lg">
              {/* Left side */}
              <div className="grid grid-cols-3">
                <div className="overflow-hidden col-span-1 w-[100px] h-[100px] bg-slate-400 rounded-full flex items-center justify-center mb-5 md:mb-0">
                  <Image
                    src={data?.avatar_url ?? ""}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                  />
                </div>

                <div className="col-span-2 md:flex justify-between  text-ellipsis">
                  <div>
                    <h2 className="text-lg font-semibold">{data?.name}</h2>
                    <p className="text-sm font-semibold text-blue-600 mb-6">
                      @{data.login}
                    </p>
                  </div>
                  <p className="text-slate-500 font-medium text-sm truncate">
                    Joined {new Date(data?.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Right side - User information */}
              <div>
                <p className="text-base font-medium text-slate-400 text-balance mb-6 overflow-hidden truncate">
                  {data?.bio ? (
                    <span>{data.bio}</span>
                  ) : (
                    <span>This profile has no bio</span>
                  )}
                </p>

                {/* Stats */}
                <div className="p-4 rounded-lg bg-slate-200 dark:bg-[#141c30] grid grid-cols-3 mb-6   shadow-md">
                  <div>
                    <p className="mb-2">Repo</p>
                    <p>
                      {data?.public_repos ? (
                        <span>{data?.public_repos}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Followers</p>
                    <p>
                      {data?.followers ? (
                        <span>{data?.followers}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">Following</p>
                    <p>
                      {data?.following ? (
                        <span>{data?.following}</span>
                      ) : (
                        <span>0</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-3 text-ellipsis ">
                  <div className="flex items-center gap-x-2 mb-2">
                    <MapPin />
                    <p className="truncate">
                      {data?.location ? (
                        <span>{data?.location}</span>
                      ) : (
                        <span className="text-base font-medium text-slate-400">
                          Not Available
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <Mail />
                    <p className="truncate">
                      {data?.email ? (
                        <span>{data?.email}</span>
                      ) : (
                        <span className="text-base font-medium text-slate-400">
                          Not Available
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <LinkIcon />
                    <Link href={data?.blog ?? "#"} className="truncate">
                      {data?.blog ? (
                        <span>{data?.blog}</span>
                      ) : (
                        <span className="text-base font-medium text-slate-400">
                          Not Available
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BuildingIcon />
                    <p className="truncate">
                      {data?.company ? (
                        <span>{data?.company}</span>
                      ) : (
                        <span className="text-base font-medium text-slate-400">
                          Not Available
                        </span>
                      )}
                    </p>
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
