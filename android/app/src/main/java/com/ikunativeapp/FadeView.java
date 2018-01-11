package com.ikunativeapp;

import android.content.Context;
import android.view.animation.AlphaAnimation;

import com.facebook.react.views.view.ReactViewGroup;

/**
 * Created by smancebo on 1/11/18.
 */

public class FadeView extends ReactViewGroup {

    static final int FADE_IN = 0;
    static final int FADE_OUT = 1;

    public FadeView(Context context) {
        super(context);
        //this.setAlpha(0);
    }

    public void Fade(int value){
        switch(value){
            case FADE_IN:
                fadeIn();
                break;
            case FADE_OUT:
                fadeOut();
                break;
        }
    }

    private void fadeIn(){
        fadeView(0, 1);
    }
    private void fadeOut(){
        fadeView(1, 0);
    }

    private void fadeView(float from, float to){
        AlphaAnimation alphaAnimation = new AlphaAnimation(from, to);
        alphaAnimation.setDuration(200);
        alphaAnimation.setFillAfter(true);

        this.startAnimation(alphaAnimation);
    }
}
