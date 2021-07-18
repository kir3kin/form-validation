type validPatternsProps = (type: string) => RegExp

export const defaultValidPatters: validPatternsProps = type => {
	const validTypes: Record<string, RegExp> = {
    email: /^\w+@\w+(\.[a-z]+)+$/i,
    password: /^[\w!?@()&$-]{8,20}$/,
    tel: /^\d{3}-?\d{3}-?\d{3}$/,
  }
  return validTypes[type]
}