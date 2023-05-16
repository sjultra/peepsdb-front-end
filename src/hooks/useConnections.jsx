import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import {
  facebookAuthUrl,
  githubAuthCall,
  googleAuthUrl,
  linkedinAuthUrl,
  microsoftAuthUrl,
} from '../screens/LoginScreen';
import TextInput from '../widgets/Text';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import Btn from '../widgets/Button';
import { useState } from 'react';
import { capitalizeString } from '../utils/helpers';
import styled from 'styled-components';
import { backendURL } from '../utils/setEnv';

const CheckboxInput = styled.input`
  height: 40px;
  transform: scale(1.4);
`;

const SelectDataComponent = ({
  keyValue,
  value,
  previous,
  payloadList,
  setPayload,
}) => {
  if (keyValue !== 'provider') {
    return (
      <Flex
        justify={'space-between'}
        borderTop="1px solid rgba(0,0,0,0.2)"
        align="center"
        p="0.5em 0.8em"
      >
        <Box>
          <Text fontSize={'16px'} fontWeight={500}>
            {capitalizeString(keyValue)}
          </Text>

          <Text textAlign={'initial'} mt="0.2em" fontSize={'12px'}>
            {keyValue === 'avatar' ? (
              <Image width={'100px'} borderRadius="3px" src={value} />
            ) : (
              value
            )}
          </Text>
        </Box>

        <Box
          as="input"
          isChecked={payloadList.includes(keyValue)}
          onChange={() =>
            setPayload((prev) => {
              console.log('payload', prev);
              return prev.includes(keyValue)
                ? prev.filter((value) => value !== keyValue)
                : [...prev, keyValue];
            })
          }
          w="initial"
          flex="initial"
          h="initial"
          type="checkbox"
          height="50px"
          size="lg"
          transform="scale(1.4)"
        />
      </Flex>
    );
  }
};

