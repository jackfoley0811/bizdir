export function descendingComparator(a, b, orderBy) {
  let aCom = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy],
    bCom = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy];
  if (bCom < aCom) {
    return -1;
  }
  if (bCom > aCom) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
