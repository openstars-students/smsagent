import SmsAndroid from 'react-native-sms-android';
import send from '../ServerAPI/ServerAPI.js';

var Send = (number, content) => {
    SmsAndroid.sms(
        number, // phone number to send sms to
        content, // sms body
        'sendDirect', // sendDirect or sendIndirect
        (err, message) => {
            if (err){
                console.log("error", err);
                send.SendNoticeServer("Error send SMS "+message);
            } else {
                console.log(message); // callback message
                send.SendNoticeServer("Send Success");
            }
        }
    );
}

export default Send;