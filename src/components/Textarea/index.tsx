import { Box, FormControlOptions, HTMLChakraProps, Textarea as ChakraTextarea, ThemingProps } from "@chakra-ui/react";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

interface Props {
    name: string
    label?: string
}

interface TextareaOptions {
    /**
     * The border color when the textarea is focused. Use color keys in `theme.colors`
     * @example
     * focusBorderColor = "blue.500"
     */
    focusBorderColor?: string;
    /**
     * The border color when the textarea is invalid. Use color keys in `theme.colors`
     * @example
     * errorBorderColor = "red.500"
     */
    errorBorderColor?: string;
}

declare type Omitted = "disabled" | "required" | "readOnly";
interface ChakraTextareaProps extends Omit<HTMLChakraProps<"textarea">, Omitted>, TextareaOptions, FormControlOptions, ThemingProps<"Textarea"> {
}

type TextareaProps = ChakraTextareaProps & Props

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
        <Box height="100%">
            {/* {label && <label htmlFor={fieldName}>{label}</label>} */}

            <ChakraTextarea
                resize="none"
                ref={textareaRef}
                id={fieldName}
                defaultValue={defaultValue}
                {...rest}
            />

            {error && <Box as="span">{error}</Box>}
        </Box>
    )
}
