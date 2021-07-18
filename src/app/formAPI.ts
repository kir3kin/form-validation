export function sendFormData() {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: 'You are loged in' }), 2000)
  )
}
