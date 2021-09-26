export const checkAuth = () => {
  const data = window.localStorage.getItem("user");
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return;
    }
  }
};

export const mustAuth = (props) => {
  const auth = checkAuth();
  if (auth) {
    return auth;
  }
  props.history.push("/login");
};

export const authCantSeeAuthScreen = (props) => {
  const auth = checkAuth();
  if (auth) {
    props.history.push("/");
  }
};
