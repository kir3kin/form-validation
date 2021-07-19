import React from "react"
import { CSSTransition } from "react-transition-group"

type inputAlertProps = {
	text: string
}
export const InputAlert: React.FC<inputAlertProps> = ({text}) => {
	return (
		<div className="item__alert note">{text}</div>
	)
}

