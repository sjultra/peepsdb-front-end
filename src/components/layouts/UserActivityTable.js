import React from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
  Tbody,
  HStack,
  Text,
  Td,
  Box,
} from "@chakra-ui/react";
import { SiAzuredevops, SiJirasoftware, SiMicrosoftsharepoint } from "react-icons/si";
import { formatDateTimeString } from "../../screens/Admin/audit";


const UserActivityTable = ({
  children,
  paginate,
  limit,
  headers,
  body,
  renderBody,
  bodyEntries,
}) => {


  const iconTypes = {
    ado:<SiAzuredevops color="#1982E2" />,
    jira:<SiJirasoftware color="#237FF9" />,
    sharepoint: <SiMicrosoftsharepoint color="#1982E2" />

  }

 
  return (
    <TableContainer mt="1em">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            {headers.map((headerEntry, index) => (
              <Th py="0.8em" key={index} fontSize={"14px"}>
                {headerEntry}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {body?.map((entry, index) => {
            return (
              <Tr key={index}>
                <Td py="2rem" color="gray.400">
                  {formatDateTimeString(entry?.createdAt)}
                </Td>
                <Td py="2rem">
                  <HStack>
                    {/** activity icon */}
                    {Object.keys(iconTypes).map(entry=>
                      (entry,index)=>
                      
                      entry?.type?.includes(entry)? <Box key={entry}> {iconTypes[entry]} </Box>:undefined
                      
                    )  }

                    <Text noOfLines={1} overflow="visible">
                      {
                        entry?.type
                      }
                    </Text>
                  </HStack>
                </Td>
                <Td py="2rem" color="gray.400">
                  {entry?.description}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserActivityTable;
