import { FC, useContext, useState } from "react";
import UserService from "../../services/UserService";
import IUser from "../../models/IUser";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import "./home.scss";
interface homeProps {
  email: string;
  isActivated: boolean;
}

const Home: FC<homeProps> = ({ email, isActivated }) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { store } = useContext(Context);
  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="title">User {email} is authorized </h1>
      {!isActivated && (
        <p className="activation-text">
          Please, activate your account by link in email
        </p>
      )}

      <div className="buttons">
        <button className="button" onClick={() => store.logout()}>
          Logout
        </button>
        <button className="button" onClick={() => getUsers()}>
          Get users
        </button>
      </div>

      <ol className="list">
        {users.map((user) => (
          <li className="list-item" key={user.email}>
            {user.email}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default observer(Home);
