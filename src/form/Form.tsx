import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { defaultValidPatters } from "../app/defaultValidPatters"
import '../assets/scss/form.scss'
import { iInputContent, iInputType, inputFields } from "../interfaces/interfaces"
import { changeInput, selectInputs, logIn, selectMinor } from "./formSlice"
import { Input } from "./Input"
import { Loader } from "../components/Loader"
import { CSSTransition, TransitionGroup } from "react-transition-group"

export const Form: React.FC = () => {
	const dispatch = useAppDispatch()
	const storeInputs = useAppSelector(selectInputs)
	const minorData = useAppSelector(selectMinor)

	const useRegister = (name: string, type: inputFields, pattern?: string, defaultValue: string = '') => {

		const newInput: iInputType = {
			[name]: {
				type,
				value: defaultValue,
				pattern: pattern ? pattern.toString() : '',
				isValid: false,
				isChecked: false
			}
		}
		useEffect(() => {
			dispatch(changeInput(newInput))
		}, [])

		return {
			name,
			type,
			value: defaultValue,
			inputHandler
		}
	}

	const validateInput = (input: iInputContent): void => {
		const inputPattern: RegExp = input.pattern ? new RegExp(input.pattern) : defaultValidPatters(input.type)
		input.isValid = inputPattern.test(input.value)
		input.isChecked = true
	}
	
	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		const inputType = event.target.type
		const inputName = event.target.name
		const newInput: iInputType = {
			[inputName]: {
				type: inputType,
				value: inputValue,
				pattern: storeInputs[inputName].pattern
			}
		}
		validateInput(newInput[inputName])
		dispatch(changeInput(newInput))
	}

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault()
		type errorsType = {
			name: string
			content: iInputContent
		}
		const errors: errorsType[] = []
		const collection: errorsType[] = []

		Object.keys(storeInputs).map(input => {
			let tempInput = {
				name: input,
				content : {...storeInputs[input]}
			}
			if (!storeInputs[input].isChecked || !storeInputs[input].isValid) {
				errors.push(tempInput)
			} else {
				collection.push(tempInput)
			}
			return input
		})

		if (errors.length) {
			errors.map(input => {
				validateInput(input.content)
				dispatch(changeInput({[input.name]: input.content}))
				return input
			})
		} else {
			let newStoreInputs: iInputType = {}
			collection.map(input => {
				input.content = {
					...input.content,
					...{
						value: '',
						isChecked: false,
						isValid: false
					}
				}
				newStoreInputs = {
					...newStoreInputs,
					...{[input.name]: input.content}
				}
				return input
			})
			dispatch(logIn(newStoreInputs))
		}
	}

	return (
		<form
		className="form"
		onSubmit={event => submitHandler(event)}
		>
			<div className="form__wrapper">
				<CSSTransition
					in={minorData.logIn.status === 'logged'}
					timeout={800}
					classNames={'alert'}
					mountOnEnter
					unmountOnExit
				>
					<div className="form__info">{minorData.logIn.msg}</div>
				</CSSTransition>

				<h2 className="form__header">Log in</h2>
				<div className="form__body">
					<Input
						id="user-email"
						label="email"
						{...useRegister("user_email", "email")}
					/>
					<Input
						id="user-phone"
						label="phone number"
						{...useRegister("user_phone", "tel")}
					/>
					<Input
						id="user-password"
						label="password"
						{...useRegister("user_password", "password", '^[\\w!?@()&$-]{10,20}$')}
					/>
					<CSSTransition
						in={minorData.loading}
						timeout={800}
						classNames={'alert'}
						mountOnEnter
						unmountOnExit
					>
						<Loader />
					</CSSTransition>
					<button
					disabled={minorData.formDisable}
					type="submit"
					className="form__button"
					>Send</button>
				</div>
			</div>
		</form>
	)
}