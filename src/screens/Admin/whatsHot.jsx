

const WhatsHot = ()=>{
    
    <>
    

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

    </>
}