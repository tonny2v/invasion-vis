import React, { Component } from 'react';
// import { render } from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL, { LineLayer, ScatterplotLayer } from 'deck.gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './style.css';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const mydata = [
  { name: 'ChiWan', coords: [113.89473333333333, 22.455816666666667], P_Inv: 0.3542365505908994 },
  { name: 'Yantian', coords: [114.26794666666666, 22.57345], P_Inv: 0.27565772801696087 },
  { name: 'Qingdao', coords: [120.25705666666667, 36.08946666666667], P_Inv: 0.2992620448454093 },
  { name: 'Ningbo', coords: [121.89526166666667, 29.93238], P_Inv: 0.30324922398958554 },
  { name: 'Zhoushan', coords: [122.10661333333333, 29.904], P_Inv: 0.3849563283236932 },
  { name: 'Baoshan', coords: [121.4827, 31.446695], P_Inv: 0.029137178533117702 },
  { name: 'Shanghai', coords: [121.7305, 31.308273333333332], P_Inv: 0.3462701680349729 },
  { name: 'Yangshan', coords: [122.08211666666666, 30.608516666666667], P_Inv: 0.434186232273011 },
  { name: 'Guangzhou', coords: [113.43307, 23.090493333333335], P_Inv: 0.00021301692827901952 },
  { name: 'Nansha', coords: [113.68256166666667, 22.643306666666668], P_Inv: 0.03924039232433507 },
  { name: 'Dalian', coords: [121.98408, 38.90600333333333], P_Inv: 0.04558784291326545 } 
];

const INITIAL_VIEW_STATE = {
  longitude: 121.7305, 
  latitude: 31.308273333333332,
  zoom: 4,
  bearing: -20,
  // pitch: 60
};

const stopPropagation = evt => evt.stopPropagation();

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      hoveredItems: null
    };
    this._onHover = this._onHover.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._renderhoveredItems = this._renderhoveredItems.bind(this);
  }

  _onHover(info) {
    const { x, y, object } = info;
    let hoveredItems = null;
    if (object) { 
      hoveredItems = [object];
    }
    this.setState({ x, y, hoveredItems });
  }

  _onPopupLoad(ref) {
    if (ref) {
      // React events are triggered after native events
      ref.addEventListener('wheel', stopPropagation);
    }
  }

  _closePopup() {
    this.setState({ hoveredItems: null });
  }

  _renderhoveredItems() {
    const { x, y, hoveredItems } = this.state;

    if (!hoveredItems) {
      return null;
    }

    return (
      <div className={styles.tooltip} style={{ left: x, top: y }}>
        {hoveredItems.slice(0).map(item => (
          <div key={item.name}>
            <h5 style={{ color: 'white' }}>
              {item.name} 
{' '}
{ `: ${item.P_Inv.toFixed(4)}` }
            </h5>
          </div>
        ))}
      </div>
    );
  }


  render() {
    return (
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller width='100%' height='100%'>
        <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
        <LineLayer
          data={[{ sourcePosition: [-122.41669, 37.7883], targetPosition: [-122.41669, 37.781] }, 
            { sourcePosition: [-122.41669, 37.7883], targetPosition: [-122.51669, 37.881] }]}
          getStrokeWidth={5}
        />

        <ScatterplotLayer
          pickable
          autoHighlight
          highlightColor={[255, 255, 255, 128]}
          data={mydata}
          radiusScale={50000}
          getRadius={d => d.P_Inv}
          getFillColor={[0, 0, 255, 128]}
          getPosition={d => d.coords}
          onHover={this._onHover}
        />
        {this._renderhoveredItems}
      </DeckGL>
    );
  }
}
