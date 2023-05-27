import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Background from '../assets/images/login-background.png';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub, BsLinkedin, BsFacebook, BsTwitter } from 'react-icons/bs';
import Microsoft from '../assets/images/microsoft-icon.png';
import { backendURL, githubClientID } from '../utils/setEnv';
import useAuthActions from '../hooks/useAuth';
import { renderJSX } from '../utils/helpers';
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Hide,
  ModalCloseButton,
} from '@chakra-ui/react';
import TextInput from '../widgets/Text';
import Btn from '../widgets/Button';
import Input from '../widgets/Input';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import useConnections from '../hooks/useConnections';
import { AiOutlineRight } from 'react-icons/ai';

// return GitHub URL Authentication link
export const githubAuthCall = (userid) =>
  `https://github.com/login/oauth/authorize?client_id=${githubClientID}&redirect_uri=${encodeURIComponent(
    backendURL + '/' + process.env.REACT_APP_GITHUB_CALLBACK_URL
  )}?path=${'/' + renderJSX(userid, userid, '')}&scope=user:email`;
// return Google URL Authentication link
export const googleAuthUrl = (inapp) =>
  `${backendURL}/auth/google${renderJSX(inapp, inapp, '')}`;
// return LinkedIn URL Authentication link
export const linkedinAuthUrl = (inapp = '') => {
  const baseURL = 'https://www.linkedin.com/oauth/v2/authorization';
  const client_id = `client_id=${process.env['REACT_APP_LINKEDIN_CLIENT_ID']}`;
  const response_type = `response_type=code`;
  const redirect_uri = `redirect_uri=${
    backendURL + '/' + process.env.REACT_APP_LINKEDIN_CALLBACK_URL
  }`;
  const state = `state=${inapp}`;
  const scope = `scope=${encodeURIComponent(`r_liteprofile r_emailaddress`)}`;

  const completeURL = `${baseURL}?${response_type}&${client_id}&${redirect_uri}&${state}&${scope}`;

  return completeURL;
};
// return Facebook URL Authentication link
export const facebookAuthUrl = (inapp = '') =>
  `${backendURL}/auth/facebook${inapp}`;
// return Microsoft URL Authentication link
export const microsoftAuthUrl = (userid) =>
  `${backendURL}/auth/microsoft${renderJSX(userid, `?userid=` + userid, '')}`;

const inputStyles =
  'background:whiteborder:1px solid var(--borders)border-radius:0.4emmargin-top:0.4emheight:40pxfont-size:13px';

const NewConnection = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setStep(1);
        setLoading(false);
      }, 2000);
    } catch (err) {
    } finally {
    }
  };

  if (!step) {
    return (
      <>
        <Box p="2em">
          <Flex justify={'center'}>
            <TextInput variant={'s2'}>Request Connect</TextInput>
          </Flex>

          <Center mt="0.6em" fontSize={'13px'} color={'var(--hash)'}>
            Enter connection information
          </Center>

          <Input
            mt="1em"
            inputStyles={inputStyles}
            labelStyles="fontSize:13pxmargin:0"
            label="Name"
            placeholder="Enter your full name"
          />

          <Input
            mt="1em"
            inputStyles={inputStyles}
            labelStyles="fontSize:13pxmargin:0"
            label="Email address"
            placeholder="Enter your email address"
          />

          <Input
            mt="1em"
            inputStyles={inputStyles}
            labelStyles="fontSize:13pxmargin:0"
            label="Website name"
            placeholder="PeespDB"
          />

          <Input
            mt="1em"
            inputStyles={inputStyles}
            labelStyles="fontSize:13pxmargin:0"
            label="Connection URL"
            placeholder="www.peepsDB.com"
          />

          <Btn loading={loading} mt="2em" onClick={handleSubmit} full>
            Submit
          </Btn>
        </Box>
      </>
    );
  }
  return (
    <Box p={'1.5em'}>
      <Center mt="1.5em">
        <IoIosCheckmarkCircle fontSize={'55px'} color="var(--primary-color)" />
      </Center>
      <Center color="var(--primary-color)" mt="0.5em" fontSize={'18px'}>
        Thank You!{' '}
      </Center>

      <Center mt={'0.5em'} color="#333333" fontSize={'13px'}>
        You request has been successfully recorded. We're working on it!
      </Center>

      <Btn onClick={handleClose} mt="1.2em" full>
        Close
      </Btn>
    </Box>
  );
};

