import { Sun, MoonStar } from "lucide-react";
import React from "react";

const App = () => {
  return (
    <>
      <div className="flex flex-col bg-stone-100 min-h-screen w-full">
        {/* container */}
        <div className="border rounded mx-auto w-full max-w-[600px] p-2 flex flex-col gap-8">
          <section className="flex justify-between items-center">
            <p className="font-secondarFont text-2xl font-bold">devfinder</p>
            <div className="flex justify-between items-center gap-x-1">
              <p>Light</p>
              <MoonStar strokeWidth={1.25} />
            </div>
          </section>

          {/* search */}

          <form action="">
            <input type="text" className="w-full p-2" />
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
