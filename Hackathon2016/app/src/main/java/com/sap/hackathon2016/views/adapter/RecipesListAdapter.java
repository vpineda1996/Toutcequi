package com.sap.hackathon2016.views.adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.sap.hackathon2016.R;
import com.sap.hackathon2016.models.Recipe;
import com.sap.hackathon2016.utils.CircleTransformation;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class RecipesListAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Recipe> mRecipesList = new ArrayList<>();
    private Context mContext;
    private LayoutInflater mLayoutInflater;

    private List<Boolean> mIsExpandedList = new ArrayList<>();

    public RecipesListAdapter(Context context) {
        this.mContext = context;
        this.mLayoutInflater = LayoutInflater.from(context);
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mLayoutInflater.inflate(R.layout.recipe_list_item, parent, false);
        return new RecipeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {

        final RecipeViewHolder recipeViewHolder = (RecipeViewHolder) holder;
        Recipe recipe = mRecipesList.get(position);

        recipeViewHolder.title.setText(recipe.name);
        recipeViewHolder.description.setText(recipe.description);

        Picasso.with(mContext)
                .load(recipe.imageThumbnail)
                .fit()
                .centerCrop()
                .transform(new CircleTransformation())
                .into(recipeViewHolder.userImage);

        Picasso.with(mContext)
                .load(recipe.imageBackground)
                .fit().centerCrop()
                .into(recipeViewHolder.image);

        if (mIsExpandedList.get(position)) {
            recipeViewHolder.childView.setVisibility(View.VISIBLE);
        } else {
            recipeViewHolder.childView.setVisibility(View.GONE);
        }

        recipeViewHolder.rating.setText(String.valueOf(recipe.rating));
        recipeViewHolder.ratingBar.setRating(recipe.rating);

        recipeViewHolder.parentView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int position = recipeViewHolder.getAdapterPosition();
                if (mIsExpandedList.get(position)) {
                    mIsExpandedList.set(position, false);
                } else {
                    mIsExpandedList.set(position, true);
                }
                notifyItemChanged(position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mRecipesList.size();
    }

    public void addRecipes(List<Recipe> recipes) {
        mRecipesList.addAll(recipes);
        for (int i = 0; i < recipes.size(); i++) {
            mIsExpandedList.add(false);
        }
        notifyDataSetChanged();
    }

    public void clearAndAddRecipes(List<Recipe> recipes) {
        mRecipesList.clear();
        mRecipesList.addAll(recipes);
        mIsExpandedList.clear();
        for (int i = 0; i < recipes.size(); i++) {
            mIsExpandedList.add(false);
        }
        notifyDataSetChanged();
    }

    public static class RecipeViewHolder extends RecyclerView.ViewHolder {

        @BindView(R.id.recipe_title)
        TextView title;
        @BindView(R.id.recipe_description)
        TextView description;
        @BindView(R.id.recipe_image)
        ImageView image;
        @BindView(R.id.user_image)
        ImageView userImage;
        @BindView(R.id.parent_view)
        RelativeLayout parentView;
        @BindView(R.id.child_view)
        RelativeLayout childView;
        @BindView(R.id.recipe_steps)
        TextView steps;
        @BindView(R.id.recipe_rating)
        TextView rating;
        @BindView(R.id.rating_bar)
        RatingBar ratingBar;

        public RecipeViewHolder(View itemView) {
            super(itemView);
            ButterKnife.bind(this, itemView);
        }
    }

}
