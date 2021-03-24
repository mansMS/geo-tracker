import { useEffect } from 'react';
import { connect } from 'react-redux';
import { geoReceiver } from './helpers/ReceiveData';
import { geoSender } from './helpers/SendData';
import MapContainer from './components/MapContainer';
import ControlPannel from './components/ControlPannel';

import './App.css';

function App({ groupData, userData, geoReceiver }) {
  useEffect(() => {
    geoReceiver(groupData.id);
  }, [groupData.id]);

  useEffect(() => {
    geoSender(groupData.id, userData.id);
  }, [groupData.id, userData.id]);

  return (
    <div className="App">
      <MapContainer />
      <ControlPannel />
    </div>
  );
}

const mapStateToProps = ({ groupData, userData }) => {
  return { groupData, userData };
};

export default connect(mapStateToProps, { geoReceiver })(App);
