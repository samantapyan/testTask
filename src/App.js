import './App.css';
import {useSelector, useDispatch} from "react-redux";
import { Route, Routes} from "react-router-dom";
import routes from './routes'
import { ThemeProvider} from "@mui/material/styles";
import Button from '@mui/material/Button';
import {AppTheme} from "./AppTheme";

function App() {
  const  store = useSelector(store => store)
  const dispatch = useDispatch()
  console.log(store);
  return (
      <ThemeProvider theme={AppTheme}>
          <div className="App">
              <Routes>
                  {routes.map((route, ind) => (
                      <Route {...route} key={ind}/>
                  ))}
              </Routes>
          </div>
      </ThemeProvider>
  );
}

export default App;
