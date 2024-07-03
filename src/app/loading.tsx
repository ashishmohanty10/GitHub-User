import { Loader2Icon } from "lucide-react";
import React from "react";

const LoaderComponent = () => {
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default LoaderComponent;
