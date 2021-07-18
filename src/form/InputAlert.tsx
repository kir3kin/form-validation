import React from "react"

type inputAlertProps = {
	text: string
}
export const InputAlert: React.FC<inputAlertProps> = ({text}) => <div className="item__alert">{text}</div>