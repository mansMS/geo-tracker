import { useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
} from '../../actions';
import { createGroup, createUser, updateName } from '../../helpers/SendData';
import { checkDataExistence } from '../../helpers/ReceiveData';
import { colors } from '../../constants';
import './ControlPannel.css';

function ControlPannel({
  groupData,
  userData,
  usersData,
  settingData,
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
  createGroup,
  createUser,
}) {
  const [groupId, setGroupId] = useState('pass1');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [activePannel, setActivePannel] = useState('group');

  const joinToGroup = async () => {
    const idIsExist = await checkDataExistence(groupId);
    if (idIsExist) {
      setGroupDataId(groupId);
    } else {
      setGroupDataError('Группа с таким id не найдена');
    }
  };

  const createNewGroup = async () => {
    const isIdTaken = await checkDataExistence(groupId);
    if (isIdTaken) {
      setGroupDataError('Группа с такиим id уже существует');
    } else {
      createGroup(groupId);
    }
  };

  const leftGroup = () => {
    clearHiddenList();
    leftUser();
    setGroupDataId(null);
  };

  const joinToUser = async () => {
    const idIsExist = await checkDataExistence(groupId + '/geo/' + userId);
    if (idIsExist) {
      setUserDataId(userId);
      setUserName(usersData.data[userId].name);
    } else {
      setUserDataError('Пользователь с таким id не найден');
    }
  };

  const createNewUser = async () => {
    const isIdTaken = await checkDataExistence(groupId + '/geo/' + userId);
    if (isIdTaken) {
      setUserDataError('Пользователь с такиим id уже существует');
    } else {
      let newUserName = 'user';
      let k = 1;
      while (
        typeof usersData.data === 'object' &&
        Object.values(usersData.data).some(
          ({ name }) => name === newUserName + ' ' + k
        )
      ) {
        k++;
      }
      createUser(
        groupId,
        userId,
        newUserName + ' ' + k,
        colors[Object.keys(usersData.data).length]
      );
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
      updateName(groupId, userId, userName);
    }
  };

  const toggleUserHidden = (userId) => {
    if (settingData.hiddenUsers.includes(userId)) {
      excludeHiddenUser(userId);
    } else {
      addHiddenUser(userId);
    }
  };

  return (
    <section className="control-pannel">
      <nav className="control-nav">
        <ul className="tab-list">
          <li
            className={`group-tab ${activePannel === 'group' && 'active'}`}
            onClick={() => setActivePannel('group')}
          >
            Группа
          </li>
          <li
            className={`user-tab ${activePannel === 'user' && 'active'}`}
            onClick={() => setActivePannel('user')}
          >
            Я
          </li>
        </ul>
      </nav>
      <main className="control-content">
        {activePannel === 'group' && (
          <>
            {!groupData.id ? (
              <>
                <label>
                  Id группы
                  <input
                    type="text"
                    name="group"
                    maxLength={12}
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    onKeyPress={({ key }) => key === 'Enter' && joinToGroup()}
                  />
                  <span className="error">{groupData.error}</span>
                </label>
                <button
                  disabled={!groupId || groupId.length < 5}
                  onClick={joinToGroup}
                >
                  Войти
                </button>
                <button
                  disabled={!groupId || groupId.length < 5}
                  onClick={createNewGroup}
                >
                  Создать
                </button>
              </>
            ) : (
              <>
                {usersData.data && (
                  <ul className="user-list">
                    {Object.keys(usersData.data).map((userId) => (
                      <li
                        key={userId}
                        className={`user-item ${
                          settingData.hiddenUsers.includes(userId) && 'inactive'
                        }`}
                        style={{
                          backgroundColor: usersData.data[userId].color,
                        }}
                        onClick={() => toggleUserHidden(userId)}
                      >
                        {usersData.data[userId].name}
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={leftGroup}>Покинуть группу</button>
              </>
            )}
          </>
        )}
        {activePannel === 'user' && (
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
                  disabled={usersData.data[userId].name === userName}
                  onClick={changeName}
                >
                  Поменять имя
                </button>
                <button onClick={leftUser}>
                  Покинуть профиль пользователя
                </button>
              </>
            )}
          </>
        )}
      </main>
    </section>
  );
}

const mapStateToProps = ({ groupData, userData, usersData, settingData }) => {
  return { groupData, userData, usersData, settingData };
};

export default connect(mapStateToProps, {
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
  createGroup,
  createUser,
})(ControlPannel);
