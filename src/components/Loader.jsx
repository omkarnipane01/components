import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({ text = "" }) => {
  return (
    <div className="flex item-center text-sm">
      <Loader2 size={22} className="mr-2 animate-spin text-blue-400" />
      {text}
    </div>
  );
};

export default Loader;
