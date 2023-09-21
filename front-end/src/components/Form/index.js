
import Field from "../FormField"
import { Button, Stack } from "react-bootstrap"

function Formulario (props){
    const forms = props.fields.map((element) =>{return(<div><Field onchange={element.onchange} label={element['label']} type={element['type']} id={element['id']} name={element['name']} value={element['value']}/></div>)})
    // const btn = <Button variant="outline-success" type="submite">Salvar</Button>?props.btn:''
    return (
        <form method='GET' className="p-2">
            <Stack direction="horizontal" gap={5}>
            {forms}
            <Button variant="outline-success" type="submit">Buscar</Button>
            </Stack>
            
        </form>

    )

}

export default Formulario