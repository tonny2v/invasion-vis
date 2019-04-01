import React, { Component } from 'react';
import { Spin } from 'antd';

export default function asyncComponent(resolveComponent) {
  return class DynamicComponent extends Component {
    constructor() {
      super();
      this.state = { AsyncComponent: null };
      Promise.resolve(resolveComponent()).then((m) => {
        console.log(m);
        const AsyncComponent = m.default || m;
        if (this.mounted) {
          this.setState({ AsyncComponent });
        } else {
          this.state.AsyncComponent = AsyncComponent;
        }
      });
    }

    componentDidMount() {
      this.mounted = true;
    }

    render() {
      const { AsyncComponent } = this.state;
      if (AsyncComponent) return <AsyncComponent {...this.props} />;
      return <Spin style={{ width: '100%', height: '100%', textAlign: 'center', transform: 'translateY(50%)' }} tip='正在加载中，请稍等...' size='large' />;
    }
  };
}
