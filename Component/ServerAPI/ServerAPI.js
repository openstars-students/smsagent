import {NativeModules} from 'react-native';

const UserHelper = {
    ConnectServer: (ipServer, myNumber) => {
        return NativeModules.UserHelper.ConnectServer(ipServer,myNumber);
    }
}

export default UserHelper;