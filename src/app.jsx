import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { MainLayout } from './components/widgets/index';
import routerConfig from './routes/router.config';
import configureStore from './store/configureStore';
// import ExampleMap from './components/maps/ExampleMap';
import dynamicComponent from './utils/dynamicComponent';

const store = configureStore();

const generateRoute = routers => (
  routers.map(route => (
    route.subList
      ? generateRoute(route.subList)
      : (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          render={route.render}
          exact={route.exact || false}
        />
      )
  ))
);


class Root extends Component {
  render() {
    return (
      <Router>
        <MainLayout title='--->>> Examples <<<---' menuConfig={routerConfig}>
          <LocaleProvider locale={zhCN}>
            <Provider store={store}>
              <Switch>
                {/* 根据routers文件夹中的config文件自动生成的路由 */}
                {generateRoute(routerConfig)}
                {/* 其它手动添加的路由 */}
                <Route
                  key='Example'
                  path='/Others'
                  component={dynamicComponent(() => (import('./components/maps/ExampleMap')))}
                  exact
                />
                <Redirect from='/' to='/Others' exact />
              </Switch>
            </Provider>
          </LocaleProvider>
        </MainLayout>
      </Router>
    );
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
