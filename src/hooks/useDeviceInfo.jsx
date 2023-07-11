import { deviceDetect, isMobile } from 'react-device-detect';
import  Axios from './useAxios';



const useDeviceMetaData = ()=>{

    const device = deviceDetect();

    const clientType = isMobile?'Mobile':'Web'

    const axios = Axios();

    const timeandDateBaseUrl = 'http://api.xmltime.com/places';

    const getUserLocation = async ()=>{

        try{
            let req = await axios.get(timeandDateBaseUrl+
             `?version=1&pettyprint=1&accessKey=${process.env['REACT_APP_DATE_AND_TIME_ACCESS_KEY']}secretKey=${process.env['REACT_APP_DATE_AND_TIME_SECRET_KEY']}`,{
            });

            const {data} = req;

            console.log('time and date data',data)
        }
        catch(err){
            console.log('error Caught',err)
        }

    }



    return {
        device:{
            ...device,
            clientType
        },
        getUserLocation        
    }
    
}

export default useDeviceMetaData;