import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css'
import {NavItem, NavLink} from "react-bootstrap";

function NavCustomLink(props) {

    return (
        <NavItem key={props.key}>
            <NavLink
                key={props.url}
                className='link'
                href={props.url}>
                {props.children}
            </NavLink>
        </NavItem>
    )
}

export default NavCustomLink;