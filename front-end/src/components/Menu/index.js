import { Image, Nav, NavItem } from "react-bootstrap";
import NavCustomLink from "./NavCustomLink"
import { useState } from "react";

function Menu () {
    var links = []
    const [menuActive, setMenuActive] = useState('/')
    const menu = {
        '0':{'url':'/', 'children':'Home'},
        '1': {'url':'##', 'children':'Stocks'},
        '2': {'url':'###', 'children':'Statistc'},
        '3': {'url':'####', 'children':'Predict'},
        '4': {'url':'#####', 'children':'Wallet'},
        '5': {'url':'######', 'children':'Login'},
    }
    for (const [_, props] of Object.entries(menu)) {
        links.push(<NavCustomLink url={props.url}
                                  children={props.children} 
                                  active={setMenuActive} />)
    }
    return (
        <Nav variant="tabs"
        defaultActiveKey={'/'}
        activeKey={menuActive}
        className="fixed-top navbar-light bg-dark justify-content-end align-items-center ">
            {links}
        </Nav>
       
    )
}

export default Menu;