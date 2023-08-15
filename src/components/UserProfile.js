import { Box, Flex, IconButton, Select, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { TbFlag3 } from 'react-icons/tb';
import useAxios from '../hooks/useAxios';
import useTeams from '../hooks/useTeams';
import useWidget from '../hooks/useWidget';
import Btn from '../widgets/Button';
import TextInput from '../widgets/Text';
import { NavLink } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import useAuthActions from '../hooks/useAuth';

const toggleUserActiveState = (isSuspended) =>
  isSuspended ? 'Enable' : 'Suspend';

export const UserOptions = ({ userlist, user, setUser }) => {
  // Selectors
  const { auth } = useAuthActions();
  const { openModal, closeModal } = useWidget();

  const { _id, role, isSuspended } = user;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        py="0.4em"
        aria-label="Options"
        icon={<BsThreeDotsVertical fontSize={'16px'} />}
        variant="outline"
      />
      <MenuList>
        {userlist && (
          <MenuItem py="0.7em">
            <NavLink to={`/teams/user/${_id}`}>View Profile</NavLink>
          </MenuItem>
        )}
        {auth?.token && auth?.role === 'Admin' ? (
          <MenuItem
            onClick={() => {
              openModal({
                children: EditRole,
                size: 'md',
                payload: {
                  _id,
                  role,
                  close: closeModal,
                  setUser,
                },
              });
            }}
            py="0.7em"
          >
            Edit Role
          </MenuItem>
        ) : (
          ''
        )}
        {auth?.token && auth?.role === 'Admin' ? (
          <MenuItem
            py="0.7em"
            onClick={() =>
              openModal({
                children: SuspendUser,
                size: '2xl',
                payload: {
                  _id,
                  isSuspended,
                  setUser,
                },
              })
            }
          >
            {toggleUserActiveState(isSuspended)} user
          </MenuItem>
        ) : (
          ''
        )}
      </MenuList>
    </Menu>
  );
};

const SuspendUser = ({ _id, isSuspended, setUser }) => {
  const [statusText, setStatusText] = useState(
    toggleUserActiveState(isSuspended)
  );

  const { closeModal, openToast } = useWidget();

  const [loading, setLoading] = useState(false);

  const axios = useAxios();

  let { updateProfile } = useTeams();

  const enableDisableUser = async () => {
    try {
      setLoading(true);
      let req = await axios.post('/profiles/user/status', {
        _id,
      });

      let { data, status } = req;

      console.log('data response');

      status === 200 &&
        openToast.success({
          description: data?.msg,
        });

      setStatusText((prev) => (prev === 'Enable' ? 'Suspend' : 'Enable'));

      updateProfile({
        _id,
        isSuspended: !isSuspended,
      });

      setUser((prev) => ({
        ...prev,
        profile: {
          ...prev?.profile,
          isSuspended: !isSuspended,
        },
      }));
    } catch (err) {
      console.log('error caught', err?.response);
      let { data, status } = err?.response;

      status === 401 &&
        openToast.fail({
          title: 'Request failed',
          description: data?.msg,
          status: 'error',
          position: 'top',
          isClosable: true,
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="white" borderRadius={'8px'} p="1.2em 1.5em">
      <TextInput variant={'s2'}>
        Are you sure you wish to {statusText} this user ?
      </TextInput>

      <Flex mt="1.2em" gap="1em" align={'flex-end'}>
        <Btn
          disabled={loading}
          onClick={closeModal}
          px={'2em'}
          variant="secondary"
        >
          No
        </Btn>
        <Btn onClick={enableDisableUser} loading={loading} px="2em">
          Yes
        </Btn>
      </Flex>
    </Box>
  );
};

export const EditRole = ({ role, _id, close, setUser }) => {
  const [defaultValue, setDefaultValue] = useState(role);

  const [loading, setLoading] = useState(false);

  const { updateProfile } = useTeams();

  const axios = useAxios();

  const { openToast } = useWidget();

  const submit = async () => {
    try {
      setLoading(true);
      let req = await axios.post('/profiles/role/update', {
        _id,
        role: defaultValue,
      });
      let { status } = req;

      status === 200 &&
        openToast.success({
          description: 'User role updated successfully',
        });

      updateProfile({
        _id,
        role: defaultValue,
      });

      setUser((prev) => ({
        ...prev,
        profile: {
          ...prev?.profile,
          role: defaultValue,
        },
      }));
    } catch (err) {
      console.log('error caught', err?.response);
      let { data, status } = err?.response;

      status === 401 &&
        openToast.fail({
          description: data?.msg,
        });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setDefaultValue(e?.target?.value);

  return (
    <Box p="1em 2em">
      <TextInput variant={'s1'}>Edit Role</TextInput>
      <Select
        onChange={onChange}
        value={defaultValue}
        mt="1em"
        h="40px"
        fontSize={'15px'}
      >
        <option value="Guest">Guest</option>
        <option value="Staff">Freelancer</option>
        <option value="Staff">Staff</option>
        <option value="Admin">Admin</option>
      </Select>

      <Flex justify={'flex-end'} mt="1.5em" gap="1em">
        <Btn
          disabled={loading}
          onClick={close}
          px="1.2em"
          fontSize={'14px'}
          variant={'secondary'}
        >
          {' '}
          Cancel
        </Btn>

        <Btn
          onClick={submit}
          loading={loading}
          px="1.2em"
          h="40px"
          fontSize={'14px'}
        >
          Submit
        </Btn>
      </Flex>
    </Box>
  );
};

const UserProfile = ({ user, setUser }) => {
  // Selectors
  const { auth } = useAuthActions();

  const { profile, onboard } = user;
  // const {openModal} = useWidget()
  const {
    firstName,
    lastName,
    alias,
    avatar,
    _id,
    phone,
    facebookProfileUrl,
    appleEmailId,
    githubProfileUrl,
    LinkedInProfileUrl,
    femSlackProfile,
    googleGmailId,
    timezoneUrl,
    isSuspended,
    twitterProfileUrl,
  } = profile;

  return (
    <Box>
      <Box border={'1px solid #ECEEEE'} mt="20px" borderRadius={'12px'}>
        <Box
          bg={'#6D64FA'}
          h={{ base: '140px', lg: '168px' }}
          w={{ base: 'full' }}
          borderRadius={'12px'}
        ></Box>
        <Box px="10" mt="-42px" align="flex-end">
          {avatar ? (
            <Avatar
              name={`${firstName} ${lastName}`}
              size="2xl"
              src={`${avatar}`}
            />
          ) : (
            <Avatar
              size="2xl"
              color="gray.500"
              bg="gray.50"
              icon={<FaRegUser />}
            />
          )}
          <Flex justify={'space-between'} my="1em">
            <Box flex="1">
              <Text
                noOfLines={1}
                fontWeight={'600'}
                fontSize={'18'}
                color={'#384A62'}
              >
                {firstName} {lastName}
              </Text>
              <Text
                noOfLines={1}
                fontWeight={'400'}
                fontSize={{ base: '15px', lg: '15px' }}
                color={'#384A62'}
              >
                {alias ? alias : ''}
              </Text>
            </Box>
            {/** user profile dropdown */}
            {auth?.token && auth?.role === 'Admin' ? (
              <Flex align={'center'} gap={'4'} flexDir={'row'}>
                <Flex color="#142F7D" align="center" gap={'2'}>
                  <TbFlag3 size={'20px'} />
                  <Text fontSize={'14'}>View Logs</Text>
                </Flex>
                <UserOptions user={profile} setUser={setUser} />
              </Flex>
            ) : (
              ''
            )}
          </Flex>
        </Box>
      </Box>

      <Box pb="100px" mt="4em" w={{ base: 'auto', lg: 'auto' }} px={'10'}>
        <Flex
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          mt="6"
        >
          <CustomTextItem title="First name" value={firstName} />
          <CustomTextItem title="Last name" value={lastName} />
        </Flex>

        <Flex
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          mt="6"
        >
          <CustomTextItem title="Nickname/Alias" value={alias} />
          <CustomTextItem title="Phone number" value={phone} />
        </Flex>

        <Flex
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          mt="6"
        >
          <CustomTextItem title="Google Email id" value={googleGmailId} />
          <CustomTextItem title="Apple Email id" value={appleEmailId} />
        </Flex>

        <Flex
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          mt="6"
        >
          <CustomTextItem
            title="Facebook Profile Url"
            value={facebookProfileUrl}
          />
          <CustomTextItem title="Timezone url" value={timezoneUrl} />
        </Flex>

        <Flex
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          mt="6"
        >
          <CustomTextItem title="FEM Slack Profile" value={femSlackProfile} />
          <CustomTextItem
            title="Twitter Profile Url"
            value={twitterProfileUrl}
          />
        </Flex>

        <Flex
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          mt="6"
        >
          <CustomTextItem title="Github Profile Url" value={githubProfileUrl} />
          <CustomTextItem
            title="LinkedIn Profile Url"
            value={LinkedInProfileUrl}
          />
        </Flex>
      </Box>
    </Box>
  );
};

// custom textItem
const CustomTextItem = ({ title, value }) => {
  return (
    <>
      <Box flex={'1'}>
        <Text fontSize={'16'} fontWeight="400" color="#4F4A4A">
          {title}
        </Text>
        <Text fontSize={'16'} fontWeight="500" color={'#1F1D1D'} my="20px">
          {value}
        </Text>
      </Box>
    </>
  );
};

export default UserProfile;
