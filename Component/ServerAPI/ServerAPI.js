import {NativeModules} from 'react-native';

const UserHelper = {
    ConnectServer: (ipServer, myNumber) => {
        return NativeModules.UserHelperModule.ConnectServer(ipServer,myNumber);
    }
}

export default UserHelper;