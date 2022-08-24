import { Link, Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { AmbarResponsiveLogo } from './features/common/owl/AmbarResponsiveLogo';
import './App.css';
import { useAppSelector } from "./app/hooks";
import { selectIsLoading } from "./features/common/commonSlice";

function App() {
  const fetching = useAppSelector(selectIsLoading);

  return (
    <div style={{ height: '100%' }}>
      <div className="App">
        <header className="App-header">
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem",
            }}
          >
            <Link to="/counter">Counter</Link>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <div style={{ height: '100%' }}>
        {fetching && <LinearProgress style={{ position: 'fixed', top: '64px', zIndex: '2000' }} color="secondary" />}

        <AppBar position="static">
          <Toolbar>
            <AmbarResponsiveLogo />
            <Button component={Link} to={'/'}>Search</Button>
            <Button component={Link} to={'/settings'}>Settings</Button>
            <Button component={Link} to={'/statistics'}>Statistics</Button>
          </Toolbar>
        </AppBar>

        <Outlet />
      </div>
    </div>
  );
}

export default App;
