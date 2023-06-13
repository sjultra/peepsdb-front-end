import React from "react"
import { useSelector } from "react-redux"
import { Stack, Flex } from "@chakra-ui/react"

const MainHeading = ({ title, toggle }) => {
  // Selectors
  const display = useSelector((state) => state.toggle)

  const defaultTitle = display.ado ? "ADO Projects" : "Jira Labels"

  


  return (
    <Stack direction="row" alignItems="center" justify={"space-between"} mt="6">
      <h1 className="text-primary">{title ? title : defaultTitle}</h1>
      <Flex
        w="fit-content"
        align="center"
        justify="center"
        borderRadius="full"
        overflow={"hidden"}
      >
        <CustomTab
          borderLeftRadius="full"
          tabName={"ado"}
          toggle={toggle}
          value="ADO"
          title={title}
          initialTitle="ADO Projects"
        />
        <CustomTab
          borderRightRadius="full"
          tabName={"jira"}
          toggle={toggle}
          value="JIRA"
          title={title}
          initialTitle="Jira Labels"
        />
      </Flex>
    </Stack>
  )
}

// custom tab
const CustomTab = ({
  tabName,
  toggle,
  value,
  title,
  initialTitle,
  ...rest
}) => {

  const active = {
    background: "rgba(95, 85, 239, 0.75)",
    color: "#ffffff",
    fontWeight: "600",
  }
  const noActive = {
    background: "#fcfcfc",
    color: "#000000",
    fontWeight: "400",
  }

  return (
    <>
      <Flex
        {...rest}
        px="3rem"
        py="1rem"
        align="center"
        justify="center"
        style={title === initialTitle ? active : noActive}
        cursor="pointer"
        border="1px solid #f7f7f7"
        onClick={() => toggle(`${tabName}`)}
      >
        {value}
      </Flex>
    </>
  )
}

export default MainHeading
