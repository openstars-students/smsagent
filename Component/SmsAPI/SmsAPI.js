import SmsAndroid from 'react-native-sms-android';

var Send = (number, content) => {
    console.log('Sendsms ',number, content);
    SmsAndroid.sms(
        number, // phone number to send sms to
        content, // sms body
        'sendDirect', // sendDirect or sendIndirect
        (err, message) => {
            if (err){
            console.log("error", err);
            } else {
            console.log(message); // callback message
            }
            console.log(message);
        }
    );
}

export default Send;

// import SendSMS from 'react-native-sms';

// function Send(number, content){
//     console.log('Sendsms ',number, content);
//     SendSMS.send({
// 		body: content,
// 		recipients: [number],
// 		successTypes: ['sent']
// 	}, (completed, cancelled, error) => {

// 		console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

// 	});
// }

// export default Send;