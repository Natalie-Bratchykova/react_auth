import { useContext } from "react";
import { Context } from "../../main";


RegistrationForm.propTypes = {};
import { observer } from "mobx-react-lite";
import Form from "./Form";
// import React from 'react';
function RegistrationForm() {
  const { store } = useContext(Context);
  return (
    <div className="form__layout">
      <div className="layout__image">
        <img src="../../../../public/images/registration_image.webp" alt="" />
      </div>
       <Form
      title="Registration"
      storeFunction={store.registration}
      warningString="Has already account?"
      redirectLinkText="Login"
      hasAccountValue={true}
    />
    </div>
   
  );
}

export default observer(RegistrationForm);
