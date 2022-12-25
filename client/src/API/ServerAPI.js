const serverAddress = 'http://localhost:8080'

const defaultHeadersForAuthService = {
    'Content-Type': 'application/json;charset=utf-8'
}

const handlingResponse = async (response) => {
    let result = {
        isOk: true,
        text: ""
    }
    result.isOk = !(response.status >= 400);
    await response.text().then(text => result.text = text)
    return result
}


export default class ServerAPI {
    static async checkJWTTokenToExpired(auth) {
        let resp = null
        await fetch(`${serverAddress}/check_jwt_token_to_expired`, {
            method : 'GET',
            headers: {
                'Authorization' : `Bearer ${auth}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        }).then(response => resp = handlingResponse(response))
            .catch(error => console.log(error))
        return resp
    }

    static async login(email, password) {
        let resp = null
        await fetch(`${serverAddress}/authenticate`, {
            method: 'POST',
            headers: defaultHeadersForAuthService,
            body: JSON.stringify({
                password: password,
                username: email,
            })
        }).then(response => resp = handlingResponse(response))
            .catch(error => console.log(error))
        return resp
    }

    static async getValidationCode(name, email) {
        let resp = null
        await fetch(`${serverAddress}/send_validate_code`, {
            method: 'POST',
            headers: defaultHeadersForAuthService,
            body: JSON.stringify({
                username : email,
                name: name,
            })
        }).then(response => resp = handlingResponse(response))
            .catch(error => console.log(error))
        return resp
    }

    static async registration(name, email, password, code) {
        let resp = null
        await fetch(`${serverAddress}/registration`, {
            method: 'POST',
            headers: defaultHeadersForAuthService,
            body: JSON.stringify({
                username : email,
                password: password,
                name: name,
                code : code
            })
        }).then(response => resp = handlingResponse(response))
            .catch(error => console.log(error))
        return resp
    }


    static async getProfile(auth) {

        let resp = null
        await fetch(`${serverAddress}/get_profile`, {
            method : 'GET',
            headers: {
                'Authorization' : `Bearer ${auth}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        }).then(response => resp = handlingResponse(response))
            .catch(error => console.log(error))
        return resp
    }

}