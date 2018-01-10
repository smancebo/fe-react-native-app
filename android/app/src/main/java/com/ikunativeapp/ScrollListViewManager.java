package com.ikunativeapp;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by smancebo on 1/9/18.
 */

public class ScrollListViewManager extends ViewGroupManager<ScrollListView> {
    static final String REACT_CLASS = "RCTScrollList";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ScrollListView createViewInstance(ThemedReactContext reactContext) {
        return new ScrollListView(reactContext);
    }

    @ReactProp(name="movePosition", defaultInt = 0)
    public void setPosition(ScrollListView view, int position){
        view.scrollList(position);
    }

    @ReactProp(name="moveValue", defaultFloat = 0)
    public void setMoveValue(ScrollListView view, float moveValue){
        view.setMoveValue(moveValue);
    }

    @ReactProp(name="direction")
    public void setDirection(ScrollListView view, @Nullable String direction){
        if(direction.equals(null)){
            view.setDirection(ScrollListView.Direction.HORIZONTAL);
        } else if(direction.equals("horizontal")){
            view.setDirection(ScrollListView.Direction.HORIZONTAL);
        } else if(direction.equals("vertical")){
            view.setDirection(ScrollListView.Direction.VERTICAL);
        }
    }

    @ReactProp(name="offsetX", defaultFloat = 0)
    public void setOffsetX(ScrollListView view, float offsetX){
        view.setOffsetX(offsetX);
    }

    @ReactProp(name="offsetY", defaultFloat = 0)
    public void setOffsetY(ScrollListView view, float offsetY){
        view.setOffsetY(offsetY);
    }

    @ReactProp(name="offsetElement", defaultInt = 0)
    public void setTiggerElement(ScrollListView view, int offsetElement){
        view.setOffsetElement(offsetElement);
    }


}
