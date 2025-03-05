export const toHumanString = (string: string) => string.replaceAll('_', ' ')

export const toSentenceCase = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const getAllHumanCase = (string: string) => {
    const humanString = toHumanString(string)
    const sentenceCaseString = toSentenceCase(humanString)
    return [sentenceCaseString, humanString.toLowerCase(), sentenceCaseString];
}