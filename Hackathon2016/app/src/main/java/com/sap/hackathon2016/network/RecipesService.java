package com.sap.hackathon2016.network;

import com.sap.hackathon2016.models.Recipe;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

/**
 * Created by Chris Li on 2016-09-24.
 */
public interface RecipesService {

    @GET("/api/recipes/")
    Call<List<Recipe>> getRecipes();

}
