package com.sap.hackathon2016.managers;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class SessionManager {

    private static final String SHARED_PREFS_NAME = "session_preferences";

    private static final String SESSION_TOKEN_KEY = "session_token_key";

    private static SessionManager sInstance;

    private SharedPreferences mSharedPreferences;

    public static SessionManager getInstance(Context context) {

        if (sInstance == null) {
            sInstance = init(context);
        }

        return sInstance;
    }

    private static synchronized SessionManager init(Context context) {
        return new SessionManager(context);
    }

    private SessionManager(Context context) {
        mSharedPreferences = context.getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE);
    }

    public String getToken() {
        return mSharedPreferences.getString(SESSION_TOKEN_KEY, null);
    }

    public void updateToken(String jwt) {
        if (!TextUtils.isEmpty(jwt)) {
            String currentToken = mSharedPreferences.getString(SESSION_TOKEN_KEY, null);
            if (!jwt.equals(currentToken)) {
                SharedPreferences.Editor editor = mSharedPreferences.edit();
                editor.putString(SESSION_TOKEN_KEY, jwt);
                editor.commit();
            }
        }
    }

    public boolean isLoggedIn() {
        return mSharedPreferences.getString(SESSION_TOKEN_KEY, null) != null;
    }

}
