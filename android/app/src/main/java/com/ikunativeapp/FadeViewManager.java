package com.ikunativeapp;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by smancebo on 1/11/18.
 */

public class FadeViewManager extends ViewGroupManager<FadeView> {

    static final String REACT_CLASS = "RCTFadeView";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FadeView createViewInstance(ThemedReactContext reactContext) {
        return new FadeView(reactContext);
    }

    @ReactProp(name="fade")
    public void FadeView(FadeView view, @Nullable String fadeDirection){
        if(fadeDirection.toString().equals("in")){
            view.Fade(FadeView.FADE_IN);
        } else if(fadeDirection.toString().equals("out")){
            view.Fade(FadeView.FADE_OUT);
        } else {
            view.Fade(FadeView.FADE_OUT);
        }
    }
}
