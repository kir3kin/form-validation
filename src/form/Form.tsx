import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from '../app/hooks'
// import { addWord, selectForm } from './formSlice'
import { checkInput, selectInputs } from "./formSlice"
import { inputType } from "../interfaces/interfaces"
import '../assets/scss/form.scss'
import { InputAlert } from "./InputAlert"
import { Input } from "./Input"

export const Form: React.FC = () => {
	let storeInputs = useAppSelector(selectInputs)
	const dispatch = useAppDispatch()
	const [newInputs, setNewInputs] = useState<inputType[]>([])
	
	const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

		setNewInputs((prev: inputType[]) => {
			const inputName = event.target.name
			if (!inputName) return prev
			const inputValue = event.target.value
			const found = prev.length && prev.find(input => input.name === inputName)

			if (found) {
				found.data.value = inputValue
				return prev
			}
			else {
				return [
					...prev,
					...[{
						name: inputName,
						data:  {
							type: event.target.type,
							value: inputValue,
							isValid: false
						} 
					}]
				]
			}
		})	
	}


	return (
		<form className="form">
			<div className="form__wrapper">
				<h2 className="form__header">Log in</h2>
				<div className="form__body">
					<Input inputHandler={changeInputHandler} type="email" />

					<Input inputHandler={changeInputHandler} type="tel" />

					<Input inputHandler={changeInputHandler} type="password" />

					<button
						type="submit"
						className="form__button"
					>Send</button>
				</div>
			</div>
		</form>
	)
}