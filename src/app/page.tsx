"use client";
import CurrentSinger from "@/components/CurrentSinger";
import Singer from "@/components/Singer";
import Toast from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [newsinger, setNewSinger] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [queue, setQueue] = useState<{ id: string; name: string }[]>([
    {
      id: "0",
      name: "Fila Vazia",
    },
  ]);

  useEffect(() => {
    const storedData = localStorage.getItem("singers");
    if (storedData) {
      setQueue(JSON.parse(storedData));
    }
  }, []);

  const handleAddSinger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSinger(e.target.value);
  };

  const handleAddToQueue = () => {
    if (newsinger.trim() !== "") {
      const duplicateName = queue.some((item) => item.name === newsinger);
      if (duplicateName) {
        setError("Nome já existe na lista");
        console.log(error);
        return;
      }
      const newItem = { id: uuidv4(), name: newsinger };
      const alteredQueue = [...queue!, newItem];
      localStorage.setItem("queue", JSON.stringify(queue));
      setQueue(alteredQueue);
      localStorage.setItem("singers", JSON.stringify(alteredQueue));
      setNewSinger("");
      console.log(error);
    }
  };

  const moveFirstToLast = () => {
    setQueue((prevData) => {
      if (prevData.length > 0) {
        const [firstItem, ...rest] = prevData;
        const newQueue = [...rest, firstItem];
        localStorage.setItem("singers", JSON.stringify(newQueue));
        return newQueue;
      }
      return prevData;
    });
  };

  const removeSinger = (id: string) => {
    const updatedData = queue.filter((singer) => singer.id !== id);
    setQueue(updatedData);
    localStorage.setItem("singers", JSON.stringify(updatedData));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddToQueue();
    }
  };

  const closeToast = () => {
    setError("");
  };

  return (
    <>
      {error != "" ? <Toast close={closeToast} /> : null}
      <div className="w-full min-h-[50%] container flex flex-col items-center justify-center gap-8 bg-slate-900 mx-auto p-6 rounded-xl">
        <CurrentSinger
          singer={queue[0]}
          moveFirstToLast={moveFirstToLast}
          removeSinger={removeSinger}
        />
        <div className="overflow-y-auto w-full flex gap-4 flex-col">
          {queue.slice(1).map((singer) => {
            return (
              <Singer
                key={singer.id}
                singer={singer}
                removeSinger={removeSinger}
              />
            );
          })}
        </div>
        <div className="flex gap-4 mt-7 w-full">
          <Input
            className="p-8 bg-slate-400 border-0 text-2xl placeholder:text-2xl"
            value={newsinger}
            onKeyDown={handleKeyDown}
            onChange={(e) => handleAddSinger(e)}
            placeholder="Digite o nome do cantor"
          />
          <Button
            className="bg-slate-600 p-8 text-2xl hover:bg-red-700 "
            onClick={handleAddToQueue}
          >
            Colocar na fila
          </Button>
        </div>
      </div>
    </>
  );
}
