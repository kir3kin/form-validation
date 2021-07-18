export interface iInputContent {
	type: string
	value: string
	pattern?: string
	isValid?: boolean
	isChecked?: boolean
}

export interface iInputType {
	[key: string]: iInputContent
}

export type inputFields = 'tel' | 'email' | 'password'

export type inputProps = {
	id?: string
	name: string
	type: string
	value: string
	label?: string
	inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}