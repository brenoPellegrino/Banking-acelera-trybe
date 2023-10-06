function convertPtBrToNumber(numberString: string) {
  const cleanedNumberString = numberString.replace(/\./g, "").replace(",", ".");

  const number = parseFloat(cleanedNumberString);

  if (!isNaN(number)) {
    return number * 10;
  }

  return NaN;
}

function formatCurrencyInput(inputValue: string): string {

  const numericValue = inputValue.replace(/[^0-9]/g, "");
  

  if (!numericValue) {
    return "0,00";
  }

  const formattedValue = (
    parseFloat(numericValue) / 100
  ).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log(formattedValue);
  

  return formattedValue;
}

export {convertPtBrToNumber, formatCurrencyInput};
