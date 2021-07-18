import React from "react"
import { InputAlert } from "./InputAlert"
import { inputProps } from "../interfaces/interfaces"
import { useAppSelector } from "../app/hooks"
import { selectFormDisable, selectInputs, selectLoading } from "./formSlice"

export const Input: React.FC<inputProps> = ({
	id,
	name,
	type,
	value,
	label,
	inputHandler
}) => {
	const storeInputs = useAppSelector(selectInputs)
	const formDisable = useAppSelector(selectFormDisable)
	// default options
	let inputAlert = false
	const labelClassName: string[] = ['item__label']
	const inputClassName: string[] = ['item__input']

	const defaultInput = {
		id: id ? id : name,
		label: label ? label : `User ${type}`,
		value: storeInputs[name] ? storeInputs[name].value : value,
		isValid: storeInputs[name] ? storeInputs[name].isValid : false,
		isChecked: storeInputs[name] ? storeInputs[name].isChecked : false
	}


	// label classes
	defaultInput.value.trim() && labelClassName.push('item__label--active')

	// input classes
	let inputStatus = defaultInput.isChecked ? (defaultInput.isValid ? 'success' : 'warning' ) : '' 
	inputClassName.push(`item__input--${inputStatus}`)

	// input alert
	if(defaultInput.isChecked && !defaultInput.isValid) {
		inputAlert = true
	}

	return (
		<div className="form__item item">
			<input
				id={defaultInput.id}
				name={name}
				type={type}
				value={defaultInput.value}
				className={inputClassName.join(' ')}
				onChange={event => inputHandler(event)}
				disabled={formDisable}
			/>
			<label
				htmlFor={defaultInput.id}
				className={labelClassName.join(' ')}
			>{defaultInput.label}</label>
			{
				inputAlert && <InputAlert
					text={`Please, enter correct ${defaultInput.label}`}
				/>
			}
		</div>
	)
} 