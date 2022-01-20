import { createElement } from "react";
import PropTypes from "prop-types";

// Utils
import { useSelector } from "react-redux";

// Components
import { Navigate } from "react-router-dom";
import { Layout } from "components";

// Selectors
import { selectAuthentication } from "redux/reducers/authReducer";

// Constants
import { LOGIN } from "constants/index";

export function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectAuthentication);

  return isAuthenticated ? (
    <>
      <Layout /> {children}
    </>
  ) : (
    <Navigate to={`/${LOGIN}`} />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

PrivateRoute.defaultProps = {
  children: createElement("div"),
};
