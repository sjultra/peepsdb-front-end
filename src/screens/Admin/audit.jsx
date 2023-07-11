import { Box, Flex, Select, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { GrFilter } from 'react-icons/gr';
import TableComponent from '../../components/layouts/Table';
import useTeams from '../../hooks/useTeams';
import useWidget from '../../hooks/useWidget';
import { shortenText } from '../../utils/helpers';
import Btn from '../../widgets/Button';
import AdminAsideBar from '../../components/layouts/AdminAsideBar';
import moment from 'moment';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

export const ActivityLogDetail = (payload) => {
  const { user, type, description, createdAt, deviceData, close } = payload;

  const history = useHistory();

  const goToProfile = () => {
    close();
    history.push(`/teams/user/${user?._id}`);
  };

  return (
    <Box bg="white" p="2em 1em">
      <Text fontSize={'18px'} fontWeight={500}>
        Activity Log
      </Text>

      <Box mt="1.5em">
        <Flex
          mt="1.3em"
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
          justify={'space-between'}
        >
          <Text fontSize={'15px'} fontWeight={500}>
            User{' '}
          </Text>

          <Flex gap={'0.5em'} align="center">
            <Text fontSize={'13px'}> {logUserLabel(user)} </Text>

            <Box cursor={'pointer'} onClick={goToProfile} position={'relative'}>
              <Box position={'absolute'} top={0} left={0}>
                <Tooltip label="Go to profile">
                  <Text color="transparent">a</Text>
                </Tooltip>
              </Box>
              <MdOutlineOpenInNew
                color="var(--primary-color)"
                fontSize={'19px'}
              />
            </Box>
          </Flex>
        </Flex>

        <Flex
          mt="1.3em"
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
          justify={'space-between'}
        >
          <Text fontSize={'15px'} fontWeight={500}>
            Type{' '}
          </Text>

          <Text fontSize={'13px'}> {type} </Text>
        </Flex>

        <Flex
          mt="1.3em"
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
          justify={'space-between'}
        >
          <Text fontWeight={500} fontSize={'15px'}>
            Description{' '}
          </Text>

          <Text fontSize={'13px'}> {description} </Text>
        </Flex>

        <Flex
          mt="1.3em"
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
          justify={'space-between'}
        >
          <Text fontWeight={500} fontSize={'15px'}>
            Time{' '}
          </Text>

          <Text fontSize={'13px'}> {formatDateTimeString(createdAt)} </Text>
        </Flex>

        <Flex
          mt="1.3em"
          borderBottom={'1px solid rgba(0,0,0,0.2)'}
          justify={'space-between'}
        >
          <Text fontSize={'15px'} fontWeight={500}>
            Device Data{' '}
          </Text>

          <Text fontSize={'13px'}> {deviceData} </Text>
        </Flex>
      </Box>

      <Flex mt="2em" justify={'flex-end'}>
        <Btn w="90px" px="1.2em" py="0.2em" onClick={close}>
          Cancel
        </Btn>
      </Flex>
    </Box>
  );
};

export const formatDateTimeString = (dateTimeStr, am_pm = true) =>
  moment(dateTimeStr).format(`YYYY-MM-DD ${am_pm ? 'hh:mm A' : ''}`);

export const logUserLabel = (user) =>
  user?.alias
    ? user?.alias
    : user?.firstName || user?.lastName
    ? `${user?.firstName} ${user?.lastName}`
    : 'A new user';

const Audit = () => {
  const { logs, useAppAudits } = useTeams();

  const { openModal, closeModal } = useWidget();

  const [logLimit, setLogLimit] = useState('today');

  useAppAudits(logLimit);

  const userLogs = logs.map((log) => ({
    user: log?.user?.alias
      ? log?.user?.alias
      : log?.user?.firstName || log?.user?.lastName
      ? `${log?.user?.firstName} ${log?.user?.lastName}`
      : 'A new user',
    type: log?.type,
    createdAt: formatDateTimeString(log?.createdAt),
    description: shortenText(log?.description, 40),
    action: (
      <Btn
        px="0.8em"
        bg="white"
        onClick={() => {
          openModal({
            children: ActivityLogDetail,
            payload: { ...log, close: closeModal },
            size: '2xl',
          });
        }}
        border={'1px solid #F2F2F2'}
        variant={'secondary'}
      >
        View
      </Btn>
    ),
  }));

  const dateAsString = new Date().toString();
  const timezone = dateAsString.match(/\(([^\)]+)\)$/)[1];
  console.log('timezone', timezone);

  return (
    <AdminAsideBar>
      <Flex
        align={{ base: 'start', md: 'center' }}
        gap="8"
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
      >
        <Box>
          <Text
            mt="0.6em"
            className="archivo"
            fontSize={'22'}
            fontWeight="semibold"
          >
            Audit Trail
          </Text>

          <Text fontSize={'16'} color="gray.500">
            View Recent Activities of users in PeepsDB
          </Text>
        </Box>

        <Flex gap="0.6em" align="center">
          <GrFilter fontSize={'18px'} />
          <Select
            fontSize={'14px'}
            onClick={(e) => setLogLimit(e.target.value)}
            maxW={'100px'}
          >
            <option value={'today'}>Today</option>
            <option value={'2days'}>Last 2 days</option>
            <option value="7days">Last week</option>
            <option value={'1month'}>Last month</option>
            <option value={'all'}>All</option>
          </Select>
        </Flex>
      </Flex>
      <Box
        pb="100px"
        mt="2.2em"
        overflow={'auto'}
        w={{
          base: 'calc(100vw - 6rem)',
          md: 'calc(100vw - 4rem)',
          lg: 'calc(100vw - 21vw)',
        }}
      >
        <TableComponent
          bodyEntries={['user', 'type', 'createdAt', 'description', 'action']}
          body={userLogs}
          headers={['User', 'Type', 'Timestamp', 'Description', 'Action']}
        />
      </Box>
    </AdminAsideBar>
  );
};

export default Audit;
