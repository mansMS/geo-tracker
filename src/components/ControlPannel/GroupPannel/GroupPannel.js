import { useState } from 'react';
import { connect } from 'react-redux';
import {
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
} from '../../../actions';
import { createGroup } from '../../../helpers/SendData';
import { checkDataExistence } from '../../../helpers/ReceiveData';
import './GroupPannel.css';

function GroupPannel({
  groupData,
  usersData,
  settingData,
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
  createGroup,
}) {
  const [groupId, setGroupId] = useState('pass1');

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

  const leftUser = () => {
    setUserDataId(null);
  };

  const toggleUserHidden = (userId) => {
    if (settingData.hiddenUsers.includes(userId)) {
      excludeHiddenUser(userId);
    } else {
      addHiddenUser(userId);
    }
  };

  return (
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
  );
}

const mapStateToProps = ({ groupData, userData, usersData, settingData }) => {
  return { groupData, userData, usersData, settingData };
};

export default connect(mapStateToProps, {
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
  createGroup,
})(GroupPannel);
