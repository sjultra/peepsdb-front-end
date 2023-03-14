import React from "react"
import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { GrFilter } from "react-icons/gr"
import { Flex, Box, Text, Stack, Select, HStack } from "@chakra-ui/react"
import WorkerAsideBar from "../components/layouts/WorkerAsideBar"
import UserActivityTable from "../components/layouts/UserActivityTable"
import {  useLocation, useHistory } from 'react-router-dom'
import { useEffect } from "react"

const WorkerWorkspacesScreen = () => {
  //hooks
  const router = useHistory()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  // states
  const [logLimit, setLogLimit] = useState("today")
  const [activityTab, setActivityTab] = useState(params.get("activity"))
  const [filterText, setFilterText] = useState("")
  const [activitiesToDisplay, setActivitiesToDisplay] =
    useState(activitiesArray)

  // change tab
  const changeTab = (tab) => {
    setActivityTab((prev) => (prev = tab))
    router.push(`/worker/workspaces?activity=${tab}`)
  }

  useEffect(() => {
    // avoid wrong activity param
    const selected =
      activityTab !== "all" &
      activityTab !== "jira" &
      activityTab !== "azure" &
      activityTab !== "sharepoint"
        ? "all"
        : activityTab
    setActivityTab(selected)
    
    if(selected === "all"){
      setActivitiesToDisplay(activitiesArray)
    }else{
      const getActivities = activitiesArray.filter((item)=>item.activity.type === selected)
      setActivitiesToDisplay(getActivities)
    }

  }, [activityTab])

  return (
    <WorkerAsideBar>
      {/**Filter by date */}
      <Stack
        direction="row"
        justify="space-between"
        bg="#f8f7ff"
        px="6"
        py="6"
        mt="20px">
        <Text
          noOfLines={1}
          fontSize="18"
          fontWeight="semibold"
          color="gray.900">
          {"Activity log"}
        </Text>
        <Box>
          <Flex gap="0.6em" align="center">
            <GrFilter fontSize={"18px"} />
            <Select
              fontSize={"14px"}
              onClick={(e) => setLogLimit(e.target.value)}
              maxW={"100px"}>
              <option value={"today"}>Today</option>
              <option value={"2days"}>Last 2 days</option>
              <option value="7days">Last week</option>
              <option value={"1month"}>Last month</option>
              <option value={"all"}>All</option>
            </Select>
          </Flex>
        </Box>
      </Stack>
      {/**Filter by searching */}
      <Box overflow={"auto"}>
        <Stack
          direction={{ base: "column", md: "row", lg: "row" }}
          mt="8"
          w="full"
          justify={"space-between"}
          align="center"
          gap="4">
          <HStack
            w={{ base: "full", md: "auto", lg: "auto" }}
            border="1px"
            px={{ base: "4", md: "6", lg: "8" }}
            gap={{ base: "8", md: "12", lg: "16" }}
            fontSize={"2xl"}
            borderColor="gray.100">
            <CustumTab
              title="All"
              tab="all"
              selectedTab={activityTab}
              action={changeTab}
            />
            <CustumTab
              title="Azure Devops"
              tab="azure"
              selectedTab={activityTab}
              action={changeTab}
            />
            <CustumTab
              title="Sharepoint"
              tab="sharepoint"
              selectedTab={activityTab}
              action={changeTab}
            />
            <CustumTab
              title="Jira"
              tab="jira"
              selectedTab={activityTab}
              action={changeTab}
            />
          </HStack>
          <HStack
            w={{ base: "full", md: "auto", lg: "auto" }}
            bg="#f8f7ff"
            borderRadius="full"
            px="1.8rem"
            py="0.5rem"
            h="fit-content">
            <BiSearch />
            <input
              type="text"
              style={{
                outline: "0",
                color: "#333",
                padding: "0.6rem",
                backgroundColor: "transparent",
              }}
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </HStack>
        </Stack>
        {/** displaying activities -> all | Azure | sharepoint | jira */}
        <Box
          mt="8"
          w={{
            base: "calc(100vw - 6rem)",
            md: "calc(100vw - 4rem)",
            lg: "calc(100vw - 22vw)",
          }}>
          <UserActivityTable
            body={activitiesToDisplay}
            headers={["Date", "Activvity", "Event"]}
          />
        </Box>
      </Box>
    </WorkerAsideBar>
  );
}

// custom tab
const CustumTab = ({ title, tab, selectedTab , action}) => {
  return (
    <Box
      onClick={() => action(tab)}
      py="6"
      borderBottomWidth="2px"
      color={`${selectedTab === tab ? "var(--primary-color)" : "gray.400"}`}
      cursor={"pointer"}
      borderColor={`${
        selectedTab === tab ? "var(--primary-color)" : "transparent"
      }`}>
      <Text noOfLines={1}> {title} </Text>
    </Box>
  );
}

export default WorkerWorkspacesScreen


// datas for testing
const activitiesArray = [
  {
    date: "23/Aug/23 2:15pm",
    activity: {
      type: "azure",
      value: "Develop peepsdb admin interface",
    },
    event: "comment on",
  },
  {
    date: "23/Aug/23 2:15pm",
    activity: {
      type: "sharepoint",
      value: "update Dockefile",
    },
    event: "Updated",
  },
  {
    date: "23/Aug/23 2:15pm",
    activity: {
      type: "azure",
      value: "fix not displau bug",
    },
    event: "creating issue",
  },
  {
    date: "23/Aug/23 2:15pm",
    activity: {
      type: "jira",
      value: "dev UI app",
    },
    event: "comment on",
  },
]