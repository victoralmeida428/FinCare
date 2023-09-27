import axios from "axios"
import Formulario from "../Form";
import { useEffect, useState, useHistory } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true
const client = axios.create({baseURL: 'http://localhost:8000'})

export default function Login(props) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [data, setData] = useState('')
    const history = useNavigate()

    const makeLogin = (e) => {
        e.preventDefault();
        client.post('/login',data)
            .then((e) => { 
                if (e.status==200){
                    history('/')

                }
             })
            .catch((err) => { console.log(err.status); })
    }

    useEffect(()=>{
        setData({username:user, password:pass});}, [user, pass])

    const inputs = [
        {
            label: 'Username',
            type: 'text',
            name: 'username',
            onchange: e=>setUser(e.target.value)
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            onchange: e=>setPass(e.target.value)
        }
    ]

    return (
        <Formulario action={e => makeLogin(e)} fields={inputs} />

    )

}