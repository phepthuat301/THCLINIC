import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';
//LayOut
import DefaultLayout from './components/DefaultLayout';
//Components
import Home from './pages/Home/index'
import AddUser from './pages/ManagerUser/AddUser'
import ReadUser from './pages/ManagerUser/ReadUser';
import AddServices from './pages/ManagerServices/AddServices';
import ReadServices from './pages/ManagerServices/ReadServices';
import ExamHistory from './pages/ManagerHistory';
import ReadOrder from './pages/ManagerOrder';
import StatisticManager from './pages/ManagerStatistic';
import LogIn from './pages/LogIn';
import ReadAccount from './pages/ManagerAccount/ReadAccount';
import AddAccount from './pages/ManagerAccount/AddAccount';
//REACT REDUX


function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        {/* Home */}
        <DefaultLayout
          exact
          path={ROUTERS.HOME}
          component={Home}
        />
        {/* Add User */}
        <DefaultLayout
          exact
          path={ROUTERS.ADD_USER}
          component={AddUser}
        />
        {/* Edit User */}
        <DefaultLayout
          exact
          path={ROUTERS.READ_USER}
          component={ReadUser}
        />
        {/* Add Services */}
        <DefaultLayout
          exact
          path={ROUTERS.ADD_SERVICES}
          component={AddServices}
        />
        {/* Edit Services */}
        <DefaultLayout
          exact
          path={ROUTERS.READ_SERVICES}
          component={ReadServices}
        />
        {/* Read History */}
        <DefaultLayout
          exact
          path={ROUTERS.READ_HISTORY}
          component={ExamHistory}
        />
        {/* Read Order */}
        <DefaultLayout
          exact
          path={ROUTERS.READ_ORDER}
          component={ReadOrder}
        />
        {/* Statistic */}
        <DefaultLayout
          exact
          path={ROUTERS.STATISTIC}
          component={StatisticManager}
        />
        {/* Add Account*/}
        <DefaultLayout
          exact
          path={ROUTERS.ADD_ACCOUNT}
          component={AddAccount}
        />
        {/* Edit Account*/}
        <DefaultLayout
          exact
          path={ROUTERS.READ_ACCOUNT}
          component={ReadAccount}
        />

        <Route exact path="/login" component={LogIn} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter