// Components
import { PrivateRoute } from "components/PrivateRoute";
import { Routes, Route } from "react-router-dom";

// Service
import { useGetArticles } from "service/articles";

function Home() {
  const { data, error, isLoading } = useGetArticles(null, {
    refetchOnFocus: true
  });

  if (isLoading) {
    return <div>LOADING</div>;
  }
  console.log(data);
  return <div>HOME</div>;
}

function Login() {
  return <div>LOGIN</div>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route exact path="login" element={<Login />} />
      <Route exact path="*" component={() => <div>Not found</div>} />
    </Routes>
  );
}

export default AppRoutes;
