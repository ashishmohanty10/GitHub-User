"use client";
import React, { useEffect, useState } from "react";
// import { IoSunnyOutline } from "react-icons/io5";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, Syringe } from "lucide-react";
// import { LuMoonStar } from "react-icons/lu";

type Props = {};

export default function ThemeToggler({}: Props) {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {isMounted ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTheme(resolvedTheme === "light" ? "dark" : "light");
            }}
            className="text-2xl"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
