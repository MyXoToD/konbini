export const formatNumber = (number: number) => {
  return number.toLocaleString('en-Us');
};

export const formatCurrency = (number: number) => {
  return number.toLocaleString('en-Us', { style: 'currency', currency: 'USD' });
};
