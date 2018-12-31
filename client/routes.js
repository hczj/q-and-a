import React, { useContext } from 'react';
import { Router } from '@reach/router';
import { MeContext } from './context';

const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));
const Questions = React.lazy(() => import('./components/Questions'));
const Inbox = React.lazy(() => import('./components/Inbox'));
const Profile = React.lazy(() => import('./components/Profile'));
const Auth = React.lazy(() => import('./components/Auth'));
const Manage = React.lazy(() => import('./components/admin/manage'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound'));

const AdminRoute = ({ me, as: Component, ...props }) => {
  return me.isAdmin ? <Component {...props} /> : <Dashboard />;
};

const Routes = () => {
  const { me } = useContext(MeContext);
  if (!me.id) return <Auth />;
  return (
    <Router>
      <Dashboard path="/" />
      <Dashboard path="dashboard/*" />
      <Questions path="questions/*" />
      <Inbox path="messages/*" />
      <Profile path="profile/:userId" />
      <AdminRoute me={me} as={Manage} path="manage" />
      <Auth path="login" />
      <Auth path="signup" />
      <PageNotFound default />
    </Router>
  );
};

export default Routes;
