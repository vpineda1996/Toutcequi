package com.sap.hackathon2016;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class CreateRecipeActivity extends AppCompatActivity {

    @BindView(R.id.post_title)
    EditText mRecipeTitle;
    @BindView(R.id.post_description)
    EditText mRecipeDescription;
    @BindView(R.id.post_step_input)
    EditText mRecipeSteps;
    @BindView(R.id.steps_container)
    LinearLayout mStepsContainer;

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

    @OnClick(R.id.add_step)
    public void onAddStepClicked() {

        String step = mRecipeSteps.getText().toString().trim();
        if (!TextUtils.isEmpty(step)) {
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

}
