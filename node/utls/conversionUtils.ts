export const convertDateToDB = (stringUntilDate: string) => new Date(stringUntilDate)

export const convertDateFromDB = (docUntilDate: string) => new Date(docUntilDate).toISOString()

export const convertTimeSpentToDB = (numberTimeSpent: string): number => Number.parseFloat(numberTimeSpent)
 