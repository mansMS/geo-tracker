import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  YMaps,
  Map,
  Circle,
  ZoomControl,
  GeolocationControl,
} from 'react-yandex-maps';
import { map } from '../../constants';
import './MapContainer.css';

function MapContainer({ geoData }) {
  const [zoom, setZoom] = useState(9);
  const mapState = useMemo(() => ({ center: [55.75, 37.57], zoom }), [zoom]);

  const usersPoints = geoData.data
    ? Object.keys(geoData.data)
        .map((userId) =>
          Object.keys(geoData.data[userId]).map((timestamp, index) => {
            const date = new Date(+timestamp);
            return {
              key: userId.toString() + timestamp.toString(),
              userId,
              timestamp,
              coords: {
                latitude: geoData.data[userId][timestamp].latitude,
                longitude: geoData.data[userId][timestamp].longitude,
              },
              color: map.userColors[userId],
              opacity: (Object.keys(geoData.data[userId]).length - index) / 10,
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
            ({ key, userId, coords, color, opacity, date, time }) => (
              <Circle
                key={key}
                geometry={[[coords.latitude, coords.longitude], 0]}
                properties={{
                  hintContent: time,
                  balloonContent: '2Текст подсказки',
                  balloonContentBody: userId,
                  balloonContentFooter: time,
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

const mapStateToProps = ({ geoData }) => {
  return { geoData };
};

export default connect(mapStateToProps)(MapContainer);
