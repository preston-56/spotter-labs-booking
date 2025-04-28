import { useState } from "react"
import { initialUsers } from "@/app/admin/mocks/data"
import { useToast } from "@/hooks/use-sonner"

export const useUsers = () => {
  const [users, setUsers] = useState(initialUsers)
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserCluster, setNewUserCluster] = useState("")
  const toast = useToast()

  const addUser = () => {
    const newUser = {
      id: (users.length + 1).toString(),
      name: newUserName,
      email: newUserEmail,
      cluster: newUserCluster,
    }
    setUsers([...users, newUser])
    setNewUserName("") // Reset the input
    setNewUserEmail("") // Reset the input
    setNewUserCluster("") // Reset the input
    toast.success("User added successfully")
  }

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
    toast.success("User deleted successfully")
  }

  return {
    users,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserCluster,
    setNewUserCluster,
    addUser,
    deleteUser,
  }
}
