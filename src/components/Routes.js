import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GlobalLayout from './common/GlobalLayout';
import Home from './Home/Home';
import LoginView from './Admins/Login';
import Signup from './Admins/Signup';
import ChangeProfile from './Admins/ChangeProfile';
import ChangePassword from './Admins/ChangePassword';
import { loggedIn } from '../api/auth';
import holes from '../components/DrillHoles';
import depthReadings from '../components/DrillHoles/DepthReadingView';


export default () => (
    <GlobalLayout>
        <Switch>
            <Route exact path='/admin/login' component={LoginView} />
            <Route exact path='/admin/signup' component={Signup} />
            <ProtectedRoute exact path='/home' component={Home} />
            <ProtectedRoute exact path='/holes' component={holes} />
            <ProtectedRoute exact path='/holes/:id' component={depthReadings} />
            <ProtectedRoute exact path='/admin/change-profile' component={ChangeProfile} />
            <ProtectedRoute exact path='/admin/change-password' component={ChangePassword} />
            <ProtectedRoute exact path='/' component={Home} />
        </Switch>
    </GlobalLayout>

);

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) => {
    return <Route
        {...rest}
        render={props =>
            loggedIn()
                ? (
                    <ProtectedComponent {...props} />
                )
                : (
                    <Redirect
                        to={{
                            pathname: '/admin/login',
                            state: { from: props.location },
                        }}
                    />
                )
        }
    />
}
