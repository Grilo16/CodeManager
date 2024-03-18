import { useDispatch, useSelector } from "react-redux";
import { SelectTemplates, setTemplates } from "../../features";
import { Wrapper } from "../layout";
import { TemplateCard } from "./TemplateCard";
import { useEffect } from "react";
import { handleInvoke } from "../../utils";

export const MyTemplates = () => {
    const dispatch = useDispatch()

    const templates = useSelector(SelectTemplates)

    const getAllTemplates = async () => {
        const templatesResult = await handleInvoke("get_all_templates")
        dispatch(setTemplates(templatesResult))
    }

    useEffect(() => {
        templates.length ? null : getAllTemplates()
    }, [])

    const displayTemplates = templates?.map((template, index) => <TemplateCard key={index} {...template}/>)
    
    return (
        <Wrapper theme={"light"} layout={"flex-column"} gap={"0.5rem"} overflowY={"scroll"} padding={"1rem 0"} textAlign={"center"}>
            <h4>My templates</h4>
            <Wrapper margin={"1rem"} layout={"auto-grid"} $auto={"auto-fill"}>
                {displayTemplates}
            </Wrapper>
        </Wrapper>

    )
};