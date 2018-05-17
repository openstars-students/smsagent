import {NativeModules} from 'react-native';

const UserHelper = {
    ConnectServer: (ipServer, myNumber) => {
        return NativeModules.UserHelperModule.ConnectServer(ipServer,myNumber);
    },
    SendNoticeServer: (content) => {
        return NativeModules.UserHelperModule.SendNoticeServer(content);
    }
}

export default UserHelper;