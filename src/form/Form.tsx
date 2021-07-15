import React from "react"
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addWord, selectForm } from './formSlice'

import '../assets/scss/form.scss'

export const Form: React.FC = () => {
	const form = useAppSelector(selectForm)
	const dispatch = useAppDispatch()

	return (
		<form className="form">
			<div className="form__wrapper">
				<h2 className="form__header">Log in</h2>
				<div className="form__body">
					<div className="form__item item">
						<input
							type="email"
							name="email"
							id="user-email"
							className="item__input item__input--warning"
						/>
						<label htmlFor="email" className="item__label item__label--active">Email</label>
						<div className="item__alert">Please enter your email</div>
					</div>

					<div className="form__item item">
						<input
							type="tel"
							name="phone"
							id="user-phone"
							className="item__input item__input--success"
							pattern="+48-[0-9]{3}-[0-9]{3}-[0-9]{3}"
						/>
						<label className="item__label" htmlFor="phone">Phone</label>
					</div>
					<div className="form__item item">
						<input
							type="password"
							name="pass"
							id="user-pass"
							className="item__input"
						/>
						<label className="item__label" htmlFor="pass">Password</label>
					</div>
					<button
						type="submit"
						className="form__button"
					>Send</button>
				</div>
			</div>
		</form>
	)
}