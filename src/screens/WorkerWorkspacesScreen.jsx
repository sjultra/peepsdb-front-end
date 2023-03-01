import React from "react";
import { useState } from "react";
import { GrFilter } from "react-icons/gr";
import { Flex, Box, Text, Stack, Select, HStack } from "@chakra-ui/react";
import WorkerWrapper from "./WorkerWrapper";

const WorkerWorkspacesScreen = () => {
  const [logLimit, setLogLimit] = useState("today");
  const [activityTab, setActivityTab] = useState("all");

  // change tab
  const changeTab =(tab)=>{
    setActivityTab(tab)
  }
  return (
    <WorkerWrapper>
      {/**Filter bu data */}
      <Stack
        direction="row"
        justify="space-between"
        alignItems="center"
        bg="gray.50"
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
      <Stack direction="row" mt="8" justify={"space-between"}>
        <HStack border="1px" fontSize={"2xl"} borderColor="gray.100">
          <CustumTab title="All" tab="all" selectedTab={activityTab} action={changeTab} />
          <CustumTab title="Azure Devops" tab="azure" selectedTab={activityTab} action={changeTab} />
          <CustumTab title="Sharepoint" tab="sharepoint" selectedTab={activityTab} action={changeTab} />
          <CustumTab title="Jira" tab="jira" selectedTab={activityTab} action={changeTab} />
        </HStack>
        <Box>lol</Box>
      </Stack>
    </WorkerWrapper>
  );
};

export default WorkerWorkspacesScreen;

const CustumTab = ({ title, tab, selectedTab, action }) => {
  return (
    <Box
     onClick={()=>action(tab)}
      py="6"
      px="16"
      borderBottomWidth="2px"
      color={`${selectedTab === tab ? "var(--primary-color)" : "gray.400"}`}
      cursor={"pointer"}
      borderColor={`${selectedTab === tab ? "var(--primary-color)" : "transparent"}`}>
      {title}
    </Box>
  );
};
