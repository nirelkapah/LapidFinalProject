const convertDateToDB = (stringUntilDate) => {
  //Converts to normal date
  return (stringUntilDate = new Date(stringUntilDate));
};

const convertDateFromDB = (docUntilDate) => {
  //converts to string
  // console.log(docUntilDate)
  return (docUntilDate = new Date(docUntilDate).toISOString());
};

const convertTimeSpentToDB = (numberTimeSpent) => {
  //converts to float
  return (numberTimeSpent = Number.parseFloat(numberTimeSpent));
};

// const convertTimeSpentFromDB = (FloatTimeSpent) => { //converts to float
//     return numberTimeSpent = Math.round(FloatTimeSpent)

// }

module.exports = { convertDateFromDB, convertDateToDB, convertTimeSpentToDB };
