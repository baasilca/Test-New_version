# credot_eCommerce
e-commerce app with product listings, and add to cart functionality
# react-native-maps [![npm version](https://img.shields.io/npm/v/react-native-maps.svg?style=flat)](https://www.npmjs.com/package/react-native-maps)

React Native Map components for iOS + Android

## Installation

See [Installation Instructions](docs/installation.md).

See [Setup Instructions for the Included Example Project](docs/examples-setup.md).



### Polygon Creator

![](http://i.giphy.com/3o6UAZWqQBkOzs8HE4.gif) ![](http://i.giphy.com/xT77XVBRErNZl3zyWQ.gif)



### Other Overlays

So far, `<Circle />`, `<Polygon />`, and `<Polyline />` are available to pass in as children to the
`<MapView />` component.

![](http://i.giphy.com/xT77XZCH8JpEhzVcNG.gif) ![](http://i.giphy.com/xT77XZyA0aYeOX5jsA.gif)



### Gradient Polylines (iOS MapKit only)

Gradient polylines can be created using the `strokeColors` prop of the `<Polyline>` component.

![](https://i.imgur.com/P7UeqAm.png?1)



### Default Markers

Default markers will be rendered unless a custom marker is specified. One can optionally adjust the
color of the default marker by using the `pinColor` prop.

![](http://i.giphy.com/xT77Y0pWKmUUnguHK0.gif) ![](http://i.giphy.com/3o6UBfk3I58VIwZjVe.gif)



### Custom Callouts

Callouts to markers can be completely arbitrary react views, similar to markers.  As a result, they
can be interacted with like any other view.

Additionally, you can fall back to the standard behavior of just having a title/description through
the `<Marker />`'s `title` and `description` props.

Custom callout views can be the entire tooltip bubble, or just the content inside of the system
default bubble.

To handle press on specific subview of callout use `<CalloutSubview />` with `onPress`.
See `Callouts.js` example.

![](http://i.giphy.com/xT77XNePGnMIIDpbnq.gif) ![](http://i.giphy.com/xT77YdU0HXryvoRqaQ.gif)



### Image-based Markers

Markers can be customized by just using images, and specified using the `image` prop.

![](http://i.imgur.com/mzrOjTR.png)



### Draggable Markers

Markers are draggable, and emit continuous drag events to update other UI during drags.

![](http://i.giphy.com/l2JImnZxdv1WbpQfC.gif) ![](http://i.giphy.com/l2JIhv4Jx6Ugx1EGI.gif)

### Lite Mode ( Android )

Enable lite mode on Android with `liteMode` prop. Ideal when having multiple maps in a View or ScrollView.

![](http://i.giphy.com/qZ2lAf18s89na.gif)

### On Poi Click (Google Maps Only)

Poi are clickable, you can catch the event to get its information (usually to get the full detail from Google Place using the placeId).

![](https://media.giphy.com/media/3480VsCKnHr31uCLU3/giphy.gif)

### Animated Region

The MapView can accept an `AnimatedRegion` value as its `region` prop. This allows you to utilize the Animated API to control the map's center and zoom.

```jsx
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';

getInitialState() {
  return {
    region: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  };
}

onRegionChange(region) {
  this.state.region.setValue(region);
}

render() {
  return (
    <Animated
      region={this.state.region}
      onRegionChange={this.onRegionChange}
    />
  );
}
```

### Animated Marker Position

Markers can also accept an `AnimatedRegion` value as a coordinate.

```jsx
import Mapview, { AnimatedRegion, Marker } from 'react-native-maps';

getInitialState() {
  return {
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  };
}

componentWillReceiveProps(nextProps) {
  const duration = 500

  if (this.props.coordinate !== nextProps.coordinate) {
    if (Platform.OS === 'android') {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(
          nextProps.coordinate,
          duration
        );
      }
    } else {
      this.state.coordinate.timing({
        ...nextProps.coordinate,
        duration
      }).start();
    }
  }
}

render() {
  return (
    <MapView initialRegion={...}>
      <MapView.Marker.Animated
        ref={marker => { this.marker = marker }}
        coordinate={this.state.coordinate}
      />
    </MapView>
  );
}
```

If you need a smoother animation to move the marker on Android, you can modify the previous example:

```jsx
// ...

componentWillReceiveProps(nextProps) {
  const duration = 500

  if (this.props.coordinate !== nextProps.coordinate) {
    if (Platform.OS === 'android') {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(
          nextProps.coordinate,
          duration
        );
      }
    } else {
      this.state.coordinate.timing({
        ...nextProps.coordinate,
        duration
      }).start();
    }
  }
}

render() {
  return (
    <MapView initialRegion={...}>
      <Marker.Animated
        ref={marker => { this.marker = marker }}
        coordinate={this.state.coordinate}
      />
    </MapView>
  );
}
```

### Take Snapshot of map

```jsx
import MapView, { Marker } from 'react-native-maps';

getInitialState() {
  return {
    coordinate: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
  };
}

takeSnapshot () {
  // 'takeSnapshot' takes a config object with the
  // following options
  const snapshot = this.map.takeSnapshot({
    width: 300,      // optional, when omitted the view-width is used
    height: 300,     // optional, when omitted the view-height is used
    region: {..},    // iOS only, optional region to render
    format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
    quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
    result: 'file'   // result types: 'file', 'base64' (default: 'file')
  });
  snapshot.then((uri) => {
    this.setState({ mapSnapshot: uri });
  });
}

render() {
  return (
    <View>
      <MapView initialRegion={...} ref={map => { this.map = map }}>
        <Marker coordinate={this.state.coordinate} />
      </MapView>
      <Image source={{ uri: this.state.mapSnapshot.uri }} />
      <TouchableOpacity onPress={this.takeSnapshot}>
        Take Snapshot
      </TouchableOpacity>
    </View>
  );
}
```

### Zoom to Specified Markers

Pass an array of marker identifiers to have the map re-focus.

![](http://i.giphy.com/3o7qEbOQnO0yoXqKJ2.gif) ![](http://i.giphy.com/l41YdrQZ7m6Dz4h0c.gif)

### Zoom to Specified Coordinates

Pass an array of coordinates to focus a map region on said coordinates.

![](https://cloud.githubusercontent.com/assets/1627824/18609960/da5d9e06-7cdc-11e6-811e-34e255093df9.gif)

### Troubleshooting

#### My map is blank

* Make sure that you have [properly installed](docs/installation.md) react-native-maps.
* Check in the logs if there is more informations about the issue.
* Try setting the style of the MapView to an absolute position with top, left, right and bottom  values set.
*   Make sure you have enabled Google Maps API in [Google developer console](https://console.developers.google.com/apis/library)

```javascript
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
```

```jsx
<MapView
  style={styles.map}
  // other props
/>
```

#### Inputs don't focus

* When inputs don't focus or elements don't respond to tap, look at the order of the view hierarchy, sometimes the issue could be due to ordering of rendered components, prefer putting MapView as the first component.

Bad:

```jsx
<View>
  <TextInput/>
  <MapView/>
</View>
```

Good:

```jsx
<View>
  <MapView/>
  <TextInput/>
</View>
```


License
--------

     Copyright (c) 2017 Airbnb

     Licensed under the The MIT License (MIT) (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

        https://raw.githubusercontent.com/airbnb/react-native-maps/master/LICENSE

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
