import { Mic, MicOff, X } from "lucide-react";
import React from "react";
import { newSinger } from "./CurrentSinger";

type Props = {
  singer: newSinger;
  removeSinger: (id: string) => void;
};
const Singer = ({ singer, removeSinger }: Props) => {
  return (
    <div className="w-full flex items-center justify-center rounded-lg p-3 bg-slate-600 text-white uppercase hover:bg-slate-200 hover:text-slate-600">
      <div className="w-[80%] text-2xl">{singer.name}</div>
      <div className="w-[20%] flex items-center justify-end gap-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white  rounded-md p-2"
          onClick={() => removeSinger(singer.id)}
        >
          <X className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Singer;
