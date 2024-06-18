import { Map } from 'google-maps-react';
import React, { Component } from 'react';
import WithGoogleMap from './WithGoogleMap';

class SearchLocation extends Component {
  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  renderAutoComplete() {
    const { google, map } = this.props;
    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(
      this.autocomplete,
      this.props.options || {}
    );
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.props.onLocationSelect(place, place.geometry.location);
    });
  }

  render() {
    const {
      placeholder,
      className,
      style,
      wrapperStyle,
      defaultValue,
      onChange,
    } = this.props;
    return (
      <div className="overflow-hidden" style={wrapperStyle}>
        <input
          placeholder={placeholder || ''}
          className={className}
          style={style}
          ref={(ref) => (this.autocomplete = ref)}
          defaultValue={defaultValue}
          onChange={onChange}
          type="text"
        />
      </div>
    );
  }
}

const MapWrapper = ({ value, ...props }) => (
  <Map
    google={props.google}
    visible={false}
    containerStyle={{
      position: 'relative',
    }}
  >
    <SearchLocation {...props} />
  </Map>
);

export default WithGoogleMap(MapWrapper);
