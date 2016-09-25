package com.sap.hackathon2016;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.sap.hackathon2016.managers.ApiManager;
import com.sap.hackathon2016.managers.SessionManager;
import com.sap.hackathon2016.models.Recipe;
import com.sap.hackathon2016.utils.RoundedTransformation;
import com.squareup.picasso.Picasso;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import pl.aprilapps.easyphotopicker.DefaultCallback;
import pl.aprilapps.easyphotopicker.EasyImage;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class CreateRecipeActivity extends AppCompatActivity {

    private static final String TAG = CreateRecipeActivity.class.getSimpleName();

    @BindView(R.id.post_title)
    EditText mRecipeTitle;
    @BindView(R.id.post_description)
    EditText mRecipeDescription;
    @BindView(R.id.post_ingredient_input)
    EditText mRecipeIngredients;
    @BindView(R.id.post_step_input)
    EditText mRecipeSteps;
    @BindView(R.id.ingredients_container)
    LinearLayout mIngredientsContainer;
    @BindView(R.id.steps_container)
    LinearLayout mStepsContainer;
    @BindView(R.id.recipe_image)
    ImageView mRecipeImage;

    private ProgressDialog mProgressDialog;

    private File mRecipeImageFile = null;
    private List<String> mSteps = new ArrayList<>();
    private List<String> mIngredients = new ArrayList<>();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_recipe);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.back_icon)
    public void onBackIconPressed() {
        onBackPressed();
    }

    @OnClick(R.id.add_ingredient)
    public void onAddIngredientClicked() {
        String ingredient = mRecipeIngredients.getText().toString().trim();
        if (!TextUtils.isEmpty(ingredient)) {
            mIngredients.add(ingredient.toLowerCase());
            TextView ingredientTextView = new TextView(this);
            ingredientTextView.setTextSize(16);
            ingredientTextView.setTextColor(Color.DKGRAY);
            ingredientTextView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
            ingredientTextView.setText("- " + ingredient);
            mIngredientsContainer.addView(ingredientTextView);
            mRecipeIngredients.setText("");
        }
    }

    @OnClick(R.id.add_step)
    public void onAddStepClicked() {
        String step = mRecipeSteps.getText().toString().trim();
        if (!TextUtils.isEmpty(step)) {
            mSteps.add(step);
            TextView stepTextView = new TextView(this);
            stepTextView.setTextSize(16);
            stepTextView.setTextColor(Color.DKGRAY);
            stepTextView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));
            int childCount = mStepsContainer.getChildCount() + 1;
            stepTextView.setText(childCount + ". " + step);
            mStepsContainer.addView(stepTextView);
            mRecipeSteps.setText("");
        }
    }

    @OnClick(R.id.recipe_image)
    public void onAddImage() {
        EasyImage.openChooserWithGallery(this, "Upload a recipe image", 0);
    }

    @OnClick(R.id.add_recipe_button)
    public void onAddRecipe() {
        String recipeName = mRecipeTitle.getText().toString();
        String recipeDescription = mRecipeDescription.getText().toString();
        if (TextUtils.isEmpty(recipeName)) {
            Toast.makeText(this, "Please input a recipe name", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(recipeDescription)) {
            Toast.makeText(this, "Please input a recipe description", Toast.LENGTH_SHORT).show();
            return;
        }

        if (mIngredients.isEmpty()) {
            Toast.makeText(this, "Please input some ingredients", Toast.LENGTH_SHORT).show();
            return;
        }

        if (mSteps.isEmpty()) {
            Toast.makeText(this, "Please input some steps", Toast.LENGTH_SHORT).show();
            return;
        }

        if (mRecipeImageFile == null) {
            Toast.makeText(this, "Please upload an image", Toast.LENGTH_SHORT).show();
            return;
        }

        final Recipe recipe = new Recipe();
        recipe.name = recipeName;
        recipe.description = recipeDescription;
        recipe.imageThumbnail = "http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg";
        recipe.steps = mSteps;
        recipe.ingredients = mIngredients;

        mProgressDialog = new ProgressDialog(this);
        mProgressDialog.setIndeterminate(true);
        mProgressDialog.setCancelable(false);
        mProgressDialog.setMessage("Uploading recipe...");
        mProgressDialog.show();

        // upload image
        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReferenceFromUrl("gs://toutcequi-217f2.appspot.com");
        Uri file = Uri.fromFile(mRecipeImageFile);
        StorageReference imagesRef = storageRef.child("images/" + file.getLastPathSegment());
        UploadTask uploadTask = imagesRef.putFile(file);
        uploadTask.addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                recipe.imageBackground = taskSnapshot.getDownloadUrl().toString();

                String token = SessionManager.getInstance(getApplicationContext()).getToken();
                String authHeader = "Bearer " + token;
                ApiManager.getInstance().getRecipesService()
                        .createRecipe(authHeader, recipe)
                        .enqueue(new Callback<Recipe>() {
                            @Override
                            public void onResponse(Call<Recipe> call, Response<Recipe> response) {
                                mProgressDialog.dismiss();
                                setResult(RESULT_OK);
                                finish();
                            }

                            @Override
                            public void onFailure(Call<Recipe> call, Throwable t) {
                                mProgressDialog.dismiss();
                                Log.e(TAG, t.getMessage());
                            }
                        });
            }
        });
        uploadTask.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                mProgressDialog.dismiss();
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        EasyImage.handleActivityResult(requestCode, resultCode, data, this, new DefaultCallback() {
            @Override
            public void onImagePickerError(Exception e, EasyImage.ImageSource source, int type) {
                Log.e(TAG, e.getMessage());
            }

            @Override
            public void onImagePicked(File imageFile, EasyImage.ImageSource source, int type) {
                //Handle the image
                Picasso.with(CreateRecipeActivity.this)
                        .load(imageFile)
                        .fit()
                        .centerCrop()
                        .transform(new RoundedTransformation(10, 0))
                        .into(mRecipeImage);
                mRecipeImageFile = imageFile;
            }
        });
    }

}
