import { useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
} from '../../actions';
import { createGroup, createUser } from '../../helpers/SendData';
import { checkDataExistence } from '../../helpers/ReceiveData';
import './ControlPannel.css';

function ControlPannel({
  groupData,
  userData,
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
  createGroup,
  createUser,
}) {
  const [groupId, setGroupId] = useState('pass1');
  const [userId, setUserId] = useState('');
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
    leftUser();
    setGroupDataId(null);
  };

  const joinToUser = async () => {
    const idIsExist = await checkDataExistence(groupId + '/geo/' + userId);
    if (idIsExist) {
      setUserDataId(userId);
    } else {
      setUserDataError('Пользователь с таким id не найден');
    }
  };

  const createNewUser = async () => {
    const isIdTaken = await checkDataExistence(groupId + '/geo/' + userId);
    if (isIdTaken) {
      setUserDataError('Пользователь с такиим id уже существует');
    } else {
      createUser(groupId, userId);
    }
  };

  const leftUser = () => {
    setUserDataId(null);
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
              <button onClick={leftGroup}>Покинуть группу</button>
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
              <button onClick={leftUser}>Покинуть профиль пользователя</button>
            )}
          </>
        )}
      </main>
    </section>
  );
}

const mapStateToProps = ({ groupData, userData }) => {
  return { groupData, userData };
};

export default connect(mapStateToProps, {
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
  createGroup,
  createUser,
})(ControlPannel);
