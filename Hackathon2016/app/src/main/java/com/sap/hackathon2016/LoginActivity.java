package com.sap.hackathon2016;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.TextInputLayout;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;

import com.sap.hackathon2016.managers.ApiManager;
import com.sap.hackathon2016.managers.SessionManager;
import com.sap.hackathon2016.models.LoginRequest;
import com.sap.hackathon2016.models.TokenResponse;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import shem.com.materiallogin.DefaultLoginView;
import shem.com.materiallogin.MaterialLoginView;

/**
 * Created by Chris Li on 2016-09-24.
 */
public class LoginActivity extends AppCompatActivity {

    private static final String TAG = LoginActivity.class.getSimpleName();

    @BindView(R.id.login)
    MaterialLoginView mLoginView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);

        ((DefaultLoginView) mLoginView.getLoginView()).setListener(new DefaultLoginView.DefaultLoginViewListener() {
            @Override
            public void onLogin(TextInputLayout loginUser, TextInputLayout loginPass) {
                String username = loginUser.getEditText().getText().toString().trim();
                String password = loginPass.getEditText().getText().toString().trim();

                if (TextUtils.isEmpty(username)) {
                    loginUser.setError("No username");
                    return;
                }

                if (TextUtils.isEmpty(password)) {
                    loginPass.setError("No password");
                    return;
                }

                LoginRequest loginRequest = new LoginRequest();
                loginRequest.email = username;
                loginRequest.password = password;
                ApiManager.getInstance().getRecipesService()
                        .login(loginRequest)
                        .enqueue(new Callback<TokenResponse>() {
                            @Override
                            public void onResponse(Call<TokenResponse> call, Response<TokenResponse> response) {
                                if (response.body() == null) {
                                    return;
                                }

                                TokenResponse tokenResponse = response.body();
                                SessionManager.getInstance(getApplicationContext())
                                        .updateToken(tokenResponse.token);
                                setResult(RESULT_OK);
                                onBackPressed();
                            }

                            @Override
                            public void onFailure(Call<TokenResponse> call, Throwable t) {
                                Log.e(TAG, t.getMessage());
                            }
                        });
            }
        });
    }

    @OnClick(R.id.root_view)
    public void onRootClicked() {
        onBackPressed();
    }
}
