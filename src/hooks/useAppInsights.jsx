
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';




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
    }

    return {
        initializeAzureLogging
    }
};


export default useAppInsights;
