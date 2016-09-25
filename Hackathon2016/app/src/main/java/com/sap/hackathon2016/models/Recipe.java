package com.sap.hackathon2016.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class Recipe {

    public Recipe() {}

    public int _id;
    public String name;
    public String description;
    public float rating;
    public String imageThumbnail;
    public String imageBackground;
    public List<String> steps = new ArrayList<>();
    public String userImage;
    public int servingSize;

    public List<String> ingredients = new ArrayList<>();
    public List<String> missingIngredients = new ArrayList<>();
}
