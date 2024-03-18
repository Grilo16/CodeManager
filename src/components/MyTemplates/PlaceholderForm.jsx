import { useEffect, useState } from "react"
import styled from "styled-components"
import { Wrapper } from "../layout"
import { useDispatch, useSelector } from "react-redux"
import { SelectFieldValues, SelectSelectedTemplate, clearFieldValues, setFieldValue } from "../../features"

export const PlaceholderForm = ({index, placeholder}) => {

    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const selectedTemplate = useSelector(SelectSelectedTemplate)

    useEffect(() => {
        setValue("")
    }, [selectedTemplate])

    useEffect(() => {
        dispatch(setFieldValue({index: index, value: value}))
    }, [value])

    return (
        <>
            <StyledLabel>{placeholder}</StyledLabel>
            <StyledInput value={value} onChange={(e) => setValue(e.target.value)}/>
        </>
    )
}

const StyledLabel = styled.h1`
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