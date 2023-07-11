import React from "react"
import { Link } from "react-router-dom"
import useAuthActions from "../../hooks/useAuth"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Avatar,
  Box,
} from "@chakra-ui/react"
import { FaUser } from "react-icons/fa"

const UserDropdown = ({ user }) => {
  const { alias, firstName: firstname, lastName: lastname, role } = user

  const { logout, profile: auth } = useAuthActions()

  const { avatar } = auth || {}

  const displayName = alias ? (
    alias
  ) : firstname && lastname ? (
    <>
      {firstname} {lastname}
    </>
  ) : (
    "user"
  )

  return (
    <>
      <Menu>
        <MenuButton fontSize={"18px"}>
          <Box
            as="div"
            border="1px"
            borderColor="gray.200"
            borderRadius="100px"
            w="fit-content"
          >
            {avatar ? (
              <Avatar src={`${avatar}`} />
            ) : (
              <Avatar color="gray.500" bg="#fcfcfc" icon={<FaUser />} />
            )}
          </Box>
        </MenuButton>
        <MenuList zIndex="100" p="3" borderRadius="10px">
          <MenuItem py="2" px="3" borderRadius="5px" _hover={{bg:"#fcfcfc"}}>
            <Link style={{ display: "flex", width: "100%" }} to="/profile">
              {displayName}
              <Text>({role})</Text>
            </Link>
          </MenuItem>
          {auth?.profileSetup ? (
            <MenuItem py="2" px="3" borderRadius="5px" _hover={{bg:"#fcfcfc"}}>
              <Link style={{ display: "flex", width: "100%" }} to="/meeting">
                <Text as="p"> Meeting</Text>
              </Link>
            </MenuItem>
          ) : (
            <></>
          )}

          <MenuItem py="2" px="3" borderRadius="5px" _hover={{bg:"#fcfcfc"}}>
            <Text as="p" onClick={logout}>
              Sign Out
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default UserDropdown
