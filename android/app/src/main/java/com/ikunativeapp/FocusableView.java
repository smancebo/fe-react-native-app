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
    private boolean _focusState = false;

    public FocusableView(Context context) {
        super(context);
        _context = context;

    }

    static final float FOCUS_SCALE = 1.1f;
    static final float NO_FOCUS_SCALE = 1f;
    static final float FOCUS_OPACITY = 1f;
    static final float NO_FOCUS_OPACITY = 0.7f;


    public void Focus(){

        ScaleView(FOCUS_SCALE, FOCUS_SCALE, FOCUS_OPACITY);

    }

    public void Blur(){


        ScaleView(NO_FOCUS_SCALE,NO_FOCUS_SCALE, NO_FOCUS_OPACITY);

    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        if(isFocus()){
            this.Focus();
        } else {
            this.Blur();
        }

    }

    private void ScaleView(float x, float y, float alpha){



            _pivotX = getWidth() / 2;
            _pivotY = getHeight() / 2;

            this.setPivotX(_pivotX);
            this.setPivotY(_pivotY);

            this.animate().scaleX(x).scaleY(y).alpha(alpha).setDuration(200).start();




    }


    public boolean isFocus() {
        return _focusState;
    }

    public void setFocusState(boolean _focusState) {
        this._focusState = _focusState;
    }
}
