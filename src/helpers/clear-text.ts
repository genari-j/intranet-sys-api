const removeAccentsAndSpecialChars = (text: string) => {
	return text
		.normalize('NFD')
		.replace(/[^\w\s.]/g, '')
		.replace(/[\u0307]/g, '')
}

export const cleanString = (text: string) => {
	let cleaned = text.toLowerCase()
	cleaned = removeAccentsAndSpecialChars(cleaned)
	cleaned = cleaned.replace(/[^\w\s.]/g, '')

	return cleaned
}
