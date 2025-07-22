module.exports = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "10mm",
    contents:
      '<div style="text-align: center; te"> <u>Pole Shed App Ver 01 2022</u> </div>',
  },
  footer: {
    height: "10mm",
    contents: {
      first: "First Page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};
