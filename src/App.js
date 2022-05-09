import './App.css';
import {useSelector} from "react-redux";
import { Route, Routes} from "react-router-dom";
import routes from './routes'
import { ThemeProvider} from "@mui/material/styles";
import {AppTheme} from "./AppTheme";

function App() {

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
