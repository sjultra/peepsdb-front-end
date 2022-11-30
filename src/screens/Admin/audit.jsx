import { Box, Text } from "@chakra-ui/react"
import TableComponent from "../../components/layouts/Table"
import useTeams from "../../hooks/useTeams"
import { shortenText } from "../../utils/helpers"
import Btn from "../../widgets/Button"
import AdminWrapper from "./wrapper"



const Audit= ()=>{

    const {logs,useAppAudits,} = useTeams()

  
    // const fetchAllProfilesRef = useRef(fetchAllProfiles);
  
    
    useAppAudits('')

    console.log('audit control',logs);

    
    const userLogs = logs.map(log=>({
        user:
        
        (log?.user?.firstName || log?.user?.lastName)? `${log?.user?.firstName} ${log?.user?.lastName}`: log?.user?.alias,
        type:log?.type,
        createdAt:log?.createdAt?.slice(0,10),
        description:shortenText(log?.description,40),
        action:
            <Btn px='0.8em' bg='white' border={'1px solid #F2F2F2'} variant={'secondary'}>
                View
            </Btn>
    }))


    return(
        <AdminWrapper>

            <Text mt='0.6em' className="archivo" fontSize={"25px"} fontWeight={500}>
                Audit Trail
            </Text>

            <Text>
                View Recent Activities of users in PeepsDB
            </Text>

            <Box mt='2.2em'>
                <TableComponent bodyEntries={['user','type','createdAt','description','action']}  body={userLogs}   headers={['User','Type','Timestamp','Description','Action']} />
            </Box>

        </AdminWrapper>
    )
}

export default Audit