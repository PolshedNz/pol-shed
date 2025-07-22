//Snow load calcs as per AS1170.3.2003

exports.snowLoads = function (SElev, snowZone, RoofPitch, IL) {
  let Kp = " ";
  if (IL == "IL1") {
    Kp = 1;
  } else {
    Kp = 1.5;
  }

  let mu = 0;
  if (RoofPitch < 10) {
    mu = 0.7;
  } else {
    mu = (0.7 * (60 - RoofPitch)) / 50;
  }

  if (snowZone == "N5") {
    if (SElev < 400) {
      const GSnowLoad = Math.max(Kp * 1.2 * ((1.5 * SElev) / 1000 + 0.3), 0.9);
      const RSnowLoad = Math.max(mu * GSnowLoad, 0.63);
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
    if (SElev > 400 && SElev < 900) {
      const GSnowLoad = Math.max(
        Kp * 1.2 * ((2 * Number(SElev)) / 1000 + 0.1),
        0.9
      );

      const RSnowLoad = Math.max(mu * GSnowLoad, 0.63);
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    } else {
      console.log("Alpine region");
      const GSnowLoad = Math.max(
        Kp * ((Number(SElev) + 450) / 1000) ** 3.2,
        0.9
      );
      const RSnowLoad = Math.max(mu * GSnowLoad, 0.63);
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
  }

  if (snowZone == "N4") {
    if (SElev < 400) {
      const GSnowLoad = Math.max(
        Kp * 1.2 * ((3 * Number(SElev)) / 1000 + 0.3),
        0.9
      );

      const RSnowLoad = Math.max(mu * GSnowLoad, 0.63);
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
    if (SElev > 400 && SElev < 900) {
      const GSnowLoad = Math.max(
        Kp * 1.2 * ((2 * Number(SElev)) / 1000 + 0.7),
        0.9
      );

      const RSnowLoad = Math.max(mu * GSnowLoad, 0.63);
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    } else {
      console.log("Alpine region");
      const GSnowLoad = Kp * ((Number(SElev) + 450) / 1000) ** 3.2;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
  }
  if (snowZone == "N3") {
    if (SElev < 150) {
      const GSnowLoad = 0;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
    
    if (SElev > 149.99 && SElev < 900) {
      const GSnowLoad = (Kp * 3 * (Number(SElev) - 150)) / 1000;
      console.log(SElev, Kp, GSnowLoad)
      const RSnowLoad = mu * GSnowLoad;
      GSnowLoad == 2.36;
      RSnowLoad == 1.6;
      //return [2.36, 1.6]
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    } else {
      console.log("Alpine region");
      const GSnowLoad = Kp * ((Number(SElev) + 450) / 1000) ** 3.2;

      const RSnowLoad = mu * GSnowLoad;

      //return [2.36, 1.6];

      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
  }
  if (snowZone == "N2") {
    if (SElev < 200) {
      const GSnowLoad = 0;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
    if (SElev > 199.99 && SElev < 900) {
      const GSnowLoad = (Kp * 2.7 * (Number(SElev) - 150)) / 1000;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    } else {
      console.log("Alpine region");
      const GSnowLoad = Kp * ((Number(SElev) + 450) / 1000) ** 3.2;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
  }
  if (snowZone == "N1") {
    if (SElev < 400) {
      const GSnowLoad = 0;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
    if (SElev > 399.99 && SElev < 1200) {
      const GSnowLoad = (Kp * 2.4 * (Number(SElev) - 250)) / 1000;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    } else {
      console.log("Alpine region");
      const GSnowLoad = Kp * (Number(SElev) / 1000) ** 4.4;

      const RSnowLoad = mu * GSnowLoad;
      return [GSnowLoad.toFixed(2), RSnowLoad.toFixed(2)];
    }
  }
  if (snowZone == "N0") {
    return [0, 0];
  }
};
