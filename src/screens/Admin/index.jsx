import { FaUserCheck, FaUserSlash } from "react-icons/fa"
import { AiFillFire } from "react-icons/ai"
import { BsClockHistory } from "react-icons/bs"
import { useState } from "react"
import { TbFlag3 } from "react-icons/tb"
import { HiUsers } from "react-icons/hi"
import {
  Flex,
  Box,
  Grid,
  GridItem,
  Text,
  Select,
  Circle,
} from "@chakra-ui/react"

import useWidget from "../../hooks/useWidget"
import useTeams from "../../hooks/useTeams"

import AdminAsideBar from "../../components/layouts/AdminAsideBar"
import Spinner from "../../components/layouts/Spinner"
import ActivityLogs from "../../components/logs/ActivityLogs"
import { ActivityLogDetail, formatDateTimeString } from "./audit"

import TextInput from "../../widgets/Text"

const AdminDashboard = () => {
  const { profiles, logs, useFetchProfiles, useAppAudits } = useTeams()

  const { loading, openModal, closeModal } = useWidget()

  // const [userLogs,setUserLogs] = useState({
  //   today:[],
  //   last2Days:[],
  //   lastWeeek:[],
  //   all:[]

  // })

  const [logLimit, setLogLimit] = useState("today")

  useFetchProfiles()

  useAppAudits({ limit: logLimit, type: "" })

  if (loading) return <Spinner full />

  const totalAccounts = profiles?.filter((profile) => !profile?.isSuspended)

  const onboardedAccounts = totalAccounts?.filter(
    (profile) => profile?.profileSetup
  )

  const suspendedAccounts = profiles?.filter((profile) => profile?.isSuspended)

  const userLogEntry = logs || []

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
        <ActivityLogs _user={"admin"} />
      </Box>

      <Box
        border={"1px solid #f7f7f7"}
        borderTopRadius="5px"
        mt="2.5em"
        p="2rem"
      >
        <Flex align="center" justify={"space-between"}>
          <Flex align="center" gap="0.3em">
            <TextInput>What's hot</TextInput>
            <AiFillFire color="orange" fontSize={"20px"} />
          </Flex>

          <Select
            onClick={(e) => setLogLimit(e.target.value)}
            maxW={"100px"}
            outlineColor="none"
          >
            <option value={"today"}>Today</option>
            <option value={"2days"}>Last 2 days</option>
            <option value="7days">Last week</option>
            <option value={"1month"}>Last month</option>
            <option value={"all"}>All</option>
          </Select>
        </Flex>

        <Box mt="2em">
          {logs?.map((logEntry, index) => (
            <Box key={`${index}${Date.now()}`} mb={{ base: "4", md: "0" }}>
              <Flex align={"start"} gap="0.8em">
                {/** circle */}
                <Box>
                  <Circle
                    bg="#fcfcfc"
                    border={"1px solid #f7f7f7"}
                    size={"40px"}
                  >
                    <BsClockHistory
                      color="var(--primary-color)"
                      fontSize={"18px"}
                    />
                  </Circle>
                  <Flex justify={"center"}>
                    <Box h="40px" borderLeft="1px solid #f7f7f7"></Box>
                  </Flex>
                </Box>
                {/** content */}
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap={{ base: "2", md: "4", lg: "8" }}
                  flex="1"
                  justify="space-between"
                >
                  <Box>
                    <Text color="#9EA2B1" fontSize={"12px"}>
                      {formatDateTimeString(logEntry?.createdAt)}
                    </Text>
                    <Text noOfLines={[2, 3, 4]} fontSize={"15px"}>
                      {logEntry?.description}
                    </Text>
                  </Box>
                  <Flex
                    cursor={"pointer"}
                    align={"center"}
                    borderBottom={"1px solid transparent"}
                    _hover={{ borderBottomColor: "var(--primary-color)" }}
                    gap="0.3em"
                    onClick={() =>
                      openModal({
                        children: ActivityLogDetail,
                        size: "2xl",
                        payload: {
                          ...logEntry,
                          close: closeModal,
                        },
                      })
                    }
                  >
                    <TbFlag3 color="var(--primary-color)" />

                    <Text fontSize={"13px"} color="var(--primary-color)">
                      View Log
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Box>
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
