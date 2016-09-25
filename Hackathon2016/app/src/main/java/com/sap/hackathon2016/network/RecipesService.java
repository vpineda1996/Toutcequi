package com.sap.hackathon2016.network;

import com.sap.hackathon2016.models.LoginRequest;
import com.sap.hackathon2016.models.Recipe;
import com.sap.hackathon2016.models.TokenResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * Created by Chris Li on 2016-09-24.
 */
public interface RecipesService {

    @GET("/api/recipes/")
    Call<List<Recipe>> getRecipes();

    @GET("/api/recipes/getrecipes?")
    Call<List<Recipe>> getRecipes(@Query("ingredients")String ingredients);

    @POST("/auth/local")
    Call<TokenResponse> login(@Body LoginRequest loginRequest);


}
