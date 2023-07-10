import { AcademicPeriodsScreen } from "../components/screens/academicPeriodsScreen";
import { HomeScreen } from "../components/screens/homeScreen";
import { MattersScreen } from "../components/screens/mattersScreen";
import { StudentsScreen } from "../components/screens/studentsScreen";
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
    {
        path: '/students-list',
        exact: true,
        element: <StudentsScreen />
    },
    {
        path: '/matters-list',
        exact: true,
        element: <MattersScreen />
    },
    {
        path: '/periods',
        exact: true,
        element: <AcademicPeriodsScreen />
    },
]