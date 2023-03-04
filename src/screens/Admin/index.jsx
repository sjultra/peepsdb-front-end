import AdminWrapper from "./wrapper";
import { FaUserCheck, FaUserSlash } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { Flex, Box, Text, Select, Circle } from "@chakra-ui/react";
import useWidget from "../../hooks/useWidget";
import useTeams from "../../hooks/useTeams";
// import { useEffect } from "react";
// import { useRef } from "react";
import Spinner from '../../components/layouts/Spinner';
import { AiFillFire } from "react-icons/ai";
import TextInput from "../../widgets/Text";
import {BsClockHistory} from 'react-icons/bs'
import { useState } from "react";
import { TbFlag3 } from "react-icons/tb";
import {ActivityLogDetail, formatDateTimeString} from './audit'

const AdminDashboard = () => {

  const {profiles,logs,useFetchProfiles,useAppAudits,} = useTeams()

  const {loading,openModal,closeModal} = useWidget()
  
  // const [userLogs,setUserLogs] = useState({
  //   today:[],
  //   last2Days:[],
  //   lastWeeek:[],
  //   all:[]
  
  // })

  const [logLimit,setLogLimit] = useState('today')

  // const fetchAllProfilesRef = useRef(fetchAllProfiles);

  useFetchProfiles()
  
  useAppAudits(logLimit)

  if(loading) return(<Spinner full />)

  const totalAccounts = profiles?.filter(profile=>!profile?.isSuspended);
  
  const onboardedAccounts =  totalAccounts?.filter(profile=>profile?.profileSetup)

  const suspendedAccounts = profiles?.filter(profile=>profile?.isSuspended)

  const userLogEntry =logs || []


  console.log('user log',logs);

  return (
    <AdminWrapper>
      <Text className="archivo" fontSize={"25px"} fontWeight={500}>
        Dashboard
      </Text>

      <Text>
        You can now see all onboarding information of your organization.
      </Text>

      <Flex w="full" align={"center"} justify="space-between" mt={"20px"}>
        <Flex
          align={"center"}
          gap="20px"
          p={"15px"}
          border="1px solid #9EA2B1"
          borderRadius={"10px"}
          cursor={"pointer"}
        >
          <Box borderRadius={"50px"} p="20px" bgColor="#FBFAFF">
            <HiUsers className="svg" color="#3D7DFF" fontSize={"30px"} />
          </Box>
          <Box>
            <Text
              className="archivo"
              color={"#383C40"}
              fontSize="20.97px"
              fontWeight="700"
            >
              {totalAccounts?.length}
            </Text>
            <Text
              color={"#9EA2B1"}
              className="archivo"
              fontSize="15.87px"
              fontWeight="400"
            >
              Total accounts
            </Text>
          </Box>
        </Flex>

        <Flex
          align={"center"}
          gap="20px"
          p={"15px"}
          border="1px solid #9EA2B1"
          borderRadius={"10px"}
          cursor={"pointer"}
        >
          <Box borderRadius={"50px"} p="20px" bgColor="#FBFAFF">
            <FaUserCheck color="#4ECB71" fontSize={"30px"} />
          </Box>
          <Box>
            <Text
              className="archivo"
              color={"#383C40"}
              fontSize="20.97px"
              fontWeight="700"
            >
              {onboardedAccounts?.length}
            </Text>
            <Text
              color={"#9EA2B1"}
              className="archivo"
              fontSize="15.87px"
              fontWeight="400"
            >
              Onboarded accounts
            </Text>
          </Box>
        </Flex>

        <Flex
          align={"center"}
          gap="20px"
          p={"15px"}
          border="1px solid #9EA2B1"
          borderRadius={"10px"}
          cursor={"pointer"}
        >
          <Box borderRadius={"50px"} p="20px" bgColor="#FBFAFF">
            <FaUserSlash color="#E4746C" fontSize={"30px"} />
          </Box>
          <Box>
            <Text
              className="archivo"
              color={"#383C40"}
              fontSize="20.97px"
              fontWeight="700"
            >
              {suspendedAccounts?.length}
            </Text>
            <Text
              color={"#9EA2B1"}
              className="archivo"
              fontSize="15.87px"
              fontWeight="400"
            >
              Suspended accounts
            </Text>
          </Box>
        </Flex>
      </Flex>


      <Box border={'1px solid #E6E6E6'} borderTopRadius='5px' mt='2.5em' p={{base:'1em',lg:'1em 1.3em'}}>

        <Flex align='center'justify={'space-between'}>
            <Flex align='center' gap='0.3em'>
              <TextInput>What's hot</TextInput>
              <AiFillFire color='orange' fontSize={'20px'} />
            </Flex>

            <Select onClick={(e)=>setLogLimit(e.target.value)} maxW={'95px'}>
              <option value={'today'}>Today</option>
              <option value={'2days'}>Last 2 days</option>
              <option value='7days'>Last week</option>
              <option value={'1month'}>Last month</option>
              <option value={'all'}>All</option>
            </Select>
        </Flex>

        <Box mt='1em'>

          {logs?.map((logEntry,index)=>
          
            <Flex key={`${index}${Date.now()}`} justify='space-between' align='center' gap='0.8em'>
              <Flex align={'center'} gap='0.8em'>
                
                <Box>
                  <Circle bg='#F4F2FC' size={'40px'}>
                      <BsClockHistory color="var(--primary-color)" fontSize={'18px'}/>
                  </Circle>
                  <Flex justify={'center'}>
                    <Box h='40px' borderLeft='1px solid #D6D6D6'></Box>                    
                  </Flex>
                </Box>
                <Box>
                  <Text color='#9EA2B1' fontSize={'12px'} >{formatDateTimeString(logEntry?.createdAt)} </Text>
                  <Text mt='0.8em' fontSize={'15px'}> {logEntry?.description} </Text>
                </Box>

              </Flex>

              <Flex cursor={'pointer'} align={'center'} borderBottom={'1px solid transparent'} 
               _hover={{borderBottomColor:'var(--primary-color)'}}  gap='0.3em'
               onClick={()=>openModal({
                children:ActivityLogDetail,
                size:'2xl',
                payload:{
                  ...logEntry,
                  close:closeModal
                }
               })}
              >
                <TbFlag3 color='var(--primary-color)'  />

                <Text fontSize={'13px'} color='var(--primary-color)'>View Log</Text>

              </Flex>



                

            </Flex>
          
          )}

      </Box>

      </Box>
    </AdminWrapper>
  );
};

export default AdminDashboard;
