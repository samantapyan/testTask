import Login from './pages/LoginPage'
import Registration from './pages/RegistrationPage'
import {RequireAuth} from "./components/requireAuth";

const routes = [
    {
        path: '/login',
        element:
            <RequireAuth>
              <Login />
            </RequireAuth>,

        exact:true
    },
    {
        path: '/registration',
        element:
        <RequireAuth>
            <Registration />
        </RequireAuth>,
        exact:true
    }
]
export default routes