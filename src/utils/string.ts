export const toHumanString = (string: string) => string.replaceAll('_', ' ')

export const toSentenceCase = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const toAllWordsCaps = (string: string) => string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

export const getAllValidCase = (string: string) => {
    const humanString = toHumanString(string)
    const sentenceCaseString = toSentenceCase(humanString)
    const allWordsCapsString = toAllWordsCaps(humanString)
    return [string, sentenceCaseString, humanString, humanString.toLowerCase(), allWordsCapsString, ];
}