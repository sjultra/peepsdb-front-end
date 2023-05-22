import React from 'react';
import { capitalizeString, renderJSX } from '../../utils/helpers';
import { Tbody, Tr, Td, Image, Flex, Text, Circle } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { formatDateTimeString } from '../../screens/Admin/audit';

import { UserOptions } from '../UserProfile';

const UsersContent = ({ profiles, filterText }) => {
  const filterUsers = (item) => {
    return (
      item?.firstName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.lastName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.googleGmailId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.role.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  return (
    <Tbody>
      {profiles?.length ? (
        profiles.filter(filterUsers).map((profile, index) => {
          const {
            _id: user,
            avatar,
            firstName: firstname,
            lastName: lastname,
            title,
            role,
            createdAt,
          } = profile;

          const fName = capitalizeString(firstname);
          const lName = capitalizeString(lastname);
          // const titleValue = title || 'Nil';

          const signedUp = formatDateTimeString(createdAt);
          return (
            <Tr key={index}>
              <Td py="0.9em">
                <Flex gap="0.5em" align="center">
                  {renderJSX(
                    avatar,
                    <Image
                      width={'45px'}
                      height="45px"
                      borderRadius={'50%'}
                      src={avatar}
                    />,

                    <Circle border="1px solid var(--borders)" size="46px">
                      <AiOutlineUser fontSize={'25px'} />
                    </Circle>
                  )}
                  <Text>
                    {fName && lName ? (
                      <>
                        {fName} {lName}{' '}
                      </>
                    ) : (
                      'Nil'
                    )}
                  </Text>
                </Flex>
              </Td>
              {/* <Td py='0.9em'>{title || 'Nil'}</Td> */}
              <Td py={'0.9em'}>{role}</Td>
              <Td py={'0.9em'}>{signedUp}</Td>
              <Td py={'0.9em'}>
                <Flex justify={'center'}>
                  <UserOptions user={profile} userlist />
                </Flex>
              </Td>
              {/* <Td py='0.9em'>

                      <StatusIndicator role={role}></StatusIndicator>
                      <span>{role === 'Guest' ? 'Pending' : 'Active'}</span>

                    </Td> */}
            </Tr>
          );
        })
      ) : (
        <h3>No user</h3>
      )}
    </Tbody>
  );
};

export default UsersContent;
