import UsersScreen from "./UsersScreen"
import AdminAsideBar from "../../components/layouts/AdminAsideBar"
import useAuthActions from "../../hooks/useAuth"
import WorkerAsideBar from "../../components/layouts/WorkerAsideBar"
import Spinner from "../../components/layouts/Spinner"
import { Flex } from "@chakra-ui/react"
import MongoChart from "./mongochart"

const Teams = () => {
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
        {/* <MongoChart filter={{}} height={'500px'} width={'100%'}/> */}

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


const Chart = ()=>{
  return(
    <>
    
    </>
  )
}

export default Teams