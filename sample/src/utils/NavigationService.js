import { NavigationActions } from 'react-navigation';
import Analytics from '@aws-amplify/analytics';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  Analytics.record({
    name: 'Navigate',
    attributes: {
      screen: routeName
    }
  });
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function close() {
  _navigator.dispatch(NavigationActions.back());
}
// add other navigation functions that you need and export them

export default {
  navigate,
  close,
  setTopLevelNavigator
};
