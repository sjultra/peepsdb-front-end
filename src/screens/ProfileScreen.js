import { Box } from "@chakra-ui/react"
import React from "react"
import NavLayout from "../components/layouts/NavLayout"
import Spinner from "../components/layouts/Spinner"
import ProfileInfo from "../components/profile/ProfileInfo"
import useAuthActions from "../hooks/useAuth"
import useWidget from "../hooks/useWidget"

const ProfileScreen = () => {
  // hooks
  const { profile } = useAuthActions()
  const { loading } = useWidget()

  console.log("user profile at profilescreen", profile)

  if (loading) return <Spinner />
  return (
    <Box px={["0", "16"]}>
      <NavLayout displayAsidebar={false}>
        <Box>
          <ProfileInfo profile={profile} />
        </Box>
      </NavLayout>
    </Box>
  )
}

export default ProfileScreen
