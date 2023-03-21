import { Link } from "react-router-dom"
import Paginate from "../../widgets/Paginate"
import { Flex,VStack, Box, Grid, GridItem, Text } from "@chakra-ui/react"
import Spinner from '../layouts/Spinner'

const ADOProjectContent = ({ projects: projectsArr, search, workItems }) => {
  return (
    <Box pb={"100px"} mt="8">
    <Paginate
      payload={projectsArr}
      range={8}
      render={(projects) => (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="8">
          {projects &&
            projects
              .filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project, index) => {
                return (
                  <CustomCard
                    key={index}
                    name={project.name}
                    workItems={workItems}
                  />
                )
              })}
        </Grid>
      )}
    />
    </Box>
  )
}

// custom card
const CustomCard = ({ workItems, name }) => {
  return (
    <GridItem
      py={"6"}
      px={"8"}
      bg="#fcfcfc"
      border="1px solid #f7f7f7"
      _hover={{
        boxShadow: "sm",
      }}
      borderRadius={"10px"}
      gap="2">
      <Link to={`/ado_workitems/${name}`}>
        <VStack w="full" gap="8" align="left">
          <Text fontSize="2rem" fontWeight="semibold">{name}</Text>
          <Flex align="center" gap="4">
            <Flex fontWeight="semibold" color="var(--primary-color)" w="5rem" h="5rem" align="center" justify="center" borderRadius={"100px"} boxShadow="sm" p="6" bgColor="#ffffff">
              {workItems
                ? workItems.filter((item) => item.fields.teamProject === name)
                    .length
                : <Spinner fontSize={5}/>}
            </Flex>
            <Text fontSize="1.6rem">Work Items</Text>
          </Flex>
        </VStack>
      </Link>
    </GridItem>
  )
}

export default ADOProjectContent