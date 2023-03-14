import React from "react"
import { Link } from "react-router-dom"
import { FaRegUser } from "react-icons/fa"
import {
  Flex,
  Text,
  Stack,
  VStack,
  Avatar,
  Box,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Link as LinkChakra,
} from "@chakra-ui/react"
import { FiEdit } from "react-icons/fi"

const ProfileInfo = ({ profile }) => {
  // custom colSpan breakpoint
  const colSpan = useBreakpointValue({ base: 2, md: 1, lg: 1 })
  // destructure user infos
  const {
    firstName: firstname,
    lastName: lastname,
    alias,
    avatar,
    skypeId,
    googleGmailId,
    appleEmailId,
    phone,
    timeZoneUrl,
    daysPerWeek,
    hoursPerDay,
    localCurrencyUrl,
    femSlackProfileUrl,
    startDate,
    paymentProfileUrl,
    twitterProfileUrl,
    facebookProfileUrl,
    githubProfileUrl,
    linkedinProfileUrl,
    calendlyProfileUrl,
  } = profile || {}

  return (
    <Box>
      <Box
        as="div"
        w="100%"
        h="auto"
        border="1px"
        pb="20px"
        borderColor="gray.200"
        borderRadius={15}
        overflow="hidden">
        {/** banner section */}
        <Box
          as="div"
          w="100%"
          h="160px"
          bg="var(--primary-color)"
          borderRadius={15}></Box>
        <Box as="div" px={["20px", "40px", "40px"]} mt={-20}>
          <Box
            as="div"
            border="1px"
            borderColor="gray.200"
            borderRadius="100px"
            w="fit-content">
            {avatar ? (
              <Avatar
              name={`${firstname} ${lastname}`}
              size="2xl"
              src={`${avatar}`}
              />
              ) : (
                <Avatar
                size="2xl"
                color="gray.500"
                bg="gray.50"
                icon={<FaRegUser />}
              />
            )}
          </Box>
          <Stack
            direction="row"
            justify="space-between"
            alignItems="center"
            mt="20px">
            <VStack flex="1" alignItems="flex-start">
              <Text noOfLines={1} fontSize={["16", "20"]} fontWeight="semibold">
                {firstname} {lastname}
              </Text>
              <Text
                noOfLines={1}
                fontSize="14"
                fontWeight="medium"
                color="gray.500">
                {alias ? alias : ""}
              </Text>
            </VStack>
            <Box>
              <Link to="/edit-profile">
                <Flex
                  p="0.4em 1em"
                  borderRadius={"6px"}
                  color={"white"}
                  gap="0.5em"
                  bg="var(--primary-color)"
                  alignItems={"center"}
                  justify={"center"}>
                  <Text fontSize={"14"}> Edit Profile</Text>
                  <FiEdit fontSize={"17"} />
                </Flex>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
      {/** user details section */}
      <Box px={["20px", "40px", "40px"]} pb="40px" mt={20}>
        <SimpleGrid columns={2} columnGap={1} rowGap={8}>
          <InfoItem colSpan={colSpan} title={"Firstname"} value={firstname} />
          <InfoItem colSpan={colSpan} title={"Lastname"} value={lastname} />
          <InfoItem colSpan={colSpan} title={"Alias"} value={alias} />
          <InfoItem colSpan={colSpan} title={"SkypeId"} value={skypeId} />
          <InfoItem
            colSpan={colSpan}
            title={"Google Gmail Id"}
            value={googleGmailId}
          />
          <InfoItem
            colSpan={colSpan}
            title={"Apple Email Id"}
            value={appleEmailId}
          />
          <InfoItem colSpan={colSpan} title={"Phone"} value={phone} />
          <LinkItem
            colSpan={colSpan}
            title={"Time Zone Url"}
            link={timeZoneUrl}
          />
          <InfoItem
            colSpan={colSpan}
            title={"Days Per Week"}
            value={daysPerWeek}
          />
          <InfoItem
            colSpan={colSpan}
            title={"Hours Per Day"}
            value={hoursPerDay}
          />
          <LinkItem
            colSpan={colSpan}
            title={"Local Currency Url"}
            link={localCurrencyUrl}
          />
          <LinkItem
            colSpan={colSpan}
            title={"FEM Slack Profile Url"}
            link={femSlackProfileUrl}
          />
          <InfoItem colSpan={colSpan} title={"Start Date"} value={startDate} />
          <LinkItem
            colSpan={colSpan}
            title={"Payment Profile Url"}
            link={paymentProfileUrl}
          />
          <LinkItem
            colSpan={colSpan}
            title={"Twitter Profile Url"}
            link={twitterProfileUrl}
          />
          <LinkItem
            colSpan={colSpan}
            title={"Facebook Profile Url"}
            link={facebookProfileUrl}
          />
          <LinkItem
            colSpan={colSpan}
            title={"Github Profile Url"}
            link={githubProfileUrl}
          />
          <LinkItem
            colSpan={colSpan}
            title={"Linkedin Profile Url"}
            link={linkedinProfileUrl}
          />
          <LinkItem
            colSpan={colSpan}
            title={"Calendly Profile Url"}
            link={calendlyProfileUrl}
          />
        </SimpleGrid>
      </Box>
    </Box>
  )
}

// display link user info
const LinkItem = ({ title, link, colSpan }) => {
  return (
    <GridItem colSpan={colSpan}>
      <Text color="gray.500">{title}</Text>
      {link ? (
        <LinkChakra
          href={link}
          fontWeight="semibold"
          color="var(--primary-color)"
          isExternal>
          {link}
        </LinkChakra>
      ) : (
        ""
      )}
    </GridItem>
  )
}

// display simple user info
const InfoItem = ({ title, value, colSpan }) => {
  return (
    <GridItem colSpan={colSpan}>
      <Text color="gray.500">{title}</Text>
      <Text fontWeight="semibold">
        {value ? value : ""}
      </Text>
    </GridItem>
  )
}

export default ProfileInfo