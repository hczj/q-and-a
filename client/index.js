import React, { Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import ErrorBoundary from 'react-error-boundary';
import store from './store';
import { SiteHeader, CreateClassroom, ClassroomView } from './components';
import Routes from './routes';
import { useMe } from './hooks';
import { MeContext } from './context';
import './sass/index.scss';
import './socket';

const MainLayout = props => {
  const { pathname: path } = props.location;
  const bg = path !== '/messages' ? { background: 'transparent' } : null;

  return (
    <Fragment>
      <SiteHeader bgColor={bg} />
      {path === '/messages' ? (
        <Routes />
      ) : (
        <div className="section">
          <div className="container">
            <Routes />
          </div>
        </div>
      )}
    </Fragment>
  );
};

const LoadingFallback = ({ children }) => (
  <div>
    <h1 className="title is-1">{children}</h1>
  </div>
);

const ErrorFallback = ({ error }) => (
  <div style={{ margin: '2rem' }}>
    <h1 className="title is-3">Whoops!</h1>
    <p>There was an error</p>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
);

const App = () => {
  const me = useMe();

  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
          <MeContext.Provider value={me}>
            <Router>
              <CreateClassroom path="/classroom" />
              <ClassroomView path="/classroom/r/:room" />
              <MainLayout default />
            </Router>
          </MeContext.Provider>
        </Suspense>
      </ErrorBoundary>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
