import { useContext, useState, FC } from "react";
import { Context } from "../../main";

interface formProps {
  title: string;
  storeFunction: (email: string, password: string) => void;
  warningString: string;
  redirectLinkText: string;
  hasAccountValue: boolean;
}
import { observer } from "mobx-react-lite";
// import React from 'react';
const Form: FC<formProps> = ({
  title,
  storeFunction,
  warningString,
  redirectLinkText,
  hasAccountValue,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputType, setInputType] = useState<string>("password");
  const [togglePassword, setTogglePassword] = useState<string>("Show");
  const { store } = useContext(Context);

  const togglePasswordState = () => {
    if (togglePassword === "Show") {
      setTogglePassword("Hide");
      setInputType("text");
    } else {
      setTogglePassword("Show");
      setInputType("password");
    }
  };
  return (
    <form className="form">
      <div className="form__content">
        <h1 className="form__title">{title}</h1>
        <div className="form__group">
          <label htmlFor="#email">
            {" "}
            <span className="form__requiredField">*</span> Email
          </label>
          <input
            type="email"
            placeholder="lol@gmail.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="#password">
            <span className="form__requiredField">*</span> Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={inputType}
            id="password"
            required
          />
          <span className="form__toggle" onClick={() => togglePasswordState()}>
            {togglePassword}
          </span>
        </div>
        <button
          className="form__button"
          onClick={(e) => {
            e.preventDefault();
            storeFunction(email, password);
          }}
        >
          {title}
        </button>

        <p className="form__redirection">
          {warningString}
          <a
            className="form__link"
            onClick={() => store.setHasAccount(hasAccountValue)}
          >
            {redirectLinkText}
          </a>
        </p>
      </div>
    </form>
  );
};

export default observer(Form);
