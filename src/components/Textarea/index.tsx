import { Box, Textarea as ChakraTextarea } from "@chakra-ui/react"
import { useField } from "@unform/core"
import { TextareaHTMLAttributes, useEffect, useRef } from "react"

interface Props {
    name: string
    label?: string
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props

export function Textarea({ name, label, ...rest }: TextareaProps) {
    const textareaRef = useRef(null)
    const { fieldName, defaultValue = '', registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textareaRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, value) => {
                ref.current.value = value
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    /**
     * If you need to set a default value for the textarea,
     * use the initial data property on your form,
     * or set it dynamically (be aware of the differences).
     *
     * initial data: https://unform.dev/guides/initial-data
     * set field value: https://unform.dev/guides/get-set-field-value
     */

    return (
        <Box>
            {/* {label && <label htmlFor={fieldName}>{label}</label>} */}

            <ChakraTextarea
                ref={textareaRef}
                id={fieldName}
                defaultValue={defaultValue}
                {...rest}
            />

            {error && <Box as="span">{error}</Box>}
        </Box>
    )
}
