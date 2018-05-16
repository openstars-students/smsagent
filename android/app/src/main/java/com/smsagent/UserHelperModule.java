package com.smsagent;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.common.collect.Iterators;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import io.grpc.UserSMS.SendMessage;
import io.grpc.UserSMS.SendMessageOrBuilder;
import io.grpc.UserSMS.SendSMSGrpc;
import io.grpc.UserSMS.UserHelper;
import io.grpc.UserSMS.UserSMS;
import io.grpc.stub.StreamObserver;

import static java.lang.Math.log;

/**
 * Created by root on 14/05/2018.
 */

public class UserHelperModule extends ReactContextBaseJavaModule{
    private ManagedChannel channel;

    public UserHelperModule(ReactApplicationContext reactcontext){
        super(reactcontext);
    }

    @Override
    public String getName() {
        return "UserHelperModule";
    }

    private void SendEvent(String eventName, WritableMap data){
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,data);
    }

    private void SendEvent(String eventName, int id){
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,id);
    }

    @ReactMethod
    public void ConnectServer(final String ipserver, final String Number){
        new Thread(new Runnable() {
            @Override
            public void run() {
                SendMessage request = SendMessage.newBuilder().setToNumber(Number).build();

                ManagedChannel channel2;
                channel2 = ManagedChannelBuilder.forAddress(ipserver,10023)
                        .usePlaintext(true)
                        .build();

                //SendSMSGrpc.SendSMSBlockingStub stub = SendSMSGrpc.newBlockingStub(channel2);
                SendSMSGrpc.SendSMSStub stub2 = SendSMSGrpc.newStub(channel2);
                StreamObserver<SendMessage> con = stub2.send(new StreamObserver<SendMessage>() {
                    @Override
                    public void onNext(SendMessage message) {
                        // Laays du lieu tu server
                        WritableMap dt = Arguments.createMap();
                        dt.putString("Number",message.getToNumber());
                        dt.putString("Content",message.getContent());
                        SendEvent("ServerCall",dt);
                    }

                    @Override
                    public void onError(Throwable t) {
                    }

                    @Override
                    public void onCompleted() {
                    }
                });

                try {
                    con.onNext(request);
                    //con.onCompleted();
                }catch (RuntimeException e){
                    con.onError(e);
                    throw e;
                }
                //WritableMap dt = Arguments.createMap();
                //dt.putString("Number","-1");
                //dt.putString("Content","Connect success");
                //SendEvent("ServerCall",dt);

                try {
                    SendMessage reply;
                }
                catch (StatusRuntimeException e){
                    Log.e("Connect Server : ",e.getMessage());
                }
            }
        }).start();

    }
}
