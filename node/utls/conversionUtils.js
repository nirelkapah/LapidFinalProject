const convertDateToDB = (stringUntilDate) => {
  //Converts to normal date
  return (stringUntilDate = new Date(stringUntilDate));
};

const convertDateFromDB = (docUntilDate) => {
  //converts to string
  return (docUntilDate = new Date(docUntilDate).toISOString());
};

const convertTimeSpentToDB = (numberTimeSpent) => {
  //converts to float
  return (numberTimeSpent = Number.parseFloat(numberTimeSpent));
};


module.exports = { convertDateFromDB, convertDateToDB, convertTimeSpentToDB };
