import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import useAuthActions from "../../hooks/useAuth";
import { useMenu } from "../../hooks/MenuProvider";
import { FiMenu } from "react-icons/fi";
import { HStack, Show, Box } from "@chakra-ui/react";

const NavLayout = ({
  boxShadow,
  className,
  children,
  rest,
  noPadding,
  title,
}) => {
  // control displaying menu
  const drawer = useMenu();
  // Selectors
  const { auth } = useAuthActions();
  const { isAuthenticated } = auth || {};

  return (
    <>
      <div className={className}>
        <h1>
          <HStack gap="4">
            <Show below="lg">
              <Box onClick={() => drawer.setMenuStatus(true)} cursor="pointer">
                <FiMenu />
              </Box>
            </Show>
            <Link to="/">{title || "PeepsDB"}</Link>
          </HStack>
        </h1>
        {isAuthenticated && auth && <UserDropdown user={auth} />}
      </div>
      {children}
    </>
  );
};

export default styled(NavLayout)`
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  ${(props) =>
    props.boxShadow ? `box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.03);` : ""}

  ${(props) =>
    props.noPadding
      ? `
      padding: 0 5rem;
      @media (max-width: 768px) {
        padding: 0 3rem;
      }
      @media (max-width: 450px) {
        padding: 0 2rem;
      }
    `
      : ``}


  h1 {
    font-size: 2.5rem;
  }
`;
