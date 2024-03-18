import { useDispatch } from "react-redux";
import { Wrapper } from "../layout";
import { clearFieldValues, initiateFieldValues, setSelectedTemplate } from "../../features";
import styled from "styled-components";

export const TemplateCard = ({id, name, edit_fields}) => {

    const template = {id, name, edit_fields}
    const dispatch = useDispatch()
    const handleSelectTemplate = () => {
        dispatch(setSelectedTemplate(template))
        dispatch(clearFieldValues())
        dispatch(initiateFieldValues())
    }

    return (
            <Wrapper onClick={handleSelectTemplate} theme={"dark"} padding={"1rem"} layout={"flex"} justifyContent={"center"} >
                <h1>{name}</h1>
            </Wrapper>
    )
};

