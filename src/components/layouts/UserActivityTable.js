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
          {body?.map((entry, index) => <ActivityRow key={index}  row={entry}  />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};


const ActivityRow = ({key,row})=>{

  const authWebhookTypes = ['login','Login','signup']

  const iconTypes = {
    ado:<SiAzuredevops color="#1982E2" />,
    jira:<SiJirasoftware color="#237FF9" />,
    sharepoint: <SiMicrosoftsharepoint color="#1982E2" />

  }

  row?.type?.includes('jira') && console.log('jira payload',JSON?.parse(row?.eventPayload));

  const displayEventType =({type,provider})=>{

    let isauthEventLog = authWebhookTypes.includes(type);
   
    let eventType = isauthEventLog? type: provider;

    let webhookEvent = isauthEventLog?'': type?.split(':')[1];

    let remove_ = webhookEvent?.includes('_')? webhookEvent?.split('_')?.join(' '):''; 

    return eventType + (remove_? `(${remove_})`:``)
    

  }

  return(
    <Tr key={key}>
      <Td py="2rem" color="gray.400">
        {formatDateTimeString(row?.createdAt)}
      </Td>
      <Td py="2rem">
        <HStack>
          {/** activity icon */}
          {Object.keys(iconTypes).map((entry,key)=>
            
            row?.type?.includes(entry)? <Box key={key}> {iconTypes[entry]} </Box>:undefined
            
          )  }

          <Text noOfLines={1} overflow="visible">
            {
              displayEventType({type:row?.type,provider:row?.provider})
            }
          </Text>
        </HStack>
      </Td>
      <Td py="2rem" color="gray.400">
        {row?.description}
      </Td>

    </Tr>


  )
}


export default UserActivityTable;