const ConnectionsModal = ({ view, padd, setValues, close, initPayload }) => {
  const connectionRef = useRef();

  const ConnectionViews = {
    login: {
      header: 'Sign in to PeepsDB',
      subText: '',
      actionText: 'Sign in with',
      text: 'Sign in',
      googleConnect: () => window.location.assign(googleAuthUrl('')),

      githubConnect: () => {
        window.location.assign(githubAuthCall());
      },

      linkedinConnect: () => {
        window.location.assign(linkedinAuthUrl('/'));
      },

      microsoftConnect: () => {
        window.location.assign(microsoftAuthUrl(''));
      },

      facebookConnect: () => {
        window.location.assign(facebookAuthUrl(''));
      },
    },

    onboarding: {
      header: 'Sync with other apps',

      subText:
        'You can Collect your info from your other accounts to ease your onboarding process',

      text: 'Connect',

      actionText: 'Connect to',

      googleConnect: () =>
        (connectionRef.current = window.open(
          googleAuthUrl(view === 'login' ? '' : '-inapp'),
          'Sign in with google',
          'width=550,height=450'
        )),

      githubConnect: () => {
        connectionRef.current = window.open(
          githubAuthCall(view === 'login' ? '' : 'inapp'),
          'Sign in with github',
          'width=550,height=450'
        );
      },

      linkedinConnect: () => {
        connectionRef.current = window.open(
          `${linkedinAuthUrl(view === 'login' ? '' : '-inapp')}`,
          'Sign in with LinkedIn',
          'width=550,height=450'
        );
      },

      facebookConnect: () => {
        connectionRef.current = window.open(
          `${facebookAuthUrl(view === 'login' ? '' : '-inapp')}`,
          'Sign in with Facebook',
          'width=550,height=450'
        );
      },
    },
  };

  const [payload, setPayload] = useState(initPayload ? initPayload : {});

  const [fetched, setFetched] = useState(initPayload ? true : false);

  const [payloadList, setPayloadList] = useState(
    initPayload ? Object.keys(initPayload) : []
  );

  const checkSelectAllEntries =
    Object.keys(payload).length === payloadList.length;

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.origin === backendURL) {
        // console.log('message caught',e.origin,e.data)
        let profileData = e.data;

        const payload = JSON.parse(profileData);

        console.log('profile been caughtt', profileData);
        setFetched(true);
        setPayload(payload);
        setPayloadList(
          Object.keys(payload)
          // .filter(entry=>entry !=='provider')
        );

        connectionRef.current?.close && connectionRef.current.close();
      }
      // console.log('event data',e.data)
    });
    return window.removeEventListener('message', window);
  }, []);

  return (
    <Box p={padd ? '1.2em' : 'initial'}>
      {fetched ? (
        <>
          <Text textAlign={'center'} fontSize={'13px'} color="var(--hash)">
            We collected the following info from your {payload?.provider}{' '}
            account. Select the data you would like us to update your profile
            with
          </Text>

          <Flex mt="1em" justify={'flex-end'}>
            <Btn
              onClick={() =>
                checkSelectAllEntries
                  ? setPayloadList([])
                  : setPayloadList(Object.keys(payload))
              }
              p="1px"
              height={'12px'}
              fontWeight={400}
              fontSize="13px"
              variant={'blank'}
              color="var(--primary-color)"
            >
              {checkSelectAllEntries ? 'Unselect' : 'Select'} All
            </Btn>
          </Flex>
          <Box maxH={'300px'} overflowY="auto">
            {(() => {
              const payloadArr = Object.keys(payload).map((entry) => ({
                keyValue: entry,
                value: payload[entry],
              }));

              return payloadArr.map((ent, key) =>
                ent.keyValue !== 'provider' ? (
                  <Box key={key} mt={!key ? '1em' : 0}>
                    <SelectDataComponent
                      key={key}
                      {...ent}
                      payloadList={payloadList}
                      setPayload={setPayloadList}
                      previous={() => setFetched(false)}
                    />
                  </Box>
                ) : (
                  <></>
                )
              );
            })()}
          </Box>

          <Flex
            mt="0.6em"
            justify={'space-between'}
            borderTop="1px solid rgba(0,0,0,0.1)"
            pt="1.3em"
          >
            <Btn onClick={() => setFetched(false)} px="1.3em" variant={'fade'}>
              Back
            </Btn>

            <Btn
              px="1.3em"
              onClick={() => {
                setValues && setValues(payload, payloadList);
                close();
              }}
            >
              Update profile
            </Btn>
          </Flex>
        </>
      ) : (
        <>
          <Center>
            <TextInput variant={'s2'} fontWeight={500}>
              {ConnectionViews[view].header}
            </TextInput>
          </Center>

          <Box my="0.6em">
            <Text fontSize={'13px'} color="var(--hash)">
              {ConnectionViews[view].subText}
            </Text>
          </Box>

          <Box>
            <Flex
              justify={'space-between'}
              borderTop="1px solid rgba(0,0,0,0.2)"
              align="center"
            >
              <Flex py="0.5em" align="center" gap="0.6em">
                <Center w="45px">
                  <FcGoogle fontSize={'30px'} />
                </Center>

                <Box>
                  <Text fontSize={'16px'} fontWeight={500}>
                    Google
                  </Text>

                  <Text
                    textAlign={view === 'onboarding' ? 'center' : 'initial'}
                    mt="0.2em"
                    fontSize={'12px'}
                  >
                    {ConnectionViews[view].actionText} your Google{' '}
                  </Text>
                </Box>
              </Flex>

              <Btn
                onClick={ConnectionViews[view]?.googleConnect}
                h="30px"
                px="0.8em"
              >
                {ConnectionViews[view].text}
              </Btn>
            </Flex>

            <Flex
              borderTop="1px solid rgba(0,0,0,0.2)"
              justify="space-between"
              align="center"
            >
              <Flex py="0.5em" align="center" gap="0.6em">
                <Center w="45px">
                  <BsGithub fontSize={'30px'} />
                </Center>

                <Box>
                  <Text fontSize={'16px'} fontWeight={500}>
                    Github
                  </Text>
                  <Text mt="0.2em" fontSize={'12px'}>
                    {ConnectionViews[view].actionText} your Github{' '}
                  </Text>
                </Box>
              </Flex>

              <Btn
                onClick={ConnectionViews[view]?.githubConnect}
                h="30px"
                px="0.8em"
              >
                {ConnectionViews[view].text}
              </Btn>
            </Flex>

            {/* <Flex 
            borderTop="1px solid rgba(0,0,0,0.2)"
            justify='space-between' align='center'>
                <Flex
                py="0.5em"
                align="center"
                gap="0.6em"
                >
                
                <Center w="45px">
                    <Image src='/Assets/Microsoft-png.svg' h={"30px"} />
                </Center>

                <Box>
                    <Text fontSize={"16px"} fontWeight={500}>
                        Microsoft
                    </Text>
                    <Text mt="0.2em" fontSize={"12px"}>
                    {" "}
                    {ConnectionViews[view].actionText} your Microsoft{" "}
                    </Text>
                </Box>
                </Flex>

                <Btn onClick={ConnectionViews[view]?.microsoftConnect}   h='30px' px='0.8em'>
                    {ConnectionViews[view].text}            
                </Btn>

            </Flex> */}

            <Flex
              borderTop="1px solid rgba(0,0,0,0.2)"
              justify="space-between"
              align="center"
              py="0.5em"
            >
              <Flex align="center" gap="0.6em">
                <Center w="45px">
                  <Image src="/Assets/LinkedIn-png.svg" w="36px" />
                </Center>

                <Box>
                  <Text fontSize={'16px'} fontWeight={500}>
                    LinkedIn
                  </Text>
                  <Text mt="0.2em" fontSize={'12px'}>
                    {' '}
                    {ConnectionViews[view].actionText} your LinkedIn{' '}
                  </Text>
                </Box>
              </Flex>

              <Btn
                onClick={ConnectionViews[view]?.linkedinConnect}
                h="30px"
                px="0.8em"
              >
                {ConnectionViews[view].text}
              </Btn>
            </Flex>

            <Flex
              borderTop="1px solid rgba(0,0,0,0.2)"
              justify="space-between"
              align="center"
              py="0.5em"
            >
              <Flex align="center" gap="0.6em">
                <Center w="45px">
                  <Image src="/Assets/Facebook-png.svg" w="36px" />
                </Center>

                <Box>
                  <Text fontSize={'16px'} fontWeight={500}>
                    Facebook
                  </Text>
                  <Text mt="0.2em" fontSize={'12px'}>
                    {ConnectionViews[view].actionText} your Facebook
                  </Text>
                </Box>
              </Flex>

              <Btn
                onClick={ConnectionViews[view]?.facebookConnect}
                h="30px"
                px="0.8em"
              >
                {ConnectionViews[view].text}
              </Btn>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

const useConnections = () => {
  const connectionsRef = useRef();

  const googleConnect = () => '';

  const githubConnect = (inapp = '') => {
    connectionsRef.current = window.open(
      githubAuthCall(inapp),
      'Sign in with github',
      'width=550,height=450'
    );
  };

  const linkedinConnect = (inapp = '') => {
    connectionsRef.current = window.open(
      `${linkedinAuthUrl(inapp)}`,
      'Sign in with LinkedIn',
      'width=550,height=450'
    );
  };

  const facebookConnect = (inapp = '') => {
    connectionsRef.current = window.open(
      `${facebookAuthUrl(inapp)}`,
      'Sign in with Facebook',
      'width=550,height=450'
    );
  };

  return {
    googleConnect,
    githubConnect,
    linkedinConnect,
    facebookConnect,
    connectionsRef,
    ConnectionsModal,
  };
};

export default useConnections;
