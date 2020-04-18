import React, { Component } from "react";

import {
  Map,
  Marker,
  MapProps,
  InfoWindow,
  ProvidedProps,
  InfoWindowProps,
  GoogleApiWrapper
} from "google-maps-react";

type Coords = {
  lat: number;
  lng: number;
};

interface Props extends ProvidedProps {
  points?: Coords[];
}

interface States {
  marker?: any;
  showInfo: boolean;
}

class DataMap extends Component<Props, States> {
  private mapRef = React.createRef<Map>();
  constructor(props: Props) {
    super(props);
    this.state = {
      showInfo: false
    };
  }

  onMarkerSelect = (props: any, marker: any, e: any) => {
    this.setState({
      marker: marker,
      showInfo: true
    });
  };

  render() {
    const { showInfo, marker } = this.state;
    const { points } = this.props;
    let center: Coords = { lat: 45, lng: 45 };

    if (points) {
      let midX = 0;
      let midY = 0;
      points.forEach(({ lat, lng }) => {
        midX += lat;
        midY += lng;
      });
      center.lat = midX / points.length;
      center.lng = midY / points.length;
    }

    let infoWinProps = {
      marker: marker,
      visible: showInfo,
      google: this.props.google
    } as Partial<InfoWindowProps>;

    return (
      <Map
        ref={this.mapRef}
        draggable
        zoom={4}
        initialCenter={center}
        google={this.props.google}
      >
        {points &&
          points.map((pos, i) => (
            <Marker onClick={this.onMarkerSelect} position={pos} />
          ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD6xEMMzs4HKPAL8UaHmwRFL8NHBYVYc5M"
})(DataMap);
