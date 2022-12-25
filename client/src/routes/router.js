import Profile from "../pages/Profile/Profile.jsx"
import Main from "../pages/Main/Main.jsx"
import Login from "../pages/Login/Login.jsx"
import Registration from "../pages/Registration/Registration.jsx"


export const allPages = [
    {path: "/", name: "Главная", element: <Main/>},
]
export const privatePages = [
    {path: "/profile", name: "Профиль", element: <Profile/>},
]

export const publicPages = [
    {path: "/login", name: "Войти", element: <Login/>},
    {path: "/registration", name: "Регистрация", element: <Registration/>},
]

