import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Stack } from "@chakra-ui/react"

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .ado,
  .jira {
    width: 10rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: black;

    @media (max-width: 800px) {
      width: 9rem;
      height: 4.5rem;
    }

    @media (max-width: 600px) {
      width: 8rem;
      height: 4rem;
    }

    @media (max-width: 500px) {
      width: 7.5rem;
      height: 3.75rem;
    }
  }

  .ado:first-child {
    border-radius: 3rem 0 0 3rem;
  }

  .jira:last-child {
    border-radius: 0 3rem 3rem 0;
  }
`;

const ToggleStyle = styled.div`
  background: ${(props) =>
    (props?.title === props?.initialTitle ? "rgba(95, 85, 239, 0.75)" : "#fcfcfc")};
  color: ${(props) => (props?.title === props?.initialTitle ? "#fff !important" : "#000 !important")};
  font-weight: ${(props) => (props?.title === props?.initialTitle ? "600" : "#400")};
  border: ${(props) => (props?.title === props?.initialTitle ? "" : "1px solid #f7f7f7")};
`;

const MainHeading = ({ title, toggle }) => {
  // Selectors
  const display = useSelector((state) => state.toggle);

  const defaultTitle = display.ado ? 'ADO Projects' : 'Jira Labels';

  return (
    <Stack direction="row" alignItems="center" justify={"space-between"} mt="6">
      <h1 className="text-primary">{title ? title : defaultTitle}</h1>
      <Toggle>
        <ToggleStyle
          className="ado"
          title={title ? title : defaultTitle}
          initialTitle='ADO Projects'
          onClick={() => toggle("ado")}>
          ADO
        </ToggleStyle>
        <ToggleStyle
          className="jira"
          title={title ? title : defaultTitle}
          initialTitle='Jira Labels'
          onClick={() => toggle("jira")}>
          JIRA
        </ToggleStyle>
      </Toggle>
    </Stack>
  )
}

export default MainHeading