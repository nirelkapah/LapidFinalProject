const convertDateToDB = (stringUntilDate: string) => new Date(stringUntilDate)

const convertDateFromDB = (docUntilDate: string) => new Date(docUntilDate).toISOString()

const convertTimeSpentToDB = (numberTimeSpent: string) => Number.parseFloat(numberTimeSpent)
 

module.exports = { convertDateFromDB, convertDateToDB, convertTimeSpentToDB };
