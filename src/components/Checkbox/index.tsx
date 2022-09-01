import { Checkbox as ChacraCheckbox, CheckboxProps } from "@chakra-ui/react"
import { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

/**
 * This example renders one checkbox. If you want to render multiple options,
 * check the other checkbox example, or adapt this one.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
 */

interface Props {
  name: string
  value?: string
}

type InputProps = CheckboxProps & Props

export function Checkbox({ name, value, ...rest }: InputProps) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const defaultChecked = defaultValue === value

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.checked
      },
      clearValue: ref => {
        /**
         * If you want to change the default checked for false or true,
         * you can do so here. In this example, when resetting the form,
         * the checkbox goes back to its initial state.
         */
        ref.current.checked = defaultChecked
      },
      setValue: (ref, value) => {
        ref.current.checked = value
      },
    })
  }, [defaultValue, fieldName, registerField, defaultChecked])

  return (
    <div style={{ display: "flex" }}>
      <ChacraCheckbox
        defaultChecked={defaultChecked}
        ref={inputRef}
        value={value}
        type="checkbox"
        id={fieldName}
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  )
}
