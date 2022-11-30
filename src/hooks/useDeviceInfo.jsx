const { deviceDetect, isMobile } = require('react-device-detect');

const useDeviceInfo = ()=>{



    const device = deviceDetect();
    const clientType = isMobile?'Mobile':'Web'

    return {
        device:{
            ...device,
            clientType
        }        
    }
    
}

export default useDeviceInfo;