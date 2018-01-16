package com.ikunativeapp;

import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.art.ARTGroupViewManager;


/**
 * Created by smancebo on 1/8/18.
 */

public class FocusableViewManager extends ViewGroupManager<FocusableView> {

    static final String REACT_CLASS = "RCTFocusableView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FocusableView createViewInstance(ThemedReactContext reactContext) {
        FocusableView view = new FocusableView(reactContext);
        view.Blur();
        return view;
    }

    @ReactProp(name="focusView", defaultBoolean = false)
    public void setFocusView(FocusableView view, boolean focusView){
        if(focusView){
            view.Focus();
        } else {
            view.Blur();
        }
    }


}
