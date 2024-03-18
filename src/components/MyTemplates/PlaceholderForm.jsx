import { useEffect, useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../layout"
import { useDispatch, useSelector } from "react-redux"
import { SelectFieldValues, SelectSelectedTemplate, clearFieldValues, setFieldValue, setOutputFileName } from "../../features"

export const PlaceholderForm = ({index, placeholder, toggle}) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const selectedTemplate = useSelector(SelectSelectedTemplate)

    useEffect(() => {
        setValue("")
        dispatch(setOutputFileName(""))
    }, [selectedTemplate, toggle])

    useEffect(() => {
        dispatch(setFieldValue({index: index, value: value}))
    }, [value])

    return placeholder ? (
        <>
            <StyledLabel>{placeholder}: </StyledLabel>
            <StyledInput required value={value} onChange={(e) => setValue(e.target.value)}/>
        </>
    ) : null
}

const StyledLabel = styled.h2`
justify-self: center;
`

const StyledInput = styled.input`
padding: 0.2rem 1rem;
border-radius: 2rem;
border: 1px solid grey;
&:focus{
    outline: none;
}
`