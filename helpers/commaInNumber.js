const commaInNumber = (number = 0) => {
  return Number(number)?.toLocaleString?.('en-US');
};

export default commaInNumber;
