import {BrowserRouter, Route, Routes} from "react-router-dom";
import {allPages, privatePages, publicPages} from "./routes/router";
import ServerAPI from "./API/ServerAPI";
import Navbar from "./components/Navbar/Navbar";
import {AuthContext} from "./context";
import {useEffect, useState} from "react";


function App() {

    const [isAuth, setIsAuth] = useState(false);
    const [routes, setRoutes] = useState([])

    useEffect(() => {

        const jwtToken = localStorage.getItem('auth')
        if (jwtToken != null) {
            ServerAPI.checkJWTTokenToExpired(jwtToken).then(resp => {
                if (resp.isOk) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            })
        } else {
            setIsAuth(false)
        }
    }, [isAuth])


    useEffect(() => {

        const returnRoutes = []
        allPages.forEach(page => {
            returnRoutes.push(<Route key={page.path} path={page.path} element={page.element}/>)
        })
        if (isAuth) {
            privatePages.forEach(page =>
            {returnRoutes.push(<Route key={page.path} path={page.path} element={page.element}/>)})
        } else {
            publicPages.forEach(page =>
            {returnRoutes.push(<Route key={page.path} path={page.path} element={page.element}/>)})
        }
        setRoutes(returnRoutes)
    }, [isAuth])


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
        }}>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    {routes}
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
