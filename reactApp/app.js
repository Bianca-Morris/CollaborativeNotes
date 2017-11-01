// import { StackNavigator } from 'react-navigation';
// import { HashRouter}
var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Link } = require('react-router-dom');
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

//Navigator
// export default StackNavigator({
//   Signup: {
//     screen: Signup,
//   },
//   App: {
//     screen: App,
//   },
//
// }, {
//   initialRouteName: 'Signup',
//   headerMode: 'screen'
// });

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('root'));
