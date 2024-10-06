"use client";
import CurrentSinger from "@/components/CurrentSinger";
import Singer from "@/components/Singer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [newsinger, setNewSinger] = useState<string>("");
  const [queue, setQueue] = useState<{ id: string; name: string }[]>(() => {
    const storedData = localStorage.getItem("singers");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleAddSinger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSinger(e.target.value);
  };

  const handleAddToQueue = () => {
    if (newsinger.trim() !== "") {
      const newItem = { id: uuidv4(), name: newsinger };
      const alteredQueue = [...queue, newItem];
      localStorage.setItem("queue", JSON.stringify(queue));
      setQueue(alteredQueue);
      localStorage.setItem("singers", JSON.stringify(alteredQueue));
      setNewSinger("");
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

  return (
    <div className="w-full h-screen container flex flex-col items-center justify-center gap-8">
      <CurrentSinger
        singer={queue[0]}
        moveFirstToLast={moveFirstToLast}
        removeSinger={removeSinger}
      />
      {queue.slice(1).map((singer) => {
        return (
          <Singer key={singer.id} singer={singer} removeSinger={removeSinger} />
        );
      })}
      <div className="flex gap-4 mt-7 w-full">
        <Input
          value={newsinger}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleAddSinger(e)}
          placeholder="Digite o nome do cantor"
        />
        <Button className="bg-blue-600" onClick={handleAddToQueue}>
          Colocar na fila
        </Button>
      </div>
    </div>
  );
}
