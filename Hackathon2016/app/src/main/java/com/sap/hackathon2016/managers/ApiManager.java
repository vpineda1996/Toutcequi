package com.sap.hackathon2016.managers;

import com.google.gson.GsonBuilder;
import com.sap.hackathon2016.BuildConfig;
import com.sap.hackathon2016.network.RecipesService;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class ApiManager {

    private static ApiManager sInstance;


    private RecipesService mRecipesService;

    public static ApiManager getInstance() {

        if (sInstance == null) {
            sInstance = init();
        }

        return sInstance;
    }

    private static synchronized ApiManager init() {
        return new ApiManager();
    }

    private ApiManager() {
        Retrofit retrofit = buildRetrofitAdapter();
        mRecipesService = retrofit.create(RecipesService.class);
    }

    private Retrofit buildRetrofitAdapter() {

        Retrofit.Builder retrofitBuilder = new Retrofit.Builder()
                .baseUrl("http://10.10.32.153:3000/");

        OkHttpClient.Builder builder = new OkHttpClient().newBuilder();
        if (BuildConfig.DEBUG) {
            HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
            loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
            builder.addInterceptor(loggingInterceptor);
        }

        OkHttpClient okHttpClient = builder.build();

        return retrofitBuilder
                .addConverterFactory(GsonConverterFactory.create(new GsonBuilder().setLenient().create()))
                .client(okHttpClient)
                .build();
    }


    public RecipesService getRecipesService() {
        return mRecipesService;
    }

}
