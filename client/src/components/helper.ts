// TODO
// email validation
function findDomain(address: string): string {
  let i = 0;
  let domain = "";
  while (i < address.length) {
    if (address[i] === "@") {
      if (address[i + 1]) {
        let j = i + 1;
        while (j < address.length) {
          domain += address[j];
          j += 1;
        }
      }
    }
    i += 1;
  }
  return domain;
}
export default findDomain;