const LoginScreen = () => {
  // Selector
  const { auth } = useAuthActions();
  const { ConnectionsModal } = useConnections();
  // states
  const [modalScreen, setModalScreen] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // open modal
  const handleOpen = (type) => {
    setModalScreen(type);
    onOpen();
  };
  // close modal
  const handleClose = () => {
    setModalScreen();
    onClose();
  };
  // check if authenticated
  if (auth?.token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {/** request connection modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent mx="6">
          <ModalCloseButton />
          <ModalBody mt="1em">
            {modalScreen === 'new-connection' ? (
              <NewConnection handleClose={handleClose} />
            ) : modalScreen === 'more-connections' ? (
              <>
                <ConnectionsModal view={'login'} />
              </>
            ) : (
              <></>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/** first content showing up */}
      <Stack
        direction={'row'}
        justify="center"
        alignItems="center"
        gap="16"
        overflow="auto"
        minH="100vh"
      >
        {/** login block */}
        <Stack direction={'column'} alignItems="center" gap="8">
          <Box align="center">
            <Text fontSize="2.5rem" fontWeight="semibold">
              Sign in to PeepsDB
            </Text>
            <Text fontSize="2xl" pt="2" color="var(--hash)">
              Sign in with a single click
            </Text>
          </Box>

          <Box>
            <Grid
              align="center"
              gap={{
                base: '1rem',
                md: '1rem',
                lg: '2rem',
              }}
              templateColumns={{
                base: 'repeat(3,1fr)',
                md: 'repeat(3,1fr)',
              }}
            >
              <CustomSocialLink socialAuthLink={googleAuthUrl}>
                <FcGoogle />
              </CustomSocialLink>

              <CustomSocialLink socialAuthLink={githubAuthCall}>
                <BsGithub />
              </CustomSocialLink>

              <CustomSocialLink socialAuthLink={microsoftAuthUrl}>
                <Image src={Microsoft} alt="" boxSize="3rem" />
              </CustomSocialLink>

              <CustomSocialLink socialAuthLink={facebookAuthUrl}>
                <BsFacebook color="#1776F0" />
              </CustomSocialLink>

              <CustomSocialLink socialAuthLink={microsoftAuthUrl}>
                <BsTwitter color="#25ABED" />
              </CustomSocialLink>

              <CustomSocialLink socialAuthLink={linkedinAuthUrl}>
                <BsLinkedin color="#1a75bb" />
              </CustomSocialLink>
            </Grid>

            {2 + 2 === 5 && (
              <Button
                onClick={() => handleOpen('more-connections')}
                mt="2.5em"
                bg="white"
                h={'3.5em'}
                border="1px solid var(--primary-color)"
                w="full"
                borderRadius="5px"
              >
                <Text
                  mr={'0.3em'}
                  fontSize={'15px'}
                  color="var(--primary-color)"
                >
                  More connections
                </Text>
                <AiOutlineRight
                  fontSize={'14px'}
                  color="var(--primary-color)"
                />
              </Button>
            )}

            <Flex align="center" my="1.5em">
              <Box h="1px" borderTop="1px solid #EEEEEE" flex={0.49}></Box>
              <Text mx="0.4em" fontSize="1.3rem">
                OR
              </Text>
              <Box h="1px" borderTop="1px solid #EEEEEE" flex={0.49}></Box>
            </Flex>

            <Flex gap="1">
              <Text fontSize={'xl'}>Couldn't find connection? </Text>
              <Text
                onClick={() => handleOpen('new-connection')}
                cursor={'pointer'}
                fontSize={'xl'}
                color="var(--primary-color)"
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                Request Connect
              </Text>
            </Flex>
          </Box>
        </Stack>
        {/** Right illustration image -> Only visible when breakpoint:lg and more */}
        <Hide below="lg">
          <Stack borderLeft="1px solid #EEEEEE" justify="center">
            <Image
              boxSize="490px"
              objectFit="cover"
              p="16"
              src={Background}
              alt="login right image"
            />
          </Stack>
        </Hide>
      </Stack>
    </>
  );
};

// Customs social(s) link(s) for Auth -> Facebook | Google | GitHub | Twitter | ...
const CustomSocialLink = ({ children, socialAuthLink }) => {
  return (
    <GridItem>
      <Stack
        as="a"
        h="80px"
        w="80px"
        p="4"
        border="1px"
        borderColor="gray.200"
        alignItems="center"
        justify="center"
        borderRadius="8px"
        fontSize="3rem"
        _hover={{
          background: '#f9f9f9',
        }}
        href={socialAuthLink()}
      >
        {children}
      </Stack>
    </GridItem>
  );
};

export default LoginScreen;
