import { authActions, selectAuth } from '../store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { capitalizeString } from '../utils/helpers';
import useAxios from './useAxios';
import { useHistory } from 'react-router-dom';
import useAppInsights from './useAppInsights';

const useAuthActions = () => {
  const { setAuth: set, setProfile: setP, closeWelcome: close } = authActions;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { auth, profile: userProfile, welcome } = useSelector(selectAuth);

  const Axios = useAxios();

  const {getUserTimezone,getUserCoordinates} = useAppInsights();
  const history = useHistory();

  console.log('timezone',getUserTimezone())

  const profile = userProfile? {
    ...userProfile,
    timezone: userProfile?.timezone || getUserTimezone().userTimezone
  }:undefined
  const setAuth = useCallback(
    (payload) => dispatch(set(payload)),
    [dispatch, set]
  );

  const closeWelcome = useCallback(() => dispatch(close()), [dispatch, close]);

  const setProfile = useCallback(
    (payload) => {
      console.log('setting profile', payload);
      dispatch(setP(payload));
    },
    [dispatch, setP]
  );


    const logout = ()=>{
        localStorage.removeItem('peepsdb-auth');
        localStorage.removeItem('first-login');
        setAuth({});
        history.push('/')
    }
    //endpoints
    const updateUser  = async(payload)=>{

        console.log('profile payload',payload)

        let req = await Axios[profile?.profileSetup?'put':'post'](`/profiles?logtype=${profile?.profileSetup?'onboard':'update'}`,payload);
        let {data,status} = req;

        return {
          data:data,
          status
        }

    }
    
    const fetchMyProfile = async(token)=>{

        const locationn = getUserCoordinates();

        console.log("user location",locationn); 

        try{

          setLoading(true)
          let siginStamp = localStorage.getItem('first-login')


          let profileUrl = `profiles/me${siginStamp?'':'?firstLogin=true'}`;

          let req = await Axios.get(profileUrl,{
            ...token?{
                headers:{
                  'Authorization':token,
                  
                }
            }:{}
          });

          !siginStamp &&  localStorage.setItem('first-login',true);
            
          let {data} = req
          
          console.log('result from profile',req)

          req.status===201 && setProfile({
            ...data,
            firstName:capitalizeString(data?.firstName),
            lastName:capitalizeString(data?.lastName)
          })


        }
        catch(err){
          console.error('err at fetching my profile',err)
        }
        finally{
            setLoading(false)
        }
    }
    


  return {
    logout,
    setAuth,
    setProfile,
    updateUser,
    fetchMyProfile,
    setLoading,
    closeWelcome,
    loading,
    auth,
    profile,
    welcome,
  };
};

export default useAuthActions;
