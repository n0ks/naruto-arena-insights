
import 'react-native';
import App from '../App';
import React from 'react';
import renderer from 'react-test-renderer';
// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<App />);
});
