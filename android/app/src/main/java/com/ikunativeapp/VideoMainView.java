package com.ikunativeapp;

import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.widget.MediaController;
import android.widget.VideoView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;

import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by smancebo on 12/29/17.
 */

public class VideoMainView extends VideoView {


    MediaPlayer _mediaPlayer;
    private boolean autoPlay;

    public VideoMainView(Context context) {
        super(context);

        MediaController mediaController = new MediaController(context);
        mediaController.setAnchorView(this);
        this.setMediaController(mediaController);
    }

    public void Play(){
        if(!isPlaying()){
            _mediaPlayer.start();
            dispatchEvent("onResume", Arguments.createMap());
        }
    }

    public void TogglePlayPause(){
        if(canPause()){
            this.Pause();
        } else {
            this.Play();
        }
    }

    public void Pause(){
        if(this.canPause()){
            this._mediaPlayer.pause();
            dispatchEvent("onPaused", Arguments.createMap());
        }
    }

    public void Seek(int position){

    }

    public void Load(Uri uri){
        this.setVideoURI(uri);
        this.requestFocus();
        this.setZOrderOnTop(true);
        this.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mp) {
                _mediaPlayer = mp;
//                if(isAutoPlay()){
                    //start();
//                }
                dispatchEvent("onReady", Arguments.createMap());
            }
        });
    }

    void dispatchEvent(String eventName, WritableMap event){
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), eventName, event);
    }

    public boolean isAutoPlay() {
        return autoPlay;
    }

    public void setAutoPlay(boolean autoPlay) {
        this.autoPlay = autoPlay;
    }
}
