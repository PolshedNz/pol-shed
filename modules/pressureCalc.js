exports.windPressure = function (windSpeed) {
  const windPressure = (0.5 * windSpeed ** 2 * 1.2) / 1000;
  return windPressure.toFixed(2);
};

exports.windCategory = function (windSpeed) {
  if (windSpeed < 32) {
    return "Low";
  }
  if (windSpeed < 37) {
    return "Medium";
  }
  if (windSpeed < 44) {
    return "High";
  }
  if (windSpeed < 50) {
    return "Very High";
  } else return "extra High";
};
