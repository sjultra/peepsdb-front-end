
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import countries from '../utils/timezone-cities.json'

import { deviceDetect } from "react-device-detect";
import { useState, useEffect, useRef } from 'react';


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
            timezone:userTimezone,
            city:userCity,
            country:userCountry,
            region:userRegion
        }
    }


    const [geoLocation, setGeoLocation] = useState(null);

    const setGeoLocationRef = useRef(setGeoLocation)

    

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setGeoLocationRef.current({ latitude, longitude });
                },
                error => {
                    console.log('Error retrieving location:', error);
                }
            );
        } else {
        console.log('Geolocation is not supported by your browser');
        }
    }, []);
    
    function getUserCoordinates() {
        const triggerGeolocation  = ()=>{
                
            if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            return Promise.resolve(null);
            }
        
            return new Promise((resolve, reject) => {
            function success(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const geolocation = {
                latitude,
                longitude
                };
                resolve(geolocation);
            }
        
            function error(errCallback) {
                console.log("Unable to retrieve your location", errCallback);
                reject(errCallback);
            }
        
            navigator.geolocation.getCurrentPosition(success, error);
            });
        }

        const getCoords =async()=>{
            let coords = undefined;
            await triggerGeolocation().then(location=>{
                coords = location
            })
            .catch(err=>{
                console.log('failed to retrieve user coordinates',err)
                return
            })

            return coords;
        
        }

        return getCoords();
    

    }
      

    const device = deviceDetect();




    const userTimezone = getUserTimezone()



    return {
        initializeAzureLogging,
        getUserTimezone,
        getUserCoordinates,
        device,
        userTimezone,
        geoLocation
    }
};


export default useAppInsights;
