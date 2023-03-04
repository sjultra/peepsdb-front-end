
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import countries from '../utils/timezone-cities.json'




const useAppInsights = ()=>{


    const initializeAzureLogging = ()=>{
    
        let reactPlugin = new ReactPlugin();
        let appInsights = new ApplicationInsights({
            config: {
                connectionString: process.env['REACT_APP_AZURE_INSIGHTS_CONNECTION_STRING'],
                enableAutoRouteTracking: true,
                extensions: [reactPlugin]
            }
        });
        appInsights.loadAppInsights();
    };


    const getUserTimezone = ()=>{
        let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let tzArr = userTimezone.split("/");
        let userRegion = tzArr[0];
        let userCity = tzArr[tzArr.length - 1];
        let userCountry = countries[userCity];
        
        return {
            userTimezone,
            userCity,
            userCountry,
            userRegion
        }
      }
    

    return {
        initializeAzureLogging,
        getUserTimezone
    }
};


export default useAppInsights;
