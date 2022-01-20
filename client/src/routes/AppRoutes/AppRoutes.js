import { lazy, Suspense } from "react";

// Components
import { Loading, PrivateRoute } from "components";
import { Routes, Route } from "react-router-dom";

// Constants
import {
  ARTICLES,
  ERROR,
  LOGIN,
  NOT_FOUND_MESSAGE,
  REGISTER,
} from "constants/index";

// Routes
const Login = lazy(() => import("routes/Login"));
const Register = lazy(() => import("routes/Register"));
const Articles = lazy(() => import("routes/Articles"));
const ErrorPage = lazy(() => import("routes/ErrorPage"));

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Articles />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={ARTICLES}
        element={
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <Articles />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={LOGIN}
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        exact
        path={REGISTER}
        element={
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        exact
        path={ERROR}
        element={
          <Suspense fallback={<Loading />}>
            <ErrorPage />
          </Suspense>
        }
      />
      <Route
        exact
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <ErrorPage message={NOT_FOUND_MESSAGE} />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
