package com.idrass.leanback.tvapp;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v17.leanback.app.BrowseFragment;
import android.util.Log;

/**
 * Created by smancebo on 1/2/18.
 */

public class MainFragment extends BrowseFragment {

    private static final String TAG = MainFragment.class.getSimpleName() ;

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        Log.i(TAG, "onActivityCreated" );
        super.onActivityCreated(savedInstanceState);
        setupUiElements();
    }

    private void setupUiElements(){
        setTitle("Hello Android TV");
        setHeadersState(HEADERS_DISABLED);
        setHeadersTransitionOnBackEnabled(true);

        setBrandColor(getResources().getColor(R.color.fastlane_background));
        setSearchAffordanceColor(getResources().getColor(R.color.search_opaque));
    }
}
