import { Mic, MicOff, X } from "lucide-react";

export interface newSinger {
  id: string;
  name: string;
}

type Props = {
  singer: newSinger;
  moveFirstToLast: () => void;
  removeSinger: (id: string) => void;
};

const CurrentSinger = ({ singer, moveFirstToLast, removeSinger }: Props) => {
  return (
    <div className="rounded-xl w-full p-4 flex">
      <p className="text-center text-3xl w-[80%] text-white">
        Agora é a vez de:{" "}
        <span className="text-bold text-red-700">
          {singer ? singer.name : "Fila Vazia"}
        </span>
      </p>
      <div className="w-[20%] flex items-center justify-end gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded-md p-2"
          onClick={moveFirstToLast}
        >
          <Mic className="text-white" />
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md p-2"
          onClick={moveFirstToLast}
        >
          <MicOff className="text-white" />
        </button>
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

export default CurrentSinger;
