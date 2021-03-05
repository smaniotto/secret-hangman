export const amountToUscrt = (amount) => {
  return { amount: (amount * 1_000_000).toString(), denom: "uscrt" };
};
