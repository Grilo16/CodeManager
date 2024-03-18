import { useSelector } from "react-redux";
import { SelectTemplates } from "../../features";
import { Wrapper } from "../layout";
import { TemplateCard } from "./TemplateCard";

export const MyTemplates = () => {

    const templates = useSelector(SelectTemplates)

    const displayTemplates = templates?.map((template, index) => <TemplateCard key={index} {...template}/>)
    
    return (
        <Wrapper layout={"flex-column"} gap={"0.5rem"}>
            <h1>My Templates</h1>
            <Wrapper layout={"auto-grid"} $auto={"auto-fill"}>
                {displayTemplates}
            </Wrapper>
        </Wrapper>

    )
};