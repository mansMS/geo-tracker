import { useState } from 'react';
import GroupPannel from './GroupPannel';
import UserPannel from './UserPannel';
import './ControlPannel.css';

function ControlPannel() {
  const [activePannel, setActivePannel] = useState('group');

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
        {activePannel === 'group' && <GroupPannel />}
        {activePannel === 'user' && <UserPannel />}
      </main>
    </section>
  );
}

export default ControlPannel;
