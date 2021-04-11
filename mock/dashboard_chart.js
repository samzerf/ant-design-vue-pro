function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [80, 49, 55, 14, 90, 5];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
