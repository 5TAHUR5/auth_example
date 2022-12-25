import {useContext, useState} from "react";
import FirstInput from "../../components/UI/inputs/FirstInput/FirstInput";
import LtlSeparator from "../../components/UI/separators/LTLSeparator/LTLSeparator";
import cl from "./Login.module.css"
import {Link} from "react-router-dom";
import ServerAPI from "../../API/ServerAPI";
import GoogleOauth from "../../components/UI/GoogleOauth/GoogleOauth";
import {AuthContext} from "../../context";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const googleClientId = "641380975374-38scenvpjh0rad2bdlj3a27idc5hfmk8.apps.googleusercontent.com"
    const [error, setError] = useState(null)



    const onSuccess = (res) => {
        console.log(res)
        setEmail(res.profileObj.email)
    };
    const sighIn = async (e) => {
        e.preventDefault()
        const response = await ServerAPI.login(email, password)
        if (response.isOk === true) {
            localStorage.setItem('auth', response.text)
            if (localStorage.getItem('auth')) {
                setIsAuth(true)
                window.location.href = "/profile"
            }
        } else {
            setError(response.text)
        }
    }

    return (
        <div className={cl.login}>
            <div className={cl.content}>
                <div className={cl.form}>
                    <span className={cl.errorForm}>
                        {error}
                    </span>
                    <FirstInput
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder={"Email"}/><br/>
                    <FirstInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={showPass ? "text" : "password"}
                        placeholder={"Пароль"}
                    /><br/>
                    <div className={cl.show_pass}>
                        <input onChange={() => setShowPass(!showPass)}
                               className={cl.show_pass_btn}
                               type="checkbox"
                        />
                        <span className={cl.show_pass_span}>Показать пароль</span>
                    </div>
                    <div className={cl.subBtnWrapper}>
                        <button onClick={sighIn} className={cl.submitBtn}>
                            Войти
                        </button>
                    </div>
                </div>
                <LtlSeparator style={{marginTop: '0.9em}'}} text={"ИЛИ"}/>
                <div className={cl.oauths}>
                    <GoogleOauth
                        clientId={googleClientId}
                        //onFailure={err => console.log(err)}
                        onSuccess={onSuccess}
                    /><br/>
                </div>
                <LtlSeparator style={{marginTop: '50px'}} text={"В первый раз?"}/>
                <div className={cl.registration}>
                    <Link className={cl.regis_link} to={"/registration"}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;