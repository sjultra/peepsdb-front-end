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
} from "@chakra-ui/react";
import { SiAzuredevops, SiJirasoftware, SiMicrosoftsharepoint } from "react-icons/si";


const UserActivityTable = ({
  children,
  paginate,
  limit,
  headers,
  body,
  renderBody,
  bodyEntries,
}) => {
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
                  {entry?.date}
                </Td>
                <Td py="2rem">
                  <HStack>
                    {/** activity icon */}
                    {entry?.activity.type === "azure" ? (
                      <SiAzuredevops color="#1982E2" />
                    ) : entry?.activity.type === "jira" ? (
                      <SiJirasoftware color="#237FF9" />
                    ) : (
                      <SiMicrosoftsharepoint color="#1982E2" />
                    )}

                    <Text noOfLines={1} overflow="visible">{entry?.activity.value}</Text>
                  </HStack>
                </Td>
                <Td py="2rem" color="gray.400">
                  {entry?.event}
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
