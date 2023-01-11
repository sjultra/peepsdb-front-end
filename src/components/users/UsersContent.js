import React from 'react';
import styled from 'styled-components';
import { capitalizeString, renderJSX } from '../../utils/helpers';
import {
  Tbody,
  Tr,
  Td,
  // Button,
  Image,
  Flex,
  Text,
  Circle,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai';
import { formatDateTimeString } from '../../screens/Admin/audit';

import useWidget from '../../hooks/useWidget';
import {  UserOptions } from '../../screens/User';

const Item = styled.ul`
  display: grid;
  grid-template-columns: 0.26fr 0.34fr 0.2fr 0.2fr;
  grid-column-gap: 3rem;
  padding: 1.2rem 1rem 1.2rem 3rem;
  border-bottom: 1px solid #f1f1f1;
  /* min-width: 120rem; */
  font-size: 1.5rem;

  @media (max-width: 600px) {
    padding: 1.7rem 1rem 1.7rem 3rem;
  }

  @media (max-width: 500px) {
    padding: 1.7rem 1rem 1.7rem 1rem;
  }
`;

const Status = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StatusIndicator = styled.span`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-right: 0.6rem;
  background: ${(props) => (props.role === 'Guest' ? '#7f7f7f' : '#5e55ef')};
`;


const UsersContent = ({ profiles, filterText }) => {
  const filterUsers = (item) => {
    return (
      item?.firstName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.googleGmailId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.role.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const {openModal,closeModal} = useWidget()


  return (
      <Tbody>

        {
          profiles?.length?
            profiles.filter(filterUsers).map((profile, index) => {
              const { _id:user, avatar,firstName:firstname, lastName:lastname, title, role,createdAt } = profile;

              const fName = capitalizeString(firstname);
              const lName = capitalizeString(lastname);
              // const titleValue = title || 'Nil';
              
              const signedUp = formatDateTimeString(createdAt)
              return (
                  <Tr key={index}>
                    <Td py='0.9em'>
                        <Flex gap='0.5em' align='center'>
                          {
                            renderJSX(
                              avatar,
                              <Image width={'45px'} height='45px' borderRadius={'50%'} src={avatar} />,

                              <Circle border='1px solid var(--borders)' size='46px'>
                                <AiOutlineUser fontSize={'25px'}/>
                              </Circle>

                            )
                          }
                          <Text>
                            {fName && lName? 
                            <>{fName} {lName} </> : 'Nil'}
                          </Text>
                        </Flex>
                    </Td>
                    {/* <Td py='0.9em'>{title || 'Nil'}</Td> */}
                    <Td py={'0.9em'}>{role}</Td>
                    <Td py={'0.9em'}>{signedUp}</Td>
                    <Td py={'0.9em'}>
                        <Flex justify={'center'}>                        
                            <UserOptions user={profile} userlist/>
                        </Flex>   
                    </Td>
                    {/* <Td py='0.9em'>

                      <StatusIndicator role={role}></StatusIndicator>
                      <span>{role === 'Guest' ? 'Pending' : 'Active'}</span>

                    </Td> */}
                  </Tr>        
              );

            }):
          <h3>No user</h3>
        }


      </Tbody>


  );
};

export default UsersContent;
