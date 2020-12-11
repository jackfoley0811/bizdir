export const convertNumberFormat = (number) => {
  if(number == 0) {
    return number.toString();
  }
  if(!number) {
    return 'N/A';
  }
  let str = '';
  let tempNumber = number;
  
  while (tempNumber > 1000) {
    let tmpStr = ((tempNumber % 1000) + 1000).toString();
    str = `,${tmpStr.slice(1, tmpStr.length)}${str}`;
    console.log('sales_volume1', str)
    tempNumber = parseInt(tempNumber / 1000);
  }
  if (tempNumber > 0) {
    str = tempNumber.toString() + str;
  }
  return str;
};
