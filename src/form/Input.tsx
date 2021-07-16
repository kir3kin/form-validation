import React from "react"
import { InputAlert } from "./InputAlert"

type inputHandler = {
	inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
	type: string
}

export const Input: React.FC<inputHandler> = ({inputHandler, type}) => {
	const customInput = {
		type,
		name: (type === 'tel') ? 'phone' : type,
		id: `user_${type}`
	}

	return (
		<div className="form__item item">
			<input
				type={customInput.type}
				id={customInput.id}
				name={customInput.id}
				className="item__input"
				onChange={event => inputHandler(event)}
			/>
			<label htmlFor={customInput.id} className="item__label item__label--active">{customInput.name}</label>
			{/* <InputAlert /> */}
		</div>
	)
} 