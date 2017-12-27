package com.ikunativeapp;

import android.app.Activity;
import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.util.DisplayMetrics;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.VideoView;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by smancebo on 12/27/17.
 */

public class VideoViewManager extends SimpleViewManager<VideoView> {

    public static final String REACT_CLASS = "RCTVideoView";

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
    protected VideoView createViewInstance(ThemedReactContext reactContext) {
        VideoView video = new VideoView(reactContext);
        this.context = reactContext;
        video.setMediaController(new MediaController(reactContext));
        video.requestFocus();
        video.setLayoutParams(getFullScreenParams());

        return video;
    }

    @ReactProp(name = "source")
    public void setVideoUrl(final VideoView video, @Nullable String url){
        if(!url.toString().equals(null) && !url.toString().equals("")){
            video.setVideoPath(url);
            video.setMediaController(new MediaController(this.context));
            video.requestFocus();

            video.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    video.start();
                }
            });
        }

    }

    @ReactProp(name = "autoplay", defaultBoolean =  true)
    public void setAutoplay(VideoView video, boolean autoplay){
        if(autoplay){
            video.start();
        }
    }


    LinearLayout.LayoutParams getFullScreenParams(){
        DisplayMetrics metrics = mActivity.getResources().getDisplayMetrics();
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        params.width = metrics.widthPixels;
        params.height = metrics.heightPixels;
        params.leftMargin = 0;

        return params;
    }


}
