import { useCallback, useEffect, useState } from "react";

export interface Direction {
  x: 1 | 0 | -1;
  y: 1 | 0 | -1;
}

export interface NonPlayerCharacter {
  id: number;
  position: { x: number; y: number };
  seqIndex: number;
  direction: Direction;
  move: boolean;
  isFriendly: boolean;
  life: number;
  color: string;
  textColor: string;
  mood: "sticky" | "wandering";
}

const initialNPCs: NonPlayerCharacter[] = [
  {
    id: 1,
    position: { x: 100, y: 100 },
    seqIndex: 0,
    direction: { x: 1, y: 0 },
    move: true,
    isFriendly: true,
    life: 1,
    color: "rgba(255, 0, 102, 1)",
    textColor: "salmon",
    mood: "sticky",
  },
  {
    id: 2,
    position: { x: 300, y: 300 },
    seqIndex: 0,
    direction: { x: 1, y: 0 },
    move: true,
    isFriendly: false,
    life: 3,
    color: "darkkhaki",
    textColor: "darkseagreen",
    mood: "wandering",
  },
];

export const useNPCsState = () => {
  const [npcs, setNpcs] = useState<NonPlayerCharacter[]>(initialNPCs);

  const addFoesNPC = useCallback(() => {
    if (npcs.length > 3) {
      return;
    }

    const newNPC: NonPlayerCharacter = {
      id: npcs.length + 1,
      position: {
        x: 300,
        y: 300,
      },
      seqIndex: 0,
      direction: { x: 1, y: 0 },
      move: true,
      isFriendly: false,
      life: 3,
      color: "darkkhaki",
      textColor: "darkseagreen",
      mood: "wandering",
    };
    setNpcs((prevNPCs) => [...prevNPCs, newNPC]);
  }, [npcs]);

  const addFriendlyNPC = useCallback(() => {
    if (npcs.some((npc) => npc.isFriendly) || npcs.length > 3) {
      return;
    }
    const newNPC: NonPlayerCharacter = {
      id: npcs.length + 1,
      position: { x: 100, y: 100 },
      seqIndex: 0,
      direction: { x: 1, y: 0 },
      move: true,
      isFriendly: true,
      life: 1,
      color: "rgba(255, 0, 102, 1)",
      textColor: "salmon",
      mood: "sticky",
    };
    setNpcs((prevNPCs) => [...prevNPCs, newNPC]);
  }, [npcs]);

  const attackNPC = (id: number) => {
    const npc = npcs.find((npc) => npc.id === id);
    if (!npc) {
      return;
    }
    if (npc.isFriendly) {
      return;
    }
    const updatedNPC = { life: npc.life - 1 };
    if (updatedNPC.life <= 0) {
      setNpcs((prevNPCs) => prevNPCs.filter((npc) => npc.id !== id));
    }
    updateNPC(id, updatedNPC);
  };

  const updateNPC = (id: number, updatedNPC: Partial<NonPlayerCharacter>) => {
    if (!npcs.some((npc) => npc.id === id)) {
      return;
    }
    setNpcs((prevNPCs) =>
      prevNPCs.map((npc) => (npc.id === id ? { ...npc, ...updatedNPC } : npc))
    );
  };

  const updateNPCs = (updatedNPCs: NonPlayerCharacter[]) => {
    setNpcs(updatedNPCs);
  };

  useEffect(() => {
    if (npcs.length > 3) {
      console.warn(`Too many NPCs on the screen, ${npcs.length}`);
      setNpcs(npcs.slice(0, 3));
    }
    return;
  }, [addFriendlyNPC, npcs]);

  const resetNPCs = () => {
    setNpcs(initialNPCs);
  };

  return {
    npcs,
    addFoesNPC,
    addFriendlyNPC,
    updateNPC,
    updateNPCs,
    attackNPC,
    resetNPCs,
  };
};
