import React from 'react';
import { Box, Input, Flex, useMediaQuery } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';

import { FiFilter } from 'react-icons/fi';
import {
  setJiraTextFilter,
  setJiraAssignedToFilter,
  setJiraStatusFilter,
} from '../../actions/jiraActions';


const fieldValue =   
{
  "expand": "operations,versionedRepresentations,customfield_10041.properties,editmeta,changelog,customfield_10010.requestTypePractice,renderedFields",
  "id": "10495",
  "self": "https://sjultra.atlassian.net/rest/api/3/issue/10495",
  "key": "SJU-535",
  "fields": {
      "statuscategorychangedate": "2022-01-06T08:06:55.148-0700",
      "issuetype": {
          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10023",
          "id": "10023",
          "description": "Tasks track small, distinct pieces of work.",
          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
          "name": "Task",
          "subtask": false,
          "avatarId": 10318,
          "entityId": "099cff3c-96e0-449a-8675-78f904d3beea",
          "hierarchyLevel": 0
      },
      "parent": {
          "id": "10536",
          "key": "SJU-180",
          "self": "https://sjultra.atlassian.net/rest/api/3/issue/10536",
          "fields": {
              "summary": "MCT Project Development & Enhancements",
              "status": {
                  "self": "https://sjultra.atlassian.net/rest/api/3/status/10052",
                  "description": "",
                  "iconUrl": "https://sjultra.atlassian.net/",
                  "name": "Completed Items",
                  "id": "10052",
                  "statusCategory": {
                      "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/3",
                      "id": 3,
                      "key": "done",
                      "colorName": "green",
                      "name": "Done"
                  }
              },
              "priority": {
                  "self": "https://sjultra.atlassian.net/rest/api/3/priority/3",
                  "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/medium.svg",
                  "name": "Medium",
                  "id": "3"
              },
              "issuetype": {
                  "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10024",
                  "id": "10024",
                  "description": "Epics track collections of related bugs, stories, and tasks.",
                  "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
                  "name": "Epic",
                  "subtask": false,
                  "avatarId": 10307,
                  "entityId": "e5cec156-a822-4950-850a-b08d0f1839f7",
                  "hierarchyLevel": 1
              }
          }
      },
      "timespent": null,
      "customfield_10030": null,
      "customfield_10031": null,
      "project": {
          "self": "https://sjultra.atlassian.net/rest/api/3/project/10008",
          "id": "10008",
          "key": "SJU",
          "name": "SJULTRA",
          "projectTypeKey": "software",
          "simplified": true,
          "avatarUrls": {
              "48x48": "https://sjultra.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10552",
              "24x24": "https://sjultra.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10552?size=small",
              "16x16": "https://sjultra.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10552?size=xsmall",
              "32x32": "https://sjultra.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10552?size=medium"
          },
          "projectCategory": {
              "self": "https://sjultra.atlassian.net/rest/api/3/projectCategory/10006",
              "id": "10006",
              "description": "Project related to work for internal backend, sales, or marketing",
              "name": "Internal"
          }
      },
      "fixVersions": [],
      "customfield_10034": "",
      "aggregatetimespent": null,
      "resolution": null,
      "customfield_10035": 0,
      "customfield_10036": null,
      "customfield_10037": null,
      "customfield_10027": null,
      "resolutiondate": null,
      "workratio": -1,
      "lastViewed": null,
      "watches": {
          "self": "https://sjultra.atlassian.net/rest/api/3/issue/SJU-535/watchers",
          "watchCount": 2,
          "isWatching": false
      },
      "customfield_10060": null,
      "created": "2020-11-08T09:52:06.245-0700",
      "customfield_10061": null,
      "customfield_10020": [
          {
              "id": 3,
              "name": "SJULTRA Sprint 3",
              "state": "closed",
              "boardId": 8,
              "goal": "",
              "startDate": "2021-06-17T13:03:43.676Z",
              "endDate": "2021-06-30T06:00:00.000Z",
              "completeDate": "2022-01-06T15:17:07.010Z"
          },
          {
              "id": 4,
              "name": "SJULTRA Sprint 4",
              "state": "closed",
              "boardId": 8,
              "goal": "",
              "startDate": "2022-01-06T16:24:13.632Z",
              "endDate": "2022-01-31T09:21:00.000Z",
              "completeDate": "2022-10-08T01:07:34.400Z"
          }
      ],
      "customfield_10021": null,
      "customfield_10022": "2020-06-29T10:41:45.647-0600",
      "customfield_10023": null,
      "priority": {
          "self": "https://sjultra.atlassian.net/rest/api/3/priority/1",
          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/highest.svg",
          "name": "Highest",
          "id": "1"
      },
      "customfield_10024": [],
      "customfield_10025": null,
      "labels": [
          "APOLLO",
          "Automation",
          "Containers",
          "Sentinel",
          "VZXY"
      ],
      "customfield_10026": null,
      "customfield_10016": null,
      "customfield_10017": null,
      "customfield_10018": {
          "hasEpicLinkFieldDependency": false,
          "showField": false,
          "nonEditableReason": {
              "reason": "PLUGIN_LICENSE_ERROR",
              "message": "The Parent Link is only available to Jira Premium users."
          }
      },
      "customfield_10019": "0|i006pr:",
      "timeestimate": null,
      "aggregatetimeoriginalestimate": null,
      "versions": [],
      "issuelinks": [
          {
              "id": "10495",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10495",
              "type": {
                  "id": "10001",
                  "name": "Cloners",
                  "inward": "is cloned by",
                  "outward": "clones",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10001"
              },
              "inwardIssue": {
                  "id": "11991",
                  "key": "BLOG-60",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/11991",
                  "fields": {
                      "summary": "CLONE - Create Azure Sentinel SIEM Environment",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10093",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "New Ideas",
                          "id": "10093",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/2",
                              "id": 2,
                              "key": "new",
                              "colorName": "blue-gray",
                              "name": "To Do"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/1",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/highest.svg",
                          "name": "Highest",
                          "id": "1"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10047",
                          "id": "10047",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "blog post task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "f59dfc38-559d-409d-9d02-0f19ed6276c9",
                          "hierarchyLevel": 0
                      }
                  }
              }
          },
          {
              "id": "10163",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10163",
              "type": {
                  "id": "10003",
                  "name": "Relates",
                  "inward": "relates to",
                  "outward": "relates to",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10003"
              },
              "outwardIssue": {
                  "id": "10676",
                  "key": "SJU-320",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/10676",
                  "fields": {
                      "summary": "collect and push logs from SaaS to Azure Sentinel",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10047",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "New Tasks - From Backlog",
                          "id": "10047",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/2",
                              "id": 2,
                              "key": "new",
                              "colorName": "blue-gray",
                              "name": "To Do"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/5",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/lowest.svg",
                          "name": "Lowest",
                          "id": "5"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10023",
                          "id": "10023",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "Task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "099cff3c-96e0-449a-8675-78f904d3beea",
                          "hierarchyLevel": 0
                      }
                  }
              }
          },
          {
              "id": "10423",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10423",
              "type": {
                  "id": "10003",
                  "name": "Relates",
                  "inward": "relates to",
                  "outward": "relates to",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10003"
              },
              "inwardIssue": {
                  "id": "11946",
                  "key": "BLOG-18",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/11946",
                  "fields": {
                      "summary": "CLONE of SJU-10 Establish Configuration Management with Ansible for Linux systems",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10093",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "New Ideas",
                          "id": "10093",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/2",
                              "id": 2,
                              "key": "new",
                              "colorName": "blue-gray",
                              "name": "To Do"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/2",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/high.svg",
                          "name": "High",
                          "id": "2"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10047",
                          "id": "10047",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "blog post task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "f59dfc38-559d-409d-9d02-0f19ed6276c9",
                          "hierarchyLevel": 0
                      }
                  }
              }
          },
          {
              "id": "10160",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10160",
              "type": {
                  "id": "10003",
                  "name": "Relates",
                  "inward": "relates to",
                  "outward": "relates to",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10003"
              },
              "inwardIssue": {
                  "id": "10437",
                  "key": "SJU-81",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/10437",
                  "fields": {
                      "summary": "Setup AZ Sentinel [Free Trial]",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10047",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "New Tasks - From Backlog",
                          "id": "10047",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/2",
                              "id": 2,
                              "key": "new",
                              "colorName": "blue-gray",
                              "name": "To Do"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/5",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/lowest.svg",
                          "name": "Lowest",
                          "id": "5"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10023",
                          "id": "10023",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "Task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "099cff3c-96e0-449a-8675-78f904d3beea",
                          "hierarchyLevel": 0
                      }
                  }
              }
          },
          {
              "id": "10161",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10161",
              "type": {
                  "id": "10003",
                  "name": "Relates",
                  "inward": "relates to",
                  "outward": "relates to",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10003"
              },
              "inwardIssue": {
                  "id": "10457",
                  "key": "SJU-101",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/10457",
                  "fields": {
                      "summary": "Azure Sentinel Logging Review",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10049",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "Selected for Development",
                          "id": "10049",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/4",
                              "id": 4,
                              "key": "indeterminate",
                              "colorName": "yellow",
                              "name": "In Progress"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/3",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/medium.svg",
                          "name": "Medium",
                          "id": "3"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10023",
                          "id": "10023",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "Task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "099cff3c-96e0-449a-8675-78f904d3beea",
                          "hierarchyLevel": 0
                      }
                  }
              }
          },
          {
              "id": "10159",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10159",
              "type": {
                  "id": "10003",
                  "name": "Relates",
                  "inward": "relates to",
                  "outward": "relates to",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10003"
              },
              "inwardIssue": {
                  "id": "10366",
                  "key": "SJU-10",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/10366",
                  "fields": {
                      "summary": "Establish Configuration Management with Ansible for Linux systems",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10050",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "Tasks In Progress",
                          "id": "10050",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/4",
                              "id": 4,
                              "key": "indeterminate",
                              "colorName": "yellow",
                              "name": "In Progress"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/1",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/highest.svg",
                          "name": "Highest",
                          "id": "1"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10023",
                          "id": "10023",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "Task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "099cff3c-96e0-449a-8675-78f904d3beea",
                          "hierarchyLevel": 0
                      }
                  }
              }
          },
          {
              "id": "10158",
              "self": "https://sjultra.atlassian.net/rest/api/3/issueLink/10158",
              "type": {
                  "id": "10003",
                  "name": "Relates",
                  "inward": "relates to",
                  "outward": "relates to",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issueLinkType/10003"
              },
              "inwardIssue": {
                  "id": "10770",
                  "key": "SJU-414",
                  "self": "https://sjultra.atlassian.net/rest/api/3/issue/10770",
                  "fields": {
                      "summary": "Deploy Microsoft Defender for Endpoint on Linux with Ansible",
                      "status": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/status/10050",
                          "description": "",
                          "iconUrl": "https://sjultra.atlassian.net/",
                          "name": "Tasks In Progress",
                          "id": "10050",
                          "statusCategory": {
                              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/4",
                              "id": 4,
                              "key": "indeterminate",
                              "colorName": "yellow",
                              "name": "In Progress"
                          }
                      },
                      "priority": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/priority/2",
                          "iconUrl": "https://sjultra.atlassian.net/images/icons/priorities/high.svg",
                          "name": "High",
                          "id": "2"
                      },
                      "issuetype": {
                          "self": "https://sjultra.atlassian.net/rest/api/3/issuetype/10023",
                          "id": "10023",
                          "description": "Tasks track small, distinct pieces of work.",
                          "iconUrl": "https://sjultra.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                          "name": "Task",
                          "subtask": false,
                          "avatarId": 10318,
                          "entityId": "099cff3c-96e0-449a-8675-78f904d3beea",
                          "hierarchyLevel": 0
                      }
                  }
              }
          }
      ],
      "assignee": {
          "self": "https://sjultra.atlassian.net/rest/api/3/user?accountId=61ef10ce78b7fd0072d13d20",
          "accountId": "61ef10ce78b7fd0072d13d20",
          "emailAddress": "mike@sjultra.com",
          "avatarUrls": {
              "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/61ef10ce78b7fd0072d13d20/6a8dcca3-a120-4cb4-a32b-b3b4ccc3c27e/48",
              "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/61ef10ce78b7fd0072d13d20/6a8dcca3-a120-4cb4-a32b-b3b4ccc3c27e/24",
              "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/61ef10ce78b7fd0072d13d20/6a8dcca3-a120-4cb4-a32b-b3b4ccc3c27e/16",
              "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/61ef10ce78b7fd0072d13d20/6a8dcca3-a120-4cb4-a32b-b3b4ccc3c27e/32"
          },
          "displayName": "Mike Hamanaka",
          "active": true,
          "timeZone": "US/Pacific",
          "accountType": "atlassian"
      },
      "updated": "2023-05-21T16:04:44.342-0600",
      "status": {
          "self": "https://sjultra.atlassian.net/rest/api/3/status/10047",
          "description": "",
          "iconUrl": "https://sjultra.atlassian.net/",
          "name": "New Tasks - From Backlog",
          "id": "10047",
          "statusCategory": {
              "self": "https://sjultra.atlassian.net/rest/api/3/statuscategory/2",
              "id": 2,
              "key": "new",
              "colorName": "blue-gray",
              "name": "To Do"
          }
      },
      "components": [],
      "customfield_10050": null,
      "customfield_10051": null,
      "timeoriginalestimate": null,
      "customfield_10052": null,
      "description": {
          "version": 1,
          "type": "doc",
          "content": [
              {
                  "type": "paragraph",
                  "content": [
                      {
                          "type": "text",
                          "text": "In order to",
                          "marks": [
                              {
                                  "type": "strong"
                              }
                          ]
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "==="
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "provide SIEM capabilities for MCT EnvTags"
                      }
                  ]
              },
              {
                  "type": "paragraph",
                  "content": [
                      {
                          "type": "text",
                          "text": "We will",
                          "marks": [
                              {
                                  "type": "strong"
                              }
                          ]
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "==="
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "1. configure Azure Sentinel "
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "2. share the link and install instructions for Sentinel linux agents"
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "3. fork the code to SJULTRA GitHub Repo repository"
                      }
                  ]
              },
              {
                  "type": "paragraph",
                  "content": [
                      {
                          "type": "text",
                          "text": "This is done when",
                          "marks": [
                              {
                                  "type": "strong"
                              }
                          ]
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "==="
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "There is a google doc that captures the process so far."
                      }
                  ]
              },
              {
                  "type": "paragraph",
                  "content": [
                      {
                          "type": "text",
                          "text": "Next Steps",
                          "marks": [
                              {
                                  "type": "strong"
                              }
                          ]
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "==="
                      },
                      {
                          "type": "hardBreak"
                      },
                      {
                          "type": "text",
                          "text": "Configure connectors to pull list of user, service accounts, and audit logs for:"
                      }
                  ]
              },
              {
                  "type": "bulletList",
                  "content": [
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Bitbucket, Jira, Confluence, Atlassian Access"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Google GCP"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Microsoft Azure"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Microsoft Azure DevOps"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Microsoft Office 365"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Asana"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Qualys (reference Splunk TA - "
                                      },
                                      {
                                          "type": "text",
                                          "text": "https://splunkbase.splunk.com/app/2964/",
                                          "marks": [
                                              {
                                                  "type": "link",
                                                  "attrs": {
                                                      "href": "https://splunkbase.splunk.com/app/2964/"
                                                  }
                                              }
                                          ]
                                      },
                                      {
                                          "type": "hardBreak"
                                      },
                                      {
                                          "type": "text",
                                          "text": "https://techcommunity.microsoft.com/t5/azure-sentinel/integrating-qualys-with-sentinel/m-p/1410562",
                                          "marks": [
                                              {
                                                  "type": "link",
                                                  "attrs": {
                                                      "href": "https://techcommunity.microsoft.com/t5/azure-sentinel/integrating-qualys-with-sentinel/m-p/1410562"
                                                  }
                                              }
                                          ]
                                      },
                                      {
                                          "type": "text",
                                          "text": ")"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Prisma (reference Splunk TA - "
                                      },
                                      {
                                          "type": "text",
                                          "text": "https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin/configure-external-integrations-on-prisma-cloud/integrate-prisma-cloud-with-splunk",
                                          "marks": [
                                              {
                                                  "type": "link",
                                                  "attrs": {
                                                      "href": "https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin/configure-external-integrations-on-prisma-cloud/integrate-prisma-cloud-with-splunk"
                                                  }
                                              }
                                          ]
                                      },
                                      {
                                          "type": "hardBreak"
                                      },
                                      {
                                          "type": "text",
                                          "text": "https://techcommunity.microsoft.com/t5/azure-sentinel/connecting-prisma-to-sentinel/m-p/1408693?lightbox-message-images-1408693=193567i0A302657D2DB8163",
                                          "marks": [
                                              {
                                                  "type": "link",
                                                  "attrs": {
                                                      "href": "https://techcommunity.microsoft.com/t5/azure-sentinel/connecting-prisma-to-sentinel/m-p/1408693?lightbox-message-images-1408693=193567i0A302657D2DB8163"
                                                  }
                                              }
                                          ]
                                      },
                                      {
                                          "type": "text",
                                          "text": ")"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Carbon Black Defense (reference Splunk TA - "
                                      },
                                      {
                                          "type": "text",
                                          "text": "https://splunkbase.splunk.com/app/3905/)",
                                          "marks": [
                                              {
                                                  "type": "link",
                                                  "attrs": {
                                                      "href": "https://splunkbase.splunk.com/app/3905/)"
                                                  }
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Sentinel One "
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "AWS"
                                      }
                                  ]
                              }
                          ]
                      },
                      {
                          "type": "listItem",
                          "content": [
                              {
                                  "type": "paragraph",
                                  "content": [
                                      {
                                          "type": "text",
                                          "text": "Service Now"
                                      }
                                  ]
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      "customfield_10053": null,
      "customfield_10054": null,
      "customfield_10010": null,
      "customfield_10055": null,
      "customfield_10056": null,
      "customfield_10057": null,
      "customfield_10014": null,
      "customfield_10058": null,
      "customfield_10015": null,
      "customfield_10059": null,
      "customfield_10005": null,
      "customfield_10049": null,
      "customfield_10006": null,
      "customfield_10007": null,
      "security": null,
      "customfield_10008": null,
      "customfield_10009": null,
      "aggregatetimeestimate": null,
      "summary": "Create Azure Sentinel SIEM Environment",
      "creator": {
          "self": "https://sjultra.atlassian.net/rest/api/3/user?accountId=5f96f469c9b15a0078974870",
          "accountId": "5f96f469c9b15a0078974870",
          "emailAddress": "adrian@sjultra.com",
          "avatarUrls": {
              "48x48": "https://secure.gravatar.com/avatar/1f4e6cda634bb895ae0a9f205685658d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAB-2.png",
              "24x24": "https://secure.gravatar.com/avatar/1f4e6cda634bb895ae0a9f205685658d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAB-2.png",
              "16x16": "https://secure.gravatar.com/avatar/1f4e6cda634bb895ae0a9f205685658d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAB-2.png",
              "32x32": "https://secure.gravatar.com/avatar/1f4e6cda634bb895ae0a9f205685658d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FAB-2.png"
          },
          "displayName": "Adrian Bora",
          "active": false,
          "timeZone": "America/Denver",
          "accountType": "atlassian"
      },
      "subtasks": [],
      "customfield_10040": null,
      "customfield_10041": null,
      "customfield_10042": null,
      "reporter": {
          "self": "https://sjultra.atlassian.net/rest/api/3/user?accountId=5dc2d2f9e3cc320c5e8a7b04",
          "accountId": "5dc2d2f9e3cc320c5e8a7b04",
          "emailAddress": "geoff@sjultra.com",
          "avatarUrls": {
              "48x48": "https://secure.gravatar.com/avatar/8b68e7fa7107e141963837a58a469f73?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGU-2.png",
              "24x24": "https://secure.gravatar.com/avatar/8b68e7fa7107e141963837a58a469f73?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGU-2.png",
              "16x16": "https://secure.gravatar.com/avatar/8b68e7fa7107e141963837a58a469f73?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGU-2.png",
              "32x32": "https://secure.gravatar.com/avatar/8b68e7fa7107e141963837a58a469f73?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FGU-2.png"
          },
          "displayName": "Geoff Uyleman",
          "active": true,
          "timeZone": "America/Denver",
          "accountType": "atlassian"
      },
      "customfield_10043": null,
      "aggregateprogress": {
          "progress": 0,
          "total": 0
      },
      "customfield_10044": null,
      "customfield_10000": "{}",
      "customfield_10001": null,
      "customfield_10045": null,
      "customfield_10046": null,
      "customfield_10002": null,
      "customfield_10003": null,
      "customfield_10047": null,
      "customfield_10004": null,
      "customfield_10048": null,
      "customfield_10038": null,
      "customfield_10039": null,
      "environment": null,
      "duedate": null,
      "progress": {
          "progress": 0,
          "total": 0
      },
      "votes": {
          "self": "https://sjultra.atlassian.net/rest/api/3/issue/SJU-535/votes",
          "votes": 0,
          "hasVoted": false
      }
  }
}

const Filter = ({ issues }) => {
  // Styles
  const [is500px] = useMediaQuery('(max-width: 500px)');

  const wrapperStyles = {
    justifyContent: 'space-between',
    alignItems: 'center',
    bg: '#fcfcfc',
    h: 'auto',
    mt: '4rem',
    p: is500px ? '0 1.5rem' : '0 2.5rem',
    borderRadius: '0.4rem',
    border: '1px solid #f7f7f7',
    sx: {
      '-ms-scrollbar-width': 'none' /* IE 11 */,
      'scrollbar-width': 'none' /* Firefox 64 */,
      '&::-webkit-scrollbar': {
        width: '0',
      },
    },
  };

  const filterInputStyles = {
    p: '2rem 1.5rem',
    w: '25rem',
    ml: '3px',
    fontSize: '1.6rem',
    outline: 'none',
    border: 'none',
    borderRadius: '100px',
    bg: '#f8f7ff',
    _focus: {
      boxShadow: 'none',
    },
  };

  const selectBoxStyles = {
    position: 'relative',
    h: '100%',
    w: '100%',
    flexDirection: 'row',
  };

  const selectStyles = {
    w: 'auto',
    h: '100%',
    p: '1.5rem',
    borderRadius: '0.3rem',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif !important",
    fontSize: '1.6rem',
    bg: 'none',
    border: 'none',
    outline: 'none',
    _hover: {
      bg: '#e9e7f5',
    },
    _focus: {
      bg: '#e3e1f1',
    },
  };

  const dispatch = useDispatch();

  // Selectors
  const filters = useSelector((state) => state.jiraFilter);

  const { text, assignedTo, status } = filters;

  const onChangeText = (e) => {
    dispatch(setJiraTextFilter(e.target.value));
  };

  // ASSIGNED TO FILTER
  let uniqueAssignedToArr;
  if (issues) {

    console.log('issues field mapped',issues[0])

    const assignedToArr = issues.map((item) =>
      item.fields.assignee.displayName
        ? item.fields.assignee.displayName
        : 'Unassigned'
    );
    uniqueAssignedToArr = [...new Set(assignedToArr)];
  }

  const onChangeAssignedTo = (e) => {
    dispatch(setJiraAssignedToFilter(e.target.value));
  };

  // STATUS FILTER
  let uniqueStatusArr;
  if (issues) {
    const statusArr = issues.map((item) => item.fields.status);
    uniqueStatusArr = [...new Set(statusArr)];
  }

  const onChangeStatus = (e) => {
    dispatch(setJiraStatusFilter(e.target.value));
  };

  return (
    <Flex {...wrapperStyles}>
      <Flex flexDirection="row" alignitems="center">
        <Box as={FiFilter} mt="1rem" mr="0.4rem" fontSize="2rem" />
        <Input
          {...filterInputStyles}
          type="text"
          placeholder="Filter by keyword"
          value={text}
          onChange={(e) => onChangeText(e)}
        />
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        {/* Assigned To */}
        <Flex {...selectBoxStyles}>
          <Box
            as="select"
            {...selectStyles}
            name="assigned"
            value={assignedTo}
            onChange={(e) => onChangeAssignedTo(e)}
          >
            <option value="">Assigned To</option>
            {uniqueAssignedToArr &&
              uniqueAssignedToArr.map((username, index) => (
                <option value={username} key={index}>
                  {username}
                </option>
              ))}
          </Box>
        </Flex>
        {/* Status */}
        <Flex {...selectBoxStyles}>
          <Box
            as="select"
            {...selectStyles}
            name="status"
            value={status}
            onChange={(e) => onChangeStatus(e)}
          >
            <option value="">Status</option>
            {uniqueStatusArr &&
              uniqueStatusArr.map((status, index) => (
                <option value={status} key={index}>
                  {status}
                </option>
              ))}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Filter;
