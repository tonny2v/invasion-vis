import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import SlicePanel from '../SlicePanel/index';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import DeckTripMap from '../../maps/mapbox/DeckTripMap/index';
import styles from '../SlicePanel/common.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ConWithBoxLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { aIsCollapse: false, bIsCollapse: false };
  }

    closePanel = (switchId) => {
      this.setState({ [switchId]: true });
    };

    openPanel = (switchId) => {
      this.setState({ [switchId]: false });
    };

    render() {
      const layout = [
        { i: 'a', x: 0, y: 0, w: 8, h: 600 },
        { i: 'b', x: 0, y: 600, w: 48, h: 300 },
      ];
      const layout_lg = [
        { i: 'a', x: 0, y: 0, w: 3, h: 500 },
        { i: 'b', x: 0, y: 500, w: 48, h: 300 },
      ];
      return (
            <React.Fragment>
                <ResponsiveReactGridLayout
                    className='layout'
                    layouts={{ lg: layout_lg, md: layout }}
                    breakpoints={{ lg: 3500, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 24, md: 24, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={1}
                    margin={[0, 0]}
                    draggableCancel='.dragCancel'
                    compactType={null}// 是否紧凑排列
                    style={{ position: 'absolute', top: 0, width: '100%', height: '100% !important' }}
                >
                    <div key='a' style={{ zIndex: 1, transition: '1s' }} className={this.state.aIsCollapse ? styles.collapse : ''}>
                        <SlicePanel
                            colTit='智慧交通'
                            colId='aIsCollapse'
                            closePanel={colId => this.closePanel(colId)}
                            openPanel={colId => this.openPanel(colId)}
                        />
                    </div>
                    <div key='b' style={{ zIndex: 1, transition: '1s' }} className={this.state.bIsCollapse ? styles.collapse : ''}>
                        <SlicePanel
                            colTit='智慧监控'
                            colId='bIsCollapse'
                            closePanel={colId => this.closePanel(colId)}
                            openPanel={colId => this.openPanel(colId)}
                        />
                    </div>
                </ResponsiveReactGridLayout>
                <div style={{ zIndex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
                    <DeckTripMap data_url='../../../data/taxi_trips.json' />
                    {/* {this.props.baseComponent} */}
                </div>
            </React.Fragment>
      );
    }
}

export default ConWithBoxLayout;
