package com.ikunativeapp;


import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.ScaleAnimation;
import android.widget.LinearLayout;

import com.facebook.react.views.view.ReactViewGroup;

/**
 * Created by smancebo on 1/8/18.
 */

public class FocusableView extends ReactViewGroup {
    Context _context;
    float _pivotX;
    float _pivotY;
    public FocusableView(Context context) {
        super(context);
        _context = context;
    }

    static final float FOCUS_SCALE = 1.1f;
    static final float NO_FOCUS_SCALE = 1f;
    static final float FOCUS_OPACITY = 1f;
    static final float NO_FOCUS_OPACITY = 0.7f;


    public void Focus(){

        ScaleView(NO_FOCUS_SCALE, FOCUS_SCALE, NO_FOCUS_SCALE, FOCUS_SCALE, NO_FOCUS_OPACITY, FOCUS_OPACITY);

    }

    public void Blur(){

        ScaleView(FOCUS_SCALE, NO_FOCUS_SCALE, FOCUS_SCALE, NO_FOCUS_SCALE, FOCUS_OPACITY, NO_FOCUS_OPACITY);

    }


    private void ScaleView(float fromX, float toX, float fromY, float toY, float alphaFrom, float alphaTo){
        Log.d("ScaleWidth", String.valueOf(getWidth()));


        if( getWidth() > 0) {


            _pivotX = getWidth() / 2;
            _pivotY = getHeight() / 2;


            AnimationSet animation = new AnimationSet(false);

            ScaleAnimation scale = new ScaleAnimation(fromX, toX, fromY, toY, _pivotX, _pivotY);
            scale.setFillAfter(true);
            scale.setDuration(200);
            scale.setStartTime(0);

            AlphaAnimation alpha = new AlphaAnimation(alphaFrom, alphaTo);

            alpha.setDuration(200);
            alpha.setFillAfter(true);
            alpha.setStartTime(200);

            animation.setFillAfter(true);
            animation.addAnimation(scale);
            animation.addAnimation(alpha);

            this.startAnimation(animation);
        }


    }




}
