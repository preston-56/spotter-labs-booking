import { useState } from "react"
import { initialWorkstations } from "@/app/admin/mocks/data"
import { useToast } from "@/hooks/use-sonner"

export const useWorkstations = () => {
  const [workstations, setWorkstations] = useState(initialWorkstations)
  const [newWorkstationName, setNewWorkstationName] = useState("")
  const [newWorkstationFloor, setNewWorkstationFloor] = useState("")
  const [newWorkstationHotDesks, setNewWorkstationHotDesks] = useState(0)
  const toast = useToast()

  const addWorkstation = () => {
    const newWorkstation = {
      id: (workstations.length + 1).toString(),
      name: newWorkstationName,
      floor: newWorkstationFloor,
      hotDesks: newWorkstationHotDesks,
    }
    setWorkstations([...workstations, newWorkstation])
    setNewWorkstationName("") // Reset the input
    setNewWorkstationFloor("") // Reset the input
    setNewWorkstationHotDesks(0) // Reset the input
    toast.success("Workstation added successfully")
  }

  const deleteWorkstation = (id: string) => {
    setWorkstations(workstations.filter((workstation) => workstation.id !== id))
    toast.success("Workstation deleted successfully")
  }

  return {
    workstations,
    newWorkstationName,
    setNewWorkstationName,
    newWorkstationFloor,
    setNewWorkstationFloor,
    newWorkstationHotDesks,
    setNewWorkstationHotDesks,
    addWorkstation,
    deleteWorkstation,
  }
}
