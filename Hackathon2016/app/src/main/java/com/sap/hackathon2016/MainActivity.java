package com.sap.hackathon2016;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.dpizarro.autolabel.library.AutoLabelUI;
import com.dpizarro.autolabel.library.Label;
import com.sap.hackathon2016.managers.ApiManager;
import com.sap.hackathon2016.models.Recipe;
import com.sap.hackathon2016.network.RecipesService;
import com.sap.hackathon2016.views.adapter.RecipesListAdapter;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity implements AutoLabelUI.OnLabelsEmptyListener, AutoLabelUI.OnRemoveLabelListener {

    private static final String TAG = MainActivity.class.getSimpleName();

    @BindView(R.id.food_image)
    ImageView mFoodImage;
    @BindView(R.id.search_text)
    EditText mSearchInput;
    @BindView(R.id.ingredients_group)
    AutoLabelUI mIngredientsGroup;
    @BindView(R.id.recipes_list)
    RecyclerView mRecipesList;
    @BindView(R.id.tags_container)
    RelativeLayout mTagsContainer;
    @BindView(R.id.filters_container)
    RelativeLayout mFiltersContainer;
    @BindView(R.id.threshold)
    TextView mThresholdText;

    private RecipesListAdapter mRecipesListAdapter;

    private int mThreshold = 0;
    private List<String> mIngredients = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        Picasso.with(this).load("http://lorempixel.com/400/600/food/").fit().centerCrop().into(mFoodImage);
        mIngredientsGroup.setOnLabelsEmptyListener(this);
        mIngredientsGroup.setOnRemoveLabelListener(this);

        mRecipesList.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        mRecipesListAdapter = new RecipesListAdapter(this);
        mRecipesList.setAdapter(mRecipesListAdapter);

        mThresholdText.setText(getString(R.string.threshold_missing_ingredients, mThreshold));

        mSearchInput.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if ((event != null && (event.getKeyCode() == KeyEvent.KEYCODE_ENTER)) || (actionId == EditorInfo.IME_ACTION_DONE)) {
                    onAddIconClicked();
                }
                return false;
            }
        });
        mSearchInput.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!mIngredientsGroup.getLabels().isEmpty()) {
                    mTagsContainer.setVisibility(View.VISIBLE);
                    mFiltersContainer.setVisibility(View.VISIBLE);
                }
            }
        });

        RecipesService recipesService = ApiManager.getInstance().getRecipesService();
        recipesService.getRecipes().enqueue(new Callback<List<Recipe>>() {
            @Override
            public void onResponse(Call<List<Recipe>> call, Response<List<Recipe>> response) {

                if (response.body() == null) {
                    return;
                }

                mRecipesListAdapter.addRecipes(response.body());
            }

            @Override
            public void onFailure(Call<List<Recipe>> call, Throwable t) {
                Log.e(TAG, t.getMessage());
            }
        });
    }

    @OnClick(R.id.search_icon)
    public void onSearchIconClicked() {
        if (!mIngredients.isEmpty()) {
            String ingredients = TextUtils.join(",", mIngredients);
            ApiManager.getInstance().getRecipesService().getRecipes(ingredients)
                    .enqueue(new Callback<List<Recipe>>() {
                        @Override
                        public void onResponse(Call<List<Recipe>> call, Response<List<Recipe>> response) {

                            if (response.body() == null) {
                                return;
                            }

                            mRecipesListAdapter.clearAndAddRecipes(response.body());
                        }

                        @Override
                        public void onFailure(Call<List<Recipe>> call, Throwable t) {
                            Log.e(TAG, t.getMessage());
                        }
                    });

            mTagsContainer.setVisibility(View.GONE);
            mFiltersContainer.setVisibility(View.GONE);
        }

        hideKeyboard();
    }

    @OnClick(R.id.add_icon)
    public void onAddIconClicked() {
        String inputText = mSearchInput.getText().toString().trim();
        if (!TextUtils.isEmpty(inputText) && !mIngredients.contains(inputText)) {
            mIngredientsGroup.addLabel(inputText);
            mIngredients.add(inputText);
            mSearchInput.setText("");
            mFiltersContainer.setVisibility(View.VISIBLE);
        }
    }

    @OnClick(R.id.up_arrow)
    public void onThresholdIncrease() {
        if (mThreshold + 1 > 5) {
            mThreshold = 5;
        } else {
            mThreshold++;
        }
        mThresholdText.setText(getString(R.string.threshold_missing_ingredients, mThreshold++));
    }

    @OnClick(R.id.down_arrow)
    public void onThresholdDecrease() {
        if (mThreshold - 1 < 0) {
            mThreshold = 0;
        } else {
            mThreshold--;
        }
        mThresholdText.setText(getString(R.string.threshold_missing_ingredients, mThreshold));
    }

    @Override
    public void onLabelsEmpty() {
        mFiltersContainer.setVisibility(View.GONE);
        mThreshold = 0;
        mThresholdText.setText(getString(R.string.threshold_missing_ingredients, mThreshold));
    }

    @Override
    public void onRemoveLabel(View view, int position) {
        Label label = (Label) view;
        mIngredients.remove(label.getText());
    }

    private void hideKeyboard() {
        // Check if no view has focus:
        View view = this.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
        }
    }
}
