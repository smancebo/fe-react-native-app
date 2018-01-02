package com.ikunativeapp;

import android.app.Activity;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.AsyncTask;
import android.support.annotation.Nullable;
import android.util.DisplayMetrics;
import android.view.ViewGroup;
import android.webkit.URLUtil;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.VideoView;

import com.facebook.react.bridge.ReactMethod;


import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Map;

/**
 * Created by smancebo on 12/27/17.
 */

public class VideoViewManager extends SimpleViewManager<VideoMainView> {

    private static final String REACT_CLASS = "RCTVideoView";
    private static final int PLAY_VIDEO = 1;
    private static final int PAUSE_VIDEO = 2;
    private static final int SEEK_VIDEO = 3;
    private static final int DISPOSE_VIDEO = 4;

    @Override
    public String getName() {
        return REACT_CLASS;
    }
    ThemedReactContext context;
    Context mActivity;

    public VideoViewManager(Context context){
        this.mActivity = context;
    }

    @Override
    protected VideoMainView createViewInstance(ThemedReactContext reactContext) {
        VideoMainView video = new VideoMainView(reactContext);
        this.context = reactContext;
        return video;
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants(){
        return MapBuilder.builder()
                .put("onReady", MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onReady")))
                .put("onResume", MapBuilder.of("phaseRegistrationNames", MapBuilder.of("bubbled", "onResume")))
                .put("onPaused", MapBuilder.of("phaseRegistrationNames", MapBuilder.of("bubbled", "onPaused")))
                .build();
    }


    @Override
    public Map<String, Integer> getCommandsMap() {

        return MapBuilder.of(
                "play",
                PLAY_VIDEO,
                "pause",
                PAUSE_VIDEO,
                "seek",
                SEEK_VIDEO,
                "dispose",
                DISPOSE_VIDEO
        );
    }

    @Override
    public void receiveCommand(VideoMainView video, int commandId, @javax.annotation.Nullable ReadableArray args) {
        switch (commandId){
            case PLAY_VIDEO:
                    video.Play();
                return;

            case PAUSE_VIDEO:
                    video.Pause();
                return;
            case SEEK_VIDEO:
                    video.Seek(args.getInt(0));
        }
    }

    @ReactProp(name = "source")
    public void setVideoUrl(final VideoMainView video, @Nullable String url){
        if(!url.toString().equals(null) && !url.toString().equals("")){
           video.Load(Uri.parse(url));
        }
    }

}
