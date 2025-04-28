import { useState } from "react";
import { initialFloors } from "@/app/admin/mocks/data";
import { useToast } from "@/hooks/use-sonner";

export const useFloors = () => {
  const [floors, setFloors] = useState(initialFloors);
  const [newFloorName, setNewFloorName] = useState("");
  const toast = useToast();

  const addFloor = () => {
    const newFloor = {
      id: (floors.length + 1).toString(),
      name: newFloorName
    };
    setFloors([...floors, newFloor]);
    setNewFloorName(""); // Reset the input
    toast.success("Floor added successfully");
  };

  const deleteFloor = (id: string) => {
    setFloors(floors.filter((floor) => floor.id !== id));
    toast.success("Floor deleted successfully");
  };

  return {
    floors,
    newFloorName,
    setNewFloorName,
    addFloor,
    deleteFloor
  };
};
