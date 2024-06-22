import { useContext } from "react";
// import PropTypes from 'prop-types';
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import Form from "./Form";
LoginFrom.propTypes = {};

function LoginFrom() {
  const { store } = useContext(Context);
  return (
    <div className="form__layout">
      <div className="layout__image">
        <img src="../../../../public/images/login.webp" alt="" />
      </div>
      <Form
        title="Login"
        storeFunction={store.login}
        warningString="Don't have account yet?"
        redirectLinkText="Create account"
        hasAccountValue={false}
      />
    </div>
  );
}

export default observer(LoginFrom);
