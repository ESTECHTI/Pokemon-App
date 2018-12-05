import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import FirstScreen from './screens/FirstScreen';
import Register1 from './screens/Register1';
import Register2 from './screens/Register2';
import Home from './screens/Home';
import HomeSearch from './screens/HomeSearch';

const Routes = () => 
    (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="first" component={FirstScreen} title="" initial />
                <Scene key="register" component={Register1} title="" />
                <Scene key="register2" component={Register2} title="" />
                <Scene key="home" component={Home} title="" />
                <Scene key="homeSearch" component={HomeSearch} title="" />
            </Scene>
        </Router>
    )

export default Routes;