import React, {useEffect, useState} from 'react';
import FirstInput from "../../components/UI/inputs/FirstInput/FirstInput";
import LtlSeparator from "../../components/UI/separators/LTLSeparator/LTLSeparator";
import GoogleOauth from "../../components/UI/GoogleOauth/GoogleOauth";
import cl from "./Registration.module.css";
import ModalWin from "../../components/UI/ModalWin/ModalWin";
import {Link} from "react-router-dom";
import ServerAPI from "../../API/ServerAPI";

const Registration = () => {

    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [showSuc, setShowSuc] = useState(false);
    const [email, setEmail] = useState("")
    const [validateCode, setValidateCode] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [isPasssEq, setIsPsssEq] = useState(true)
    const googleClientId = "641380975374-38scenvpjh0rad2bdlj3a27idc5hfmk8.apps.googleusercontent.com"
    const [errorForm, setErrorForm] = useState(null)
    const [codeState, setCodeState] = useState(null)
    const [isErrorCode, setIsErrorCode] = useState(false)

    useEffect(() => {
        if (password === rePassword) {
            setIsPsssEq(true)
        } else {
            setIsPsssEq(false)
        }
    }, [rePassword])

    const onSuccess = (res) => {
        console.log("suc")
        setEmail(res.profileObj.email)
    };

    const isEmailValid = (testEmail) => {
        const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return re.test(testEmail)
    }

    const sighUp = async (e) => {
        e.preventDefault()
        const response = await ServerAPI.registration(name, email, password, validateCode)
        if (response.isOk) {
            setShowSuc(true)
        } else {
            setErrorForm(response.text)
        }
    }

    const getValidateCode = async () => {
        if (email !== "" && isEmailValid(email)) {
            if (name !== "") {
                setIsErrorCode(false)
                setCodeState("")
                const response = await ServerAPI.getValidationCode(name, email)
                if (!response.isOk) {
                    setIsErrorCode(true)
                }
                setCodeState(response.text)
            } else {
                setIsErrorCode(true)
                setCodeState("Введите пожалуйста имя")
            }
        } else {
            setIsErrorCode(true)
            setCodeState("Email пустой или некорретный")
        }
    }

    return (
        <div className={cl.registration_main}>
            <ModalWin visible={showSuc}>
                Регистрация прошла Успешно!
                <Link to={"/login"}> Войти</Link>
            </ModalWin>
            <div className={cl.content}>
                <div className={cl.form}>
                    <span className={cl.errorForm}>
                        {errorForm}
                    </span>
                    <FirstInput
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder={"Имя"}/><br/>
                    <FirstInput
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder={"Email"}/><br/>
                    <div className={cl.activateCodeWrapper}>
                        <button onClick={getValidateCode} className={cl.activateCodeBtn}>
                            Получить код
                        </button>
                        <input
                            value={validateCode}
                            onChange={e => setValidateCode(e.target.value)}
                            type="text"
                            placeholder={"000-000-000"}
                        />
                        <span style={isErrorCode ? {color: "red"} : {color: "blue"}}
                              className={cl.errorCode}>
                            {codeState}
                        </span>
                    </div>
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
                        <span className={cl.show_pass_span}>Показать</span>
                    </div>
                    <span style={isPasssEq ? {color: 'transparent'} : null} className={cl.errorRepass}>
                        Пароли не совпадают
                    </span>
                    <FirstInput
                        onChange={(e) => setRePassword(e.target.value)}
                        value={rePassword}
                        type={showRePass ? "text" : "password"}
                        placeholder={"Повторите пароль"}
                    /><br/>
                    <div className={cl.show_pass}>
                        <input onChange={() => setShowRePass(!showPass)}
                               className={cl.show_pass_btn}
                               type="checkbox"
                        />
                        <span className={cl.show_pass_span}>Показать</span>
                    </div>
                    <div className={cl.subBtnWrapper}>
                        <button onClick={sighUp} className={cl.submitBtn}>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
                <LtlSeparator style={{marginTop: '0.9em'}} text={"ИЛИ"}/>
                <div className={cl.oauths}>
                    <GoogleOauth
                        clientId={googleClientId}
                        //onFailure={err => console.log(err)}
                        onSuccess={onSuccess}
                    /><br/>
                </div>
            </div>
        </div>
    );
};

export default Registration;