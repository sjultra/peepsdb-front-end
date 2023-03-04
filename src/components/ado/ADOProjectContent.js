import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Paginate from "../../widgets/Paginate";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 6rem;

  @media (max-width: 1400px) {
    grid-gap: 4rem;
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-gap: 3rem;
  }

  @media (max-width: 900px) {
    grid-gap: 2rem;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
  }

  @media (max-width: 600px) {
    grid-gap: 2rem;
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WorkItem = styled.div`
  background: rgba(95, 85, 239, 0.07);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 3px #e8e8e8;
  cursor: pointer;
`;

const ProjectName = styled.div`
  font-size: 2.8rem;
  font-weight: 500;

  @media (max-width: 1000px) {
    font-size: 2.6rem;
  }

  @media (max-width: 600px) {
    font-size: 2.3rem;
  }
`;

const WorkItemsCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4rem;

  div:first-child {
    background: #fff;
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;
    font-size: 2.1rem;
    font-weight: 600;

    @media (max-width: 600px) {
      font-size: 1.9rem;
    }

    @media (max-width: 450px) {
      width: 5rem;
      height: 5rem;
    }
  }

  div:last-child {
    font-size: 2.1rem;
    font-weight: 400;

    @media (max-width: 600px) {
      font-size: 1.9rem;
    }
  }
`;

const ADOProjectContent = ({ projects: projectsArr, search, workItems }) => {
  return (
    <Paginate
      payload={projectsArr}
      range={8}
      render={(projects) => (
        <Wrapper>
          {projects &&
            projects
              .filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project, index) => {
                return (
                  <Link key={index} to={`/ado_workitems/${project.name}`}>
                    <WorkItem>
                      <ProjectName>{project.name}</ProjectName>
                      <WorkItemsCount>
                        <div>
                          {workItems
                            ? workItems.filter(
                                (item) =>
                                  item.fields.teamProject === project.name
                              ).length
                            : "-"}
                        </div>
                        <div>Work Items</div>
                      </WorkItemsCount>
                    </WorkItem>
                  </Link>
                );
              })}
        </Wrapper>
      )}
    />
  );
};

export default ADOProjectContent;
