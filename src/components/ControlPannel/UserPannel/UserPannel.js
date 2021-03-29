import { useState } from 'react';
import { connect } from 'react-redux';
import { setUserDataId, setUserDataError } from '../../../actions';
import { createUser, updateName } from '../../../helpers/SendData';
import { checkDataExistence } from '../../../helpers/ReceiveData';
import { colors } from '../../../constants';
import './UserPannel.css';

function UserPannel({
  groupData,
  userData,
  usersData,
  setUserDataId,
  setUserDataError,
  createUser,
}) {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState(
    userData.id ? usersData.data[userData.id].name : ''
  );
  const [userNameError, setUserNameError] = useState('');

  const joinToUser = async () => {
    const idIsExist = await checkDataExistence(groupData.id + '/geo/' + userId);
    if (idIsExist) {
      setUserDataId(userId);
      setUserName(usersData.data[userId].name);
    } else {
      setUserDataError('Пользователь с таким id не найден');
    }
  };

  const createNewUser = async () => {
    const isIdTaken = await checkDataExistence(groupData.id + '/geo/' + userId);
    if (isIdTaken) {
      setUserDataError('Пользователь с такиим id уже существует');
    } else {
      let newUserName = 'user';
      let k = Object.keys(usersData.data).length;
      while (
        typeof usersData.data === 'object' &&
        Object.values(usersData.data).some(
          ({ name }) => name === newUserName + ' ' + k
        )
      ) {
        k++;
      }
      createUser(
        groupData.id,
        userId,
        newUserName + ' ' + k,
        colors[Object.keys(usersData.data).length]
      );
      setUserName(newUserName + ' ' + k);
    }
  };

  const leftUser = () => {
    setUserDataId(null);
  };

  const changeName = () => {
    if (Object.values(usersData.data).some(({ name }) => name === userName)) {
      setUserNameError('Пользователь с таким именем уже существует');
    } else {
      setUserNameError('');
      updateName(groupData.id, userData.id, userName);
    }
  };

  return (
    <>
      {!userData.id ? (
        <>
          <label>
            Мой id
            <input
              type="text"
              name="user"
              maxLength={12}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyPress={({ key }) => key === 'Enter' && joinToUser()}
            />
            <span className="error">{userData.error}</span>
          </label>
          <button
            disabled={!userId || userId.length < 5 || !groupData.id}
            onClick={joinToUser}
          >
            Войти
          </button>
          <button
            disabled={!userId || userId.length < 5 || !groupData.id}
            onClick={createNewUser}
          >
            Создать
          </button>
        </>
      ) : (
        <>
          <label>
            Имя
            <input
              type="text"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={({ key }) => key === 'Enter' && changeName()}
            />
            <span className="error">{userNameError}</span>
          </label>
          <button
            disabled={usersData.data[userData.id].name === userName}
            onClick={changeName}
          >
            Поменять имя
          </button>
          <button onClick={leftUser}>Покинуть профиль пользователя</button>
        </>
      )}
    </>
  );
}

const mapStateToProps = ({ groupData, userData, usersData }) => {
  return { groupData, userData, usersData };
};

export default connect(mapStateToProps, {
  setUserDataId,
  setUserDataError,
  createUser,
})(UserPannel);
