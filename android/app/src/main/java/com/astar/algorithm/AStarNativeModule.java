package com.astar.algorithm;

import android.os.Build;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import java.util.Map;
import java.util.HashMap;

class AStarModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    AStarModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AStar";
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void getPath(int side, int sx, int sy, int ex, int ey, ReadableArray blocked) {
//        AStar.runTest(1, side, sx, sy, ex, ey, blocked);
    }
}