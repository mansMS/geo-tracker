import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  YMaps,
  Map,
  Circle,
  ZoomControl,
  GeolocationControl,
} from 'react-yandex-maps';
import './MapContainer.css';

function MapContainer({ geoData, usersData, settingData }) {
  const [zoom, setZoom] = useState(9);
  const mapState = useMemo(() => ({ center: [55.75, 37.57], zoom }), [zoom]);

  const usersPoints = geoData.data
    ? Object.keys(geoData.data)
        .filter((userId) => !settingData.hiddenUsers.includes(userId))
        .map((userId) =>
          Object.keys(geoData.data[userId]).map((timestamp, index) => {
            const date = new Date(+timestamp);
            return {
              key: userId.toString() + timestamp.toString(),
              name: usersData.data[userId].name,
              timestamp,
              coords: {
                latitude: geoData.data[userId][timestamp].latitude,
                longitude: geoData.data[userId][timestamp].longitude,
              },
              color: usersData.data[userId].color,
              opacity:
                (index / Object.keys(geoData.data[userId]).length) * 0.7 + 0.3,
              date: date.toLocaleString(),
              time: date.toLocaleTimeString(),
            };
          })
        )
        .flat()
    : [];

  return (
    <YMaps
      query={{
        ns: 'use-load-option',
        load:
          'control.ZoomControl,geoObject.addon.balloon,geoObject.addon.hint',
        apikey: 'b516b081-b809-4107-98a7-f784068876ec',
      }}
    >
      <div className="map-container">
        <Map
          className="map"
          state={mapState}
          options={{ suppressMapOpenBlock: true }}
        >
          <ZoomControl options={{ position: { bottom: 250, right: 10 } }} />
          <GeolocationControl
            options={{ position: { bottom: 200, right: 10 } }}
          />
          {usersPoints.map(
            ({ key, name, coords, color, opacity, date, time }) => (
              <Circle
                key={key}
                geometry={[[coords.latitude, coords.longitude], 0]}
                properties={{
                  hintContent: time,
                  balloonContent: '2Текст подсказки',
                  balloonContentBody: name,
                  balloonContentFooter: date,
                }}
                options={{
                  draggable: false,
                  strokeColor: color,
                  strokeOpacity: opacity,
                  strokeWidth: 12,
                }}
              />
            )
          )}
        </Map>
      </div>
    </YMaps>
  );
}

const mapStateToProps = ({ geoData, usersData, settingData }) => {
  return { geoData, usersData, settingData };
};

export default connect(mapStateToProps)(MapContainer);
