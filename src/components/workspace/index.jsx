import { useState } from 'react';
import ADOProjects from '../ado/ADOProjects';
import JiraLabels from '../jira/JiraLabels';
import MainHeading from '../layouts/MainHeading';

const UserWorkspace = () => {
  // const display = useSelector((state) => state.toggle);
  const [activeScreen,setactiveScreen] = useState('ado');

  const title = activeScreen === 'ado' ? 'ADO Projects' : 'Jira Labels';

  const toggle = (value)=>setactiveScreen(prev=>prev=value)
  
  return (
    <>
      <MainHeading  title={title} {...{toggle}} />
      {activeScreen==='ado' ? <ADOProjects /> : <JiraLabels />}
    </>
  );
};

export default UserWorkspace;
