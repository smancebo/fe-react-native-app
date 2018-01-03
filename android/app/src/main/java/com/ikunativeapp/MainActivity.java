package com.ikunativeapp;

import com.facebook.react.ReactActivity;
import android.view.KeyEvent; // <--- import
import com.github.kevinejohn.keyevent.KeyEventModule;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ikunativeapp";
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
//        if(event.getRepeatCount() == 0) {
            KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
//        }
        super.onKeyDown(keyCode, event);
        return true;
    }


}
