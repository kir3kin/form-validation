import React from "react"

type inputAlertProps = {
	text: string
}
export const InputAlert: React.FC<inputAlertProps> = ({text}) => {
	return (
		<div className="item__alert note">{text}</div>
	)
}

