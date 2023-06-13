import { Link } from "react-router-dom"
import Paginate from "../../widgets/Paginate"
import { VStack, Box, Grid, GridItem, Text, Circle, Flex } from "@chakra-ui/react"
import useWidget from "../../hooks/useWidget"

const ADOProjectContent = ({ projects: projectsArr, search, workItems }) => {


  return (
    <Box pb={"100px"} mt="8">
      <Paginate
        payload={projectsArr}
        range={12}
        render={(projects) =>(
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
                ).map((project, index) => {
                  return (
                    <CustomCard
                      key={index}
                      project={project}
                      // workItems={workItems}
                    />
                  )
                })}
          </Grid>
          )
      }
      />
    </Box>
  )
}

// custom card
const CustomCard = ({ project }) => {

  const {name,provider} = project;  

  const link = provider==='ado'?'ado_workitems':'jira_issues';

  const {icons} = useWidget()

  const iconObject = icons('26px');

  const providerText = provider==='jira'?'Jira':'ADO'

  return (
    <GridItem
      py={"6"}
      px={"8"}
      // bg="#fcfcfc"
      border="1px solid #f7f7f7"
      _hover={{
        boxShadow: "sm",
      }}
      borderRadius={"10px"}
      gap="2">
      <Link to={`/${link}/${name}`}>
        <VStack w="full" gap="8" align="left">
          <Flex gap='1em' align='center'>
            <Circle size="45px" bg='#FBFAFF'>{iconObject[provider]}</Circle>

            <Box>
              <Text fontSize="2rem" fontWeight="semibold">
                {name}
              </Text>
              <Text fontWeight={400} fontSize={'14px'}  color='#9EA2B1' mt='1em'>
                {providerText} 
              </Text>
            </Box>
          </Flex>
          {/* <Flex align="center" gap="4">
            <Flex fontWeight="semibold" color="var(--primary-color)" w="5rem" h="5rem" align="center" justify="center" borderRadius={"100px"} boxShadow="sm" p="6" bgColor="#ffffff">
              {workItems
                ? workItems.filter((item) => item.fields.teamProject === name)
                    .length
                : <Spinner fontSize={5}/>}
            </Flex>
            <Text fontSize="1.6rem">Work Items</Text>
          </Flex> */}
        </VStack>
      </Link>
    </GridItem>
  )
}

export default ADOProjectContent