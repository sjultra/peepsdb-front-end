import { FaUserCheck, FaUserSlash } from "react-icons/fa"
// import { AiFillFire } from "react-icons/ai"
// import { BsClockHistory } from "react-icons/bs"
// import { useState } from "react"
// import { TbFlag3 } from "react-icons/tb"
import { HiUsers } from "react-icons/hi"
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  // Select,
  // Circle,
} from "@chakra-ui/react"

import useWidget from "../../hooks/useWidget"
import useTeams from "../../hooks/useTeams"

import AdminAsideBar from "../../components/layouts/AdminAsideBar"
import Spinner from "../../components/layouts/Spinner"
import ActivityLogs from "../../components/logs/ActivityLogs"
// import { ActivityLogDetail, formatDateTimeString } from "./audit"


const AdminDashboard = () => {
  const { profiles,logs,  useFetchProfiles } = useTeams()

  const { loading,  } = useWidget()

  // const [userLogs,setUserLogs] = useState({
  //   today:[],
  //   last2Days:[],
  //   lastWeeek:[],
  //   all:[]

  // })


  // const [logLimit, setLogLimit] = useState("today")

  useFetchProfiles()

  // useAppAudits({ limit: logLimit, type: "" })

  if (loading) return <Spinner full />

  const totalAccounts = profiles?.filter((profile) => !profile?.isSuspended)

  const onboardedAccounts = totalAccounts?.filter(
    (profile) => profile?.profileSetup
  )

  const suspendedAccounts = profiles?.filter((profile) => profile?.isSuspended)

  // const userLogEntry = logs || [];

  console.log('logs from admin index',logs)

  return (
    <AdminAsideBar>
      <Text className="archivo" fontSize={"22"} fontWeight="semibold">
        Dashboard
      </Text>

      {/* <Text fontSize={"16"} color="gray.500">
        You can now see all onboarding information of your organization.
      </Text> */}

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        mt={"10"}
        gap="8"
      >
        <CustomStatisticCard
          title={"Total accounts"}
          color="#3D7DFF"
          account={totalAccounts}
        >
          <HiUsers className="svg" color="#3D7DFF" fontSize={"22"} />
        </CustomStatisticCard>

        <CustomStatisticCard
          title={"Onboarded accounts"}
          color="#4ECB71"
          account={onboardedAccounts}
        >
          <FaUserCheck color="#4ECB71" fontSize={"22"} />
        </CustomStatisticCard>

        <CustomStatisticCard
          title={"Suspended accounts"}
          color="#E4746C"
          account={suspendedAccounts}
        >
          <FaUserSlash color="#E4746C" fontSize={"22"} />
        </CustomStatisticCard>
      </Grid>

      {/** Activity logs */}

      <Box>
        <ActivityLogs logs={logs} _user={"admin"} />
      </Box>

 
    </AdminAsideBar>
  )
}

// custom card
const CustomStatisticCard = ({ title, children, account, color }) => {
  return (
    <GridItem>
      <Flex
        align={"center"}
        gap="8"
        py={"6"}
        px={"8"}
        bg="#fcfcfc"
        border="1px solid #f7f7f7"
        _hover={{
          boxShadow: "sm",
        }}
        borderRadius={"10px"}
        cursor={"pointer"}
      >
        <Box borderRadius={"50px"} boxShadow="sm" p="18px" bgColor="#ffffff">
          {children}
        </Box>
        <Box>
          <Text align="left" color={color} fontSize="20.97px" fontWeight="700">
            {account?.length}
          </Text>
          <Text
            color={"#9EA2B1"}
            className="archivo"
            fontSize="15.87px"
            fontWeight="400"
          >
            {title}
          </Text>
        </Box>
      </Flex>
    </GridItem>
  )
}

export default AdminDashboard
