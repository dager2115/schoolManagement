import { HomeScreen } from "../components/screens/homeScreen";
import { TeachersScreen } from "../components/screens/techersListScreen";

export const routes = [
    {
        path: '/',
        exact: true,
        element: <HomeScreen />
    },
    {
        path: '/teachers-list',
        exact: true,
        element: <TeachersScreen />
    },
]