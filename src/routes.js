import Login from './pages/LoginPage'
import Registration from './pages/RegistrationPage'
import Dashboard from './pages/DashboardPage'
import NotFound from './pages/NotFound'
import {RequireAuth} from "./components/RequireAuth";

const routes = [
    {
        path: '/',
        element:
            <RequireAuth>
                <Dashboard />
            </RequireAuth>,
        exact:true
    },
    {
        path: '/login',
        element: <Login />,
        exact:true
    },
    {
        path: '/registration',
        element: <Registration />,
        exact:true
    },
    {
        path: '*',
        element: <NotFound />,
        exact:true
    }

]
export default routes