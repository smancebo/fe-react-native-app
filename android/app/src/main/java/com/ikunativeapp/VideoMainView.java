package com.ikunativeapp;

import android.content.Context;
import android.graphics.Canvas;
import android.media.MediaPlayer;
import android.media.session.PlaybackState;
import android.net.Uri;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.MediaController;
import android.widget.VideoView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;

import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.extractor.DefaultExtractorsFactory;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.ui.SimpleExoPlayerView;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;


/**
 * Created by smancebo on 12/29/17.
 */

public class VideoMainView extends LinearLayout implements Player.EventListener {


    SimpleExoPlayer _mediaPlayer;
    SimpleExoPlayerView _mediaPlayerView;
    boolean firstTimeLoad;

    Context _context;

    private boolean autoPlay;

    public VideoMainView(Context context) {
        super(context);
        _context = context;
        _mediaPlayer = CreateExoplayer(context);
        _mediaPlayerView = new SimpleExoPlayerView(context);
        _mediaPlayerView.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        _mediaPlayerView.setPlayer(_mediaPlayer);
        firstTimeLoad = true;
        this.addView(_mediaPlayerView);
    }


    SimpleExoPlayer CreateExoplayer(Context context){
        BandwidthMeter banwidthMeter = new DefaultBandwidthMeter();
        TrackSelection.Factory videoTrackSelectionFactory = new AdaptiveTrackSelection.Factory(banwidthMeter);
        TrackSelector trackSelector = new DefaultTrackSelector(videoTrackSelectionFactory);

        return ExoPlayerFactory.newSimpleInstance(context, trackSelector);
    }


    public void Play(){
        if(!isPlaying()){
            _mediaPlayer.setPlayWhenReady(true);
            dispatchEvent("onResume", Arguments.createMap());

        }
    }

    boolean isPlaying(){
        return _mediaPlayer.getPlayWhenReady();
    }

    public void TogglePlayPause(){
        if(isPlaying()){
            this.Pause();
        } else {
            this.Play();
        }
    }

    public void Pause(){
        if(isPlaying()){
            _mediaPlayer.setPlayWhenReady(false);
            dispatchEvent("onPaused", Arguments.createMap());
        }
    }

    public void Seek(long position){
        long duration  = _mediaPlayer.getCurrentPosition();
        _mediaPlayer.seekTo(duration + (position));
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch (keyCode){

            case KeyEvent.KEYCODE_DPAD_RIGHT:
                Seek(5000);
                break;

            case KeyEvent.KEYCODE_DPAD_LEFT:
                Seek(-5000);
                break;

            case KeyEvent.KEYCODE_DPAD_CENTER:
                TogglePlayPause();
                break;

            case KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE:
                TogglePlayPause();
                break;

            case KeyEvent.KEYCODE_MEDIA_FAST_FORWARD:
                Seek(30000);
                break;

            case KeyEvent.KEYCODE_MEDIA_REWIND:
                Seek(-30000);
                break;
        }
        return true;
    }

    public void Load(Uri uri){
        DefaultBandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
        DataSource.Factory datasourceFactory = new DefaultDataSourceFactory(_context,
                Util.getUserAgent(_context, "ikunativeapp"), bandwidthMeter);

        ExtractorsFactory extractorsFactory = new DefaultExtractorsFactory();

        MediaSource videoSource = new ExtractorMediaSource(uri, datasourceFactory, extractorsFactory, null, null);
        _mediaPlayer.prepare(videoSource);
        _mediaPlayer.addListener(this);

    }

    void dispatchEvent(String eventName, WritableMap event){
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), eventName, event);
    }

    public void Dispose(){
        _mediaPlayer.release();
    }

    @Override
    public void onTimelineChanged(Timeline timeline, Object manifest) {

    }

    @Override
    public void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections) {

    }

    @Override
    public void onLoadingChanged(boolean isLoading) {

    }

    @Override
    public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
        switch (playbackState){
            case Player.STATE_READY:
                if(firstTimeLoad){
                    dispatchEvent("onReady", Arguments.createMap());
                    firstTimeLoad = false;
                }
                break;
        }
    }

    @Override
    public void onRepeatModeChanged(@Player.RepeatMode int repeatMode) {

    }

    @Override
    public void onPlayerError(ExoPlaybackException error) {
//        Log.i("Exoplayer Error", error.toString());
        Log.d("Exo player Err", "msg", error);
    }

    @Override
    public void onPositionDiscontinuity() {

    }

    @Override
    public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {

    }
}
