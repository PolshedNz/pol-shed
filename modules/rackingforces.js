exports.rackingForceM = function (
  maxHeight,
  Length,
  noOfBay,
  windPressure,
  noOfColInMiddleBay,
  snow
) {
  let rack = "";
  let wi =
    (maxHeight * 0.5 * Length * windPressure) /
    ((Number(noOfColInMiddleBay) + 1) * noOfBay);
  let sn =
    (maxHeight * 0.5 * Length * snow) /
    ((Number(noOfColInMiddleBay) + 1) * noOfBay);
  let momentwind = maxHeight * wi * 0.75;
  let momentsnow = maxHeight * sn * 0.5;

  if (momentsnow > momentwind) {
    rack = Math.max(wi, sn).toFixed(2) + "s";
  } else {
    rack = Math.max(wi, sn).toFixed(2);
  }

  return rack;
};

exports.rackingForceE = function (
  maxHeight,
  Length,
  noOfBay,
  windPressure,
  noOfColInEndBay,
  snow
) {
  const rack = Math.max(
    (maxHeight * 0.5 * Length * 0.5 * windPressure) /
      ((Number(noOfColInEndBay) + 1) * noOfBay),
    (maxHeight * 0.5 * Length * 0.5 * snow) /
      ((Number(noOfColInEndBay) + 1) * noOfBay)
  );
  return rack.toFixed(2) || 0;
};

exports.bayWidth = function (Length, noOfBay) {
  return Math.round((1000 * Length) / noOfBay);
};

exports.rackingForceHeight = function (MaxHeight) {
  const RackingForceHeigth = 0.75 * MaxHeight;
  return RackingForceHeigth.toFixed(2);
};

exports.upliftArea = function (
  noOfColumn,
  bayWidth,
  shedWidth,
  windPressure,
  type
) {
  if (type === "MonoOpen") {
    const upliftMiddleMiddle =
      bayWidth *
      0.001 *
      ((shedWidth / noOfColumn) * 0.5 * (windPressure - 0.225));
    const upliftMiddleEnd =
      bayWidth *
      0.001 *
      0.5 *
      ((shedWidth / noOfColumn) * 0.5 * (windPressure - 0.225));
    return [upliftMiddleEnd.toFixed(2), upliftMiddleMiddle.toFixed(2)];
  } else {
    const upliftMiddleMiddle =
      bayWidth *
      0.001 *
      ((shedWidth / noOfColumn) * 0.5 * (windPressure - 0.225) * 0.55);

    const upliftMiddleEnd =
      bayWidth *
      0.001 *
      0.5 *
      ((shedWidth / noOfColumn) * 0.5 * (windPressure - 0.225) * 0.55);
    return [upliftMiddleEnd.toFixed(2), upliftMiddleMiddle.toFixed(2)];
  }
};
