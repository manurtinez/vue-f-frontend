export default {
  balanceWholePart: (state) => state.loggedUser.balance.split('.')[0],
  balanceDecimalPart: (state) => `,${state.loggedUser.balance.split('.')[1]}`,
}
