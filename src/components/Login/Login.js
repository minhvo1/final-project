import React from "react";

const Login = () => {
  return (
    <div>
      <div class="login-tab">
        <div class="login-logo">
          <p>Pyra</p>
          <form action="/api/users/register" method="GET">
            <button type="submit" class="sign-up-button">
              Sign Up
            </button>
          </form>
        </div>
        <div class="login-section">
          <p>SIGN IN</p>
          <form action="/login" method="POST">
            <div class="form-group">
              <input
                class="form-control"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" class="login-button">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
