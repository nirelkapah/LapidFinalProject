export const convertDateToDB = (stringUntilDate: string) => new Date(stringUntilDate)

export const convertDateFromDB = (docUntilDate: string) => new Date(docUntilDate).toISOString()

export const convertTimeSpentToDB = (numberTimeSpent: string) => Number.parseFloat(numberTimeSpent)
 

// module.exports = { convertDateFromDB, convertDateToDB, convertTimeSpentToDB };
