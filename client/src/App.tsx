import { useContext, useEffect } from "react";
// import "./App.css";
import LoginFrom from "./components/forms/LoginFrom";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import RegistrationForm from "./components/forms/RegistrationForm";
import "./components/reset.scss";
import "./components/forms/form.scss";
import "./components/forms/formLayout.scss";
import Loading from "./components/Loading/Loading";
import Home from "./components/Home/Home";
function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
      console.log(store);
    }
  }, []);

 

  if (store.isLoading) {
    return <Loading />;
  }
  if (!store.isAuth && !store.hasAccount) {
    setTimeout(()=>{
      return <Loading/>
    }, 500)
    return <RegistrationForm />;
  }

  if (!store.isAuth && store.hasAccount) {
    setTimeout(()=>{
      return <Loading/>
    }, 500)
    return <LoginFrom />;
  }
  return <Home email={store.user.email} isActivated={store.user.isActivated} />;
}

export default observer(App);
