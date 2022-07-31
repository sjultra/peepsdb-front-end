import React, { useEffect } from 'react';
import Spinner from '../components/layouts/Spinner';
import GuestsDashboard from '../components/dashboard/GuestsDashboard';
import MembersDashboard from '../components/dashboard/MembersDashboard';
import useAuthActions from '../hooks/useAuth';
import useWidget from '../hooks/useWidget'
import Axios from '../utils/axios'

const DashboardScreen = () => {
  // Selectors
  const {auth,setProfile} = useAuthActions();

  const {loading} = useWidget()


  useEffect(()=>{
    (
      async()=>{

        try{
          let req = await Axios.get('/profiles/me');

          console.log('fetch my profile',req);

          req.status===200 && setProfile(req.data,'profile')


        }
        catch(err){
          console.error('err at fectching my profile',err)
        }
        finally{

        }
    })()

  },[setProfile])


  console.log('auth at dashboard Screen',auth)

  if(loading){
    return <Spinner />;
  }
  else if (auth?.token && auth?.role === 'Guest') {
    return <GuestsDashboard />;
  } 
  else if (auth?.token && !auth.role === 'Guest') {
    return <MembersDashboard />;
  } 
  else{
    return <></>
  }
};

export default DashboardScreen;
