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

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

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
    Dialog progressDlg;

    public VideoViewManager(Context context){
        this.mActivity = context;
    }

    @Override
    protected VideoView createViewInstance(ThemedReactContext reactContext) {
        VideoView video = new VideoView(reactContext);
        this.context = reactContext;
        this.progressDlg = new ProgressDialog(reactContext);

        video.setMediaController(new MediaController(reactContext));
        video.requestFocus();
        video.setLayoutParams(getFullScreenParams());


        return video;
    }

    @ReactProp(name = "source")
    public void setVideoUrl(final VideoView video, @Nullable String url){
        if(!url.toString().equals(null) && !url.toString().equals("")){
            progressDlg.setTitle("Please Wait");
            progressDlg.show();
            MediaController mediaPlayer = new MediaController(this.context);
            mediaPlayer.setAnchorView(video);
            try {

                Uri uri = Uri.parse((url));

                video.setVideoURI(uri);
                video.setMediaController(mediaPlayer);
                video.requestFocus();


                video.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                    @Override
                    public void onPrepared(MediaPlayer mp) {
                        video.start();
                        progressDlg.hide();
                    }
                });
            }
            catch(Exception e)
            {
                progressDlg.hide();
            }

        }

    }

    @ReactProp(name = "autoplay", defaultBoolean =  true)
    public void setAutoplay(VideoView video, boolean autoplay){
        if(autoplay){
            video.start();
        }
    }


    public static String getDataSource(String path) throws IOException {
        if (!URLUtil.isNetworkUrl(path)) {
            return path;
        } else {
            URL url = new URL(path);
            URLConnection cn = url.openConnection();
            cn.connect();
            InputStream stream = cn.getInputStream();
            if (stream == null)
                throw new RuntimeException("stream is null");
            File temp = File.createTempFile("mediaplayertmp", "dat");
            temp.deleteOnExit();
            String tempPath = temp.getAbsolutePath();
            FileOutputStream out = new FileOutputStream(temp);
            byte buf[] = new byte[128];
            do {
                int numread = stream.read(buf);
                if (numread <= 0)
                    break;
                out.write(buf, 0, numread);
            } while (true);
            try {
                stream.close();
                out.close();
            } catch (IOException ex) {
                //  Log.e(TAG, "error: " + ex.getMessage(), ex);
            }
            return tempPath;
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



    class ExecuteNetwork extends AsyncTask<String, Void, String>{

        @Override
        protected String doInBackground(String... params) {
            return null;
        }
    }

}
