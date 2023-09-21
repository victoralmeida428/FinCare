import { FloatingLabel, FormControl, FormFloating } from "react-bootstrap"


function Field(props){
    return (
        <FloatingLabel controlId={props.id} label={props.label} className="mt-3" >
            <FormControl value={props.value} name={props.name} type={props.type} onChange={props.onchange} />
        </FloatingLabel>
    )

}

export default Field