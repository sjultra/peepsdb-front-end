import UsersScreen from "./UsersScreen"
import AdminAsideBar from "./AdminAsideBar"
import useAuthActions from "../../hooks/useAuth"
import WorkerAsideBar from "../../components/layouts/WorkerAsideBar"
import Spinner from "../../components/layouts/Spinner"
import { Flex } from "@chakra-ui/react"

const AdminUsers = () => {
  // Selectors
  const { auth, loading, profile } = useAuthActions()

  // spinner
  if (loading || !profile) {
    return (
      <Flex
        position={"fixed"}
        w="100vw"
        h="100vh"
        align={"center"}
        justify="center"
        top={0}
        left={0}
      >
        <Spinner />
      </Flex>
    )
  }

  // return teams members with custom admin aside bar
  if (auth?.token && auth?.role === "Admin") {
    return (
      <AdminAsideBar>
        <UsersScreen />
      </AdminAsideBar>
    )
  }

  // return teams members with custom worker aside bar
  return (
    <WorkerAsideBar>
      <UsersScreen />
    </WorkerAsideBar>
  )
}

export default AdminUsers
