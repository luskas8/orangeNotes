import { Box, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";
interface Props {
    name: string
    type?:
    | 'text'
    | 'number'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'hidden'
    | 'month'
    | 'password'
    | 'time'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
    label?: string
    value?: string
}

type InputProps = ChakraInputProps & Props

export function Input({ name, type, label, value, ...rest }: InputProps) {
    const inputRef = useRef(null)
    const { fieldName, defaultValue, registerField, error } = useField(name)

    /**
     * If you add a value to the input, it will be considered the default
     * This is useful when you have a `<input type="hidden" />`
     *
     * You can also remove it and use the `initialData` or set dynamically.
     */
    const defaultInputValue = value || defaultValue

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, newValue) => {
                ref.current.value = newValue
            },
            clearValue: ref => {
                ref.current.value = ''
            },
        })
    }, [fieldName, registerField])

    return (
        <Box width={type !== "hidden" ? "100%" : ""}>
            {label && <label htmlFor={fieldName}>{label}</label>}

            <ChakraInput
                marginTop={label ? "1rem" : "0"}
                type={type || "text"}
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultInputValue}
                {...rest}
            />

            {error && <Box as="span">{error}</Box>}
        </Box>
    )
}
