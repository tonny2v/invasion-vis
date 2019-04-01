import React from 'react';
import dynamicComponent from '../utils/dynamicComponent';

export default [
  {
    name: 'Example1',
    path: '/Example1',
    component: dynamicComponent(() => (import('../components/maps/ExampleMap'))),
  }, {
    name: 'Example2',
    path: '/Example2',
    component: dynamicComponent(() => (import('../components/maps/ExampleMap'))),
  },
  {
    name: 'Example3',
    path: '/Example3',
    component: dynamicComponent(() => (import('../components/maps/ExampleMap'))),
  }
];
