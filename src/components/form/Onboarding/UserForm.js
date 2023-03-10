import React, { useState, useEffect } from "react";
import FormUserDetails from "./FormUserDetails";
import FormWorkDetails from "./FormWorkDetails";
import FormSocialDetails from "./FormSocialDetails";
import Confirm from "./Confirm";
import {
  Divider,
  Stack,
  Box,
  Circle,
  Center,
  Hide,
  Grid, 
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { GiCheckMark } from "react-icons/gi";
// import Payment from './Payment';
// import useWidget from '../../../hooks/useWidget';
import NavLayout from "../../layouts/NavLayout";
import styled from "styled-components";
import useConnections from "../../../hooks/useConnections.jsx";
import useWidget from "../../../hooks/useWidget";
// import ConnectWidget from '../../connnections';
import { backendURL } from "../../../utils/setEnv";

const UserForm = ({ profile, loading }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    avatar: "",
    lastName: "",
    alias: "",
    skypeId: "",
    paymentMethod: "payoneer",
    googleGmailId: "",
    appleEmailId: "",
    microsoftEmailId: "",
    phone: "",
    timezone: "",
    daysPerWeek: 4,
    hoursPerDay: "",
    localCurrencyUrl: "",
    femSlackProfileUrl: "",
    startDate: "",
    paymentProfileUrl: "",
    paymentEmail: "",
    twitterProfileUrl: "",
    facebookProfileUrl: "",
    githubProfileUrl: "",
    linkedinProfileUrl: "",
    calendlyProfileUrl: "",
    provider: profile?.provider,
    bankName: "",
    accountNumber: "",
    accountType: "",
    routing: "",
    paymentType: "",
  });

  const { openModal, closeModal } = useWidget();

  const {
    connectionsRef: windowRef,
    githubConnect,
    linkedinConnect,
    ConnectionsModal,
    facebookConnect,
  } = useConnections();

  useEffect(() => {
    console.log("user profile at setup", profile);

    profile &&
      setFormData((prev) => ({
        ...prev,
        ...profile,
      }));
  }, []);

  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.origin === backendURL) {
        console.log("message caught", e.origin);
        if (windowRef?.current?.close) {
          let profileData = e.data;

          const initPayload = JSON.parse(profileData);

          openConnections(initPayload);

          windowRef.current?.close && windowRef.current.close();
        }
      }
      // console.log('event data',e.data)
    });
    return window.removeEventListener("message", window);
  }, []);

  const openConnections = (initPayload = false) => {
    const payload = {
      view: "onboarding",
      padd: true,
      setValues: (values, selected) => {
        let payload = {};
        for (const key in values) {
          if (selected.includes(key)) {
            payload[key] = values[key];
          }
        }
        setFormData(payload);
      },
      close: closeModal,
      ...(initPayload && !initPayload?.target ? { initPayload } : {}),
    };

    console.log("final payload", payload);

    openModal({
      children: ConnectionsModal,
      size: "xl",
      isOpen: true,
      payload,
    });
  };

  useEffect(() => {
    openConnections();
  }, []);

  const [step, setStep] = useState(0);
  // company: loading || !profile.company ? '' : profile.company,

  const onChange = (e, type = "text") => {
    setFormData({
      ...formData,
      [e.target.name]:
        type == "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  const setValue = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Proceed to next step
  const nextStep = (payload) => {
    setFormData({ ...formData, ...payload });
    setStep(step=> step+1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step =>step-1);
  };

  return (
    <Box px={{ base: "0", md: "12", lg: "16" }}>
      <NavLayout>
        {step < 3 ? (
          <Grid
            templateColumns={{ base: "1fr", md: "10rem 1fr" }}
            gap={4}
            mt="8"
            w="full"
            pb="50px"
            position="relative">
            <GridItem
              w="full"
              zIndex="100"
              bg="white"
              position={["sticky"]}
              top={["0"]}>
              <Stack
                direction={{ base: "row", md: "column" }}
                py="4"
                position={["sticky"]}
                top={["8"]}
                w={{ base: "full", md: "fit-content", lg: "fit-content" }}
                h={{ base: "fit-content", md: "70vh", lg: "50vh" }}
                justify="center">
                {[0, 1, 2].map((index) => {
                  // custom divider border color
                  const activeLineColor =
                    index === step ? "var(--primary-color)" : "#EFF0F7";

                  return (
                    <>
                      {/** check if tab is different to the first step before displaying a DIVIDER */}
                      {index !== 0 ? (
                        <Center
                          w={{ base: "full", md: "auto", lg: "auto" }}
                          h={{ base: "auto", md: "full", lg: "full" }}>
                          <Hide below="md">
                            <Divider
                              orientation="vertical"
                              borderColor={activeLineColor}
                              borderWidth="1px"
                            />
                          </Hide>
                          <Hide above="md">
                            <Divider
                              orientation="horizontal"
                              borderColor={activeLineColor}
                              borderWidth="1px"
                            />
                          </Hide>
                        </Center>
                      ) : (
                        ""
                      )}
                      <Box
                        onClick={() => {
                          // change tab
                          setStep((step) => (step = index));
                          console.log("___index___step :", step);
                        }}
                        key={index}>
                        {index === step ? (
                          <Center cursor={"pointer"}>
                            <Circle
                              display={"flex"}
                              bg="var(--primary-color)"
                              justifyContent="center"
                              size="35px"
                              alignItems="center">
                              <GiCheckMark fontSize={"1.4rem"} color="white" />
                            </Circle>
                          </Center>
                        ) : (
                          <Center cursor={"pointer"}>
                            <Circle size="35px" background="#EFF0F7">
                              <Circle size="2rem" p="0.3em" bg="white">
                                <Circle
                                  bg="var(--primary-color)"
                                  size="10px"></Circle>
                              </Circle>
                            </Circle>
                          </Center>
                        )}
                      </Box>
                    </>
                  );
                })}
              </Stack>
            </GridItem>

            {/** main body */}
            <GridItem w="full" mt={["8", "0"]}>
              <Box>
                {/** step 01 for editing user infos */}
                {step === 0 ? (
                  <Box>
                    <FormUserDetails
                      nextStep={nextStep}
                      onChange={onChange}
                      formData={formData}
                      profile={profile}
                      loading={loading}
                      openConnections={openConnections}
                    />
                  </Box>
                ) : (
                  ""
                )}
                {/** step 02 for editing user infos */}
                {step === 1 ? (
                  <Box>
                    <FormWorkDetails
                      setFormData={setFormData}
                      prevStep={prevStep}
                      nextStep={nextStep}
                      onChange={onChange}
                      formData={formData}
                      profile={profile}
                      loading={loading}
                      openConnections={openConnections}
                    />
                  </Box>
                ) : (
                  ""
                )}
                {/** step 02 for editing user infos */}
                {step === 2 ? (
                  <Box>
                    <FormSocialDetails
                      prevStep={prevStep}
                      nextStep={nextStep}
                      onChange={onChange}
                      formData={formData}
                      windowRef={windowRef}
                      profile={profile}
                      loading={loading}
                      connections={{
                        githubConnect,
                        linkedinConnect,
                        facebookConnect,
                      }}
                      openConnections={openConnections}
                    />
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </GridItem>
          </Grid>
        ) : (
          <Confirm
            onChange={onChange}
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
          />
        )}
      </NavLayout>
    </Box>
  );
};

export const OnboardingContainer = styled.div`
  .below {
    margin-top: 1em;
  }
`;

export const FormRow = ({ children, ...rest }) => {
  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={"2em"} {...rest}>
      {children}
    </Flex>
  );
};

export default UserForm;