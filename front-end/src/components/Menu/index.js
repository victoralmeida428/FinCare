import { Image, Nav, NavItem } from "react-bootstrap";
import NavCustomLink from "./NavCustomLink"
import { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
    var links = []
    const url = window.location.href
    const path = url.at(-1) == '/' ? url.at(-1) : url.split('/').at(-1)
    const [user, setUser] = useState('')

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user')
            console.log(response);
            if (response.data) {
                setUser(response.data.data[0].username)
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{getUser()}, [])
    const menu = {
        '0': { 'url': '/', 'children': 'Home' },
        '1': { 'url': '##', 'children': 'Stocks' },
        '2': { 'url': '###', 'children': 'Statistc' },
        '3': { 'url': '####', 'children': 'Predict' },
        '4': { 'url': '#####', 'children': 'Wallet' },
        '5': { 'url': user ? 'login' : 'logout', 'children': user ? 'Login' : 'Logout' },
    }
    for (const [i, props] of Object.entries(menu)) {
        links.push(<NavCustomLink url={props.url}
            key={i}
            children={props.children}
        />)
    }
    return (
        <Nav variant="tabs"
            defaultActiveKey={'/'}
            activeKey={path}
            className="fixed-top navbar-light bg-dark justify-content-end align-items-center ">
            {links}
        </Nav>

    )
}

export default Menu;