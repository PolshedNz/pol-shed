//design as per AS3603
//dry timber with maximum moisture content 16%
//wet timber with maximum moisture content 25%
// member with thickness more than 100mm should be assumed wet
// strength reduction for timber, pole, glulam, nails for lateral loading = 0.8
// k1=1 for not exceeding 6 hours k1=0.8 for 6 hours to 5 years k1=0.6 for exceeding 5 years
// k2 = 2 for dry and duration of load is more than 12 months bending compression and shear,
// k2 = 3 for wet and duration of load is more than 12 months bending compression and shear,
// k3 = bearing factor
// k4 = 1 as all members are individual
// k5 = 1 as roof sheet does not have enough stiffeness
// k8 is for bending and compression only maximum 85 for beams loaded by wind or earthquake and 50 for all other beams
// k24 is LVL ang Glulam sizing factor

const { PropQ } = require("../modules/selection");

// Radiata Pine Dry for purlins and Rafters
let SG8RPDP = {
  fb: 14,
  fc: 18,
  ft: 6,
  fs: 3.8,
  fp: 8.9,
  E: 8000,
  EI: 5400,
  Elb: 6700,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
let SG6RPDP = {
  fb: 10,
  fc: 15,
  ft: 4,
  fs: 3.8,
  fp: 8.9,
  E: 6000,
  EI: 4000,
  Elb: 5000,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};

// Douglas fir Pine Dry for purlins and rafter
let SG8DFDP = {
  fb: 14,
  fc: 18,
  ft: 6,
  fs: 3.0,
  fp: 8.9,
  E: 8000,
  EI: 5400,
  Elb: 6700,
  k2long: 2,
  k2short: 1,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};

let SG6DFDP = {
  fb: 10,
  fc: 15,
  ft: 4,
  fs: 3.0,
  fp: 8.9,
  E: 6000,
  EI: 4000,
  Elb: 5000,
  k2long: 2,
  k2short: 1,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
// Douglas fir Pine Wet for purlins and rafter
let SG6DFWP = {
  fb: 7.5,
  fc: 11,
  ft: 3,
  fs: 3.0,
  fp: 5.3,
  E: 4800,
  EI: 3200,
  Elb: 4000,
  k2long: 3,
  k2short: 1,
  JD: "J5",
  k12: 0.7,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
let SG8DFWP = {
  fb: 11.7,
  fc: 12,
  ft: 4,
  fs: 3.0,
  fp: 5.3,
  E: 6500,
  EI: 4400,
  Elb: 5450,
  k2long: 3,
  k2short: 1,
  JD: "J5",
  k12: 0.7,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
// Nelson Pine LVL8- J5 group for Nails and bolts
let LVL8 = {
  fb: 30,
  fc: 30,
  ft: 20,
  fs: 5,
  fp: 7,
  E: 8000,
  EI: 7000,
  Elb: 7500,
  k2long: 2,
  k2short: 1,
  JD: "J5", // For bolt on Face
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
// Nelson Pine LVL11- J4 group for Nails and J2 for bolts
let LVL11 = {
  fb: 38,
  fc: 38,
  ft: 26,
  fs: 5,
  fp: 10,
  E: 11000,
  EI: 9900,
  Elb: 10450,
  k2long: 2,
  k2short: 1,
  JD: "J2", // For bolt on Face lateral load Nelson pine
  k12: 1,
  k11Per: 12.6,
  fpjPer: 22.7,
  k11Par: 1.75,
  fcjPar: 57.6,
};
// Nelson Pine LVL13- J4 group for Nails and J2 for bolts
let LVL13 = {
  fb: 48,
  fc: 38,
  ft: 33,
  fs: 5.3,
  fp: 10,
  E: 13200,
  EI: 11000,
  Elb: 12100,
  k2long: 2,
  k2short: 1,
  JD: "J2", // For bolt on Face lateral load Nelson pine
  k12: 1,
  k11Per: 12.6,
  fpjPer: 22.7,
  k11Par: 1.75,
  fcjPar: 57.6,
};
// Natural round timber in green condition Normal density SED

let NRoundPS = {
  fb: 36.3, //k20 = 0.9 for machine peeling, k21 = 0.85 for steaming, k22=1.25 for dry use
  fc: 18, //k21 = 0.9 for steaming, k22=1.25 for dry use
  ft: 22, //k20 = 0.9 for machine peeling, k21 = 0.85 for steaming, k22=1.25 for dry use
  fs: 2.96, //k21 = 0.9 for steaming , k21 = 0.85 for steaming, k22=1.06 for dry use
  fp: 7.2, //k21 = 0.9 for steaming , k22=1.25 for dry use
  E: 9257, //k21 = 0.95 for steaming, k22=1.12 for dry use
  EI: 9257, //k21 = 0.95 for steaming, k22=1.12 for dry use
  k2long: 3,
  k2short: 1,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
// Natural round timber in green condition High density SED

let NRoundPSHD = {
  fb: 49.725, //k20 = 0.9 for machine peeling, k21 = 0.85 for steaming, k22=1.25 for dry use
  fc: 28.125, //k21 = 0.9 for steaming, k22=1.25 for dry use
  ft: 29.64, //k20 = 0.9 for machine peeling, k21 = 0.85 for steaming, k22=1.25 for dry use
  fs: 2.84, //k21 = 0.9 for steaming , k21 = 0.85 for steaming, k22=1.06 for dry use
  fp: 8.66, //k21 = 0.9 for steaming , k22=1.25 for dry use
  E: 12874, //k21 = 0.95 for steaming, k22=1.12 for dry use
  EI: 12874, //k21 = 0.95 for steaming, k22=1.12 for dry use
  k2long: 3,
  k2short: 1,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
// Natural round timber in green condition Normal density UNI

let NRoundSS = {
  fb: 34.325, //k20 = 0.9 for machine shaving, k21 = 0.85 for steaming, k22=1.25 for dry use
  fc: 18, //k21 = 0.9 for steaming, k22=1.25 for dry use
  ft: 20.75, // k20 = 0.9 for machine shaving, k21 = 0.85 for steaming, k22=1.25 for dry use
  fs: 2.96, //k21 = 0.9 for steaming, k22=1.06 for dry use
  fp: 7.2, //k21 = 0.9 for steaming, k22=1.25 for dry use
  E: 8793, //k21 = 0.95 for steaming, k22=1.12 for dry use
  EI: 8793, //k21 = 0.95 for steaming, k22=1.12 for dry use
  k2long: 3,
  k2short: 1,
  JD: "J5",
  k12: 1,
  k11Per: 14.9,
  fpjPer: 12.9,
  k11Par: 2,
  fcjPar: 36.1,
};
let moisture = "";
let d = "";
let b = "";
let shape = "";
let gr = [];
let membername = "";
let MCondition = "";

let memberproperties = function (member) {
  if (member == "SG815050Dry") {
    moisture = "dry";
    d = 150;
    b = 50;
    gr = "SG8";
    membername = "150x50 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and does not remain in continuous wet condition after installation)";
  } else if (member == "SG820050Dry") {
    moisture = "dry";
    d = 200;
    b = 50;
    gr = "SG8";
    membername = "200x50 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG825050Dry") {
    moisture = "dry";
    d = 250;
    b = 50;
    gr = "SG8";
    membername = "250x50 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG830050Dry") {
    moisture = "dry";
    d = 300;
    b = 50;
    gr = "SG8";
    membername = "300x50 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG610050wet") {
    moisture = "wet";
    d = 100;
    b = 50;
    gr = "SG6Wet";
    membername = "100x50 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG615050wet") {
    moisture = "wet";
    d = 150;
    b = 50;
    gr = "SG6Wet";
    membername = "150x50 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG614045wet") {
    moisture = "wet";
    d = 140;
    b = 45;
    gr = "SG6Wet";
    membername = "140x45 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG620050wet") {
    moisture = "wet";
    d = 200;
    b = 50;
    gr = "SG6Wet";
    membername = "200x50 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG619045wet") {
    moisture = "wet";
    d = 190;
    b = 45;
    gr = "SG6Wet";
    membername = "190x45 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG624045wet") {
    moisture = "wet";
    d = 240;
    b = 45;
    gr = "SG6Wet";
    membername = "240x45 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG629045wet") {
    moisture = "wet";
    d = 290;
    b = 45;
    gr = "SG6Wet";
    membername = "290x45 SG6 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG819045wet") {
    moisture = "wet";
    d = 190;
    b = 45;
    gr = "SG8Wet";
    membername = "190x45 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG824045wet") {
    moisture = "wet";
    d = 240;
    b = 45;
    gr = "SG8Wet";
    membername = "240x45 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG829045wet") {
    moisture = "wet";
    d = 290;
    b = 45;
    gr = "SG8Wet";
    membername = "290x45 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG815050wet") {
    moisture = "wet";
    d = 150;
    b = 50;
    gr = "SG8Wet";
    membername = "150x50 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG820050wet") {
    moisture = "wet";
    d = 200;
    b = 50;
    gr = "SG8Wet";
    membername = "200x50 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG825050wet") {
    moisture = "wet";
    d = 250;
    b = 50;
    gr = "SG8Wet";
    membername = "250x50 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG830050wet") {
    moisture = "wet";
    d = 300;
    b = 50;
    gr = "SG8Wet";
    membername = "300x50 SG8 Wet";
    MCondition = "Wet (Moisture in timber is less than 25%)";
  } else if (member == "SG610050Dry") {
    moisture = "dry";
    d = 100;
    b = 50;
    gr = "SG6Dry";
    membername = "100x50 SG6 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG614045Dry") {
    moisture = "dry";
    d = 140;
    b = 45;
    gr = "SG6Dry";
    membername = "140x45 SG6";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG619045Dry") {
    moisture = "dry";
    d = 190;
    b = 45;
    gr = "SG6Dry";
    membername = "190x45 SG6";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG624045Dry") {
    moisture = "dry";
    d = 240;
    b = 45;
    gr = "SG6Dry";
    membername = "240x45 SG6";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG615050Dry") {
    moisture = "dry";
    d = 150;
    b = 50;
    gr = "SG6Dry";
    membername = "150x50 SG6 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG620050Dry") {
    moisture = "dry";
    d = 200;
    b = 50;
    gr = "SG6Dry";
    membername = "200x50 SG6 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "9045LVL8") {
    moisture = "dry";
    d = 90;
    b = 45;
    gr = "lvl8";
    membername = "90x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "14045LVL8") {
    moisture = "dry";
    d = 140;
    b = 45;
    gr = "lvl8";
    membername = "140x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "19045LVL8") {
    moisture = "dry";
    d = 190;
    b = 45;
    gr = "lvl8";
    membername = "190x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "20045LVL8") {
    moisture = "dry";
    d = 200;
    b = 45;
    gr = "lvl8";
    membername = "200x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "24045LVL8") {
    moisture = "dry";
    d = 240;
    b = 45;
    gr = "lvl8";
    membername = "240x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "30045LVL8") {
    moisture = "dry";
    d = 300;
    b = 45;
    gr = "lvl8";
    membername = "300x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "29045LVL8") {
    moisture = "dry";
    d = 290;
    b = 45;
    gr = "lvl8";
    membername = "290x45 LVL8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG814045Dry") {
    moisture = "dry";
    d = 140;
    b = 45;
    gr = "SG8";
    membername = "140x45 SG8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG819045Dry") {
    moisture = "dry";
    d = 190;
    b = 45;
    gr = "SG8";
    membername = "190x45 SG8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG824045Dry") {
    moisture = "dry";
    d = 240;
    b = 45;
    gr = "SG8";
    membername = "240x45 SG8";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "SG829045Dry") {
    moisture = "dry";
    d = 290;
    b = 45;
    gr = "SG8";
    membername = "290x45 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "20045LVL13") {
    moisture = "dry";
    d = 200;
    b = 45;
    gr = "lvl13";
    membername = "200x45 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "24045LVL13") {
    moisture = "dry";
    d = 240;
    b = 45;
    gr = "lvl13";
    membername = "240x45 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "30045LVL13") {
    moisture = "dry";
    d = 300;
    b = 45;
    gr = "lvl13";
    membername = "300x45 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "36045LVL13") {
    moisture = "dry";
    d = 360;
    b = 45;
    gr = "lvl13";
    membername = "360x45 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "40045LVL13") {
    moisture = "dry";
    d = 400;
    b = 45;
    gr = "lvl13";
    membername = "400x45 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "40063LVL13") {
    moisture = "dry";
    d = 400;
    b = 63;
    gr = "lvl13";
    membername = "400x63 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "45045LVL13") {
    moisture = "dry";
    d = 450;
    b = 45;
    gr = "lvl13";
    membername = "450x45 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "45063LVL13") {
    moisture = "dry";
    d = 450;
    b = 63;
    gr = "lvl13";
    membername = "450x63 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "20063LVL13") {
    moisture = "dry";
    d = 200;
    b = 63;
    gr = "lvl13";
    membername = "200x63 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "24063LVL13") {
    moisture = "dry";
    d = 240;
    b = 63;
    gr = "lvl13";
    membername = "240x63 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "30063LVL13") {
    moisture = "dry";
    d = 300;
    b = 63;
    gr = "lvl13";
    membername = "300x63 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "36063LVL13") {
    moisture = "dry";
    d = 360;
    b = 63;
    gr = "lvl13";
    membername = "360x63 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "61031.5LVL13") {
    moisture = "dry";
    d = 610;
    b = 31.5;
    gr = "lvl13";
    membername = "610x31.5 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "40022.5LVL13") {
    moisture = "dry";
    d = 400;
    b = 22.5;
    gr = "lvl13";
    membername = "400x22.5 LVL13";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  }
  else if (member == "30090LVL11") {
    moisture = "dry";
    d = 300;
    b = 90;
    gr = "lvl11";
    membername = "300x90 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "30090LVL11") {
    moisture = "dry";
    d = 300;
    b = 90;
    gr = "lvl11";
    membername = "300x90 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "30045LVL11") {
    moisture = "dry";
    d = 300;
    b = 45;
    gr = "lvl11";
    membername = "300x45 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "36045LVL11") {
    moisture = "dry";
    d = 360;
    b = 45;
    gr = "lvl11";
    membername = "360x45 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "40045LVL11") {
    moisture = "dry";
    d = 400;
    b = 45;
    gr = "lvl11";
    membername = "400x45 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "30063LVL11") {
    moisture = "dry";
    d = 300;
    b = 63;
    gr = "lvl11";
    membername = "300x63 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "36063LVL11") {
    moisture = "dry";
    d = 360;
    b = 63;
    gr = "lvl11";
    membername = "360x63 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "40063LVL11") {
    moisture = "dry";
    d = 400;
    b = 63;
    gr = "lvl11";
    membername = "400x63 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "24045LVL11") {
    moisture = "dry";
    d = 240;
    b = 45;
    gr = "lvl11";
    membername = "240x45 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "40090LVL11") {
    moisture = "dry";
    d = 400;
    b = 90;
    gr = "lvl11";
    membername = "400x90 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "61045LVL11") {
    moisture = "dry";
    d = 610;
    b = 45;
    gr = "lvl11";
    membername = "610x45 LVL11";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "100SED") {
    moisture = "dry";
    d = 112.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "100 SED H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "125SED") {
    moisture = "dry";
    d = 137.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "125 SED H5)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  }  else if (member == "150SED") {
    moisture = "dry";
    d = 162.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "150 SED H5 (Minimum 175 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "175SED") {
    moisture = "dry";
    d = 187.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "175 SED H5 (Minimum 200 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "200SED") {
    moisture = "dry";
    d = 212.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "200 SED H5 (Minimum 225 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "225SED") {
    moisture = "dry";
    d = 237.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "225 SED H5 (Minimum 250 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "250SED") {
    moisture = "dry";
    d = 262.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "250 SED H5 (Minimum 275 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "275SED") {
    moisture = "dry";
    d = 287.5;
    grade = NRoundPS;
    k20 = "Peeling";
    membername = "275 SED H5 (Minimum 300 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "300SED") {
    moisture = "dry";
    d = 312.5;
    grade = NRoundPS;
    membername = "300 SED H5 (Minimum 325 dia. at Floor Level)";
    k20 = "Peeling";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "350SED") {
    moisture = "dry";
    d = 362.5;
    grade = NRoundPS;
    membername = "350 SED H5 (Minimum 375 dia. at Floor Level)";
    k20 = "Peeling";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "150UNI") {
    moisture = "dry";
    d = 150;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "150 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  }else if (member == "175UNI") {
    moisture = "dry";
    d = 175;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "175 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "200UNI") {
    moisture = "dry";
    d = 200;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "200 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "225UNI") {
    moisture = "dry";
    d = 225;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "225 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "250UNI") {
    moisture = "dry";
    d = 250;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "250 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "275UNI") {
    moisture = "dry";
    d = 275;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "275 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "300UNI") {
    moisture = "dry";
    d = 300;
    grade = NRoundSS;
    k20 = "Shaving";
    membername = "300 UNI H5";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  }else if (member == "100SEDHD") {
    moisture = "dry";
    d = 112.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "100 SED H5 HIGH DENSITY";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "125SEDHD") {
    moisture = "dry";
    d = 137.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "125 SED H5 HIGH DENSITY)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  }  else if (member == "150SEDHD") {
    moisture = "dry";
    d = 162.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "150 SED H5 HIGH DENSITY (Minimum 175 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "175SEDHD") {
    moisture = "dry";
    d = 187.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "175 SED H5 HIGH DENSITY (Minimum 200 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "200SEDHD") {
    moisture = "dry";
    d = 212.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "200 SED H5 HIGH DENSITY (Minimum 225 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "225SEDHD") {
    moisture = "dry";
    d = 237.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "225 SED H5 HIGH DENSITY (Minimum 250 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "250SEDHD") {
    moisture = "dry";
    d = 262.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "250 SED H5 HIGH DENSITY (Minimum 275 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "275SEDHD") {
    moisture = "dry";
    d = 287.5;
    grade = NRoundPSHD;
    k20 = "Peeling";
    membername = "275 SED H5 HIGH DENSITY (Minimum 300 dia. at Floor Level)";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "300SEDHD") {
    moisture = "dry";
    d = 312.5;
    grade = NRoundPSHD;
    membername = "300 SED H5 HIGH DENSITY (Minimum 325 dia. at Floor Level)";
    k20 = "Peeling";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "350SEDHD") {
    moisture = "dry";
    d = 362.5;
    grade = NRoundPSHD;
    membername = "350 SED H5 HIGH DENSITY (Minimum 375 dia. at Floor Level)";
    k20 = "Peeling";
    MCondition =
      "Dry (Pole does not remain in continuous wet condition after installation)";
  } else if (member == "100x100SG8") {
    moisture = "dry";
    d = 100;
    b = 100;
    shape = "square";
    gr = "SG8";
    k20 = "Shaving";
    membername = "100x100 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  }  else if (member == "125x125SG8") {
    moisture = "dry";
    d = 125;
    b = 125;
    gr = "SG8";
    k20 = "Shaving";
    shape = "square";
    membername = "125x125 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "150x150SG8") {
    moisture = "dry";
    d = 150;
    b = 150;
    gr = "SG8";
    k20 = "Shaving";
    shape = "square";
    membername = "150x150 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "175x175SG8") {
    moisture = "dry";
    d = 175;
    b = 175;
    gr = "SG8";
    k20 = "Shaving";
    shape = "square";
    membername = "175x175 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "200x200SG8") {
    moisture = "dry";
    d = 200;
    b = 200;
    gr = "SG8";
    shape = "square";
    k20 = "Shaving";
    membername = "200x200 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "225x225SG8") {
    moisture = "dry";
    d = 225;
    b = 225;
    gr = "SG8";
    k20 = "Shaving";
    shape = "square";
    membername = "225x225 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else if (member == "250x250SG8") {
    moisture = "dry";
    d = 250;
    b = 250;
    gr = "SG8";
    k20 = "Shaving";
    shape = "square";
    membername = "250x250 SG8 Dry";
    MCondition =
      "Dry (Moisture in timber is less than 16% and timber does not remain in continuous wet condition after installation)";
  } else {
    d = 0;
    b = 0;
    gr = "SG8";
    membername = "SG8 Dry";
    MCondition =
      "Wet (Moisture in timber is less than 18% and timber does not remain in continuous wet condition after installation)";
  }
};

//k8 factor function
let s1u = "";
let s1d = "";
let BRes = "";
let TRes = "";
let a1 = "";
let a2 = "";
let a3 = "";
let a4 = "";
let a5 = "";
let a6 = "";

// Bolts perpendicular to grain
let Qkp = "";
let Qkl = "";
let QklPropPole = "";
let QklPropRafter = "";
let QkpPropPole = "";
let QkpPropRafter = "";
let QnPropShort = "";
let QnPropMedium = "";
let QnPropLong = "";
let QklProp = "";
let QkpProp = "";
let Qnshort = "";
let Qnmedium = "";
let Qnlong = "";
let k13 = "";
let k1short = 1;
let k1medium = 0.8;
let k1long = 0.6;
let v = "";
let aperMin = "";
let aperProp = "";
let PropLength = "";
let S2minor = "";
let PhiNcxShort = "";
let PhiNcxMedium = "";
let PhiNcxLong = "";
let PhiMnShort = " ";
let PhiMnMedium = " ";
let PhiMnLong = " ";
let MReactionPropLongImp = "";
let MReactionPropMediumImp = "";
let MReactionPropShortImp = "";
let PropRatioShort = "";
let PropRatioMedium = " ";
let PropRatioLong = "";
let BoltPerpendicularInternal = function (
  PoleWidth,
  da,
  Noda,
  member,
  Poledia,
  daProp,
  NodaProp,
  PropInternal,
  PropL,
  MReactionPropShortImp,
  MReactionPropMediumImp,
  MReactionPropLongImp
) {
  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }
  aperMin = Math.min(Math.max(0.625 * b * 2 + 1.25 * da, 2.5 * da), 5 * da);

  Qkl = Math.min(2 * 36.1 * da ** 2, 0.5 * PoleWidth * 36.1 * da);

  Qkp = Math.min(
    grade.k11Per * grade.fpjPer * da ** 2,
    0.5 * 2 * b * grade.fpjPer * da
  );
  if (Noda <= 4) {
    k13 = 1;
  } else if (Noda == 5) {
    k13 = 0.95;
  } else if (Noda > 5 && Noda <= 10) {
    k13 = 0.8;
  }
  Qnshort = (
    (0.7 * (Noda * k1short * grade.k12 * k13 * Math.min(Qkp, Qkl) * 2)) /
    1000
  ).toFixed(2);
  Qnmedium = (
    (0.7 * (Noda * k1medium * grade.k12 * k13 * Math.min(Qkp, Qkl) * 2)) /
    1000
  ).toFixed(2);
  Qnlong = (
    (0.7 * (Noda * k1long * grade.k12 * k13 * Math.min(Qkp, Qkl) * 2)) /
    1000
  ).toFixed(2);

  memberproperties(PropInternal);
  // Prop calculations
  aperProp = Math.min(
    Math.max(0.625 * b * 2 + 1.25 * daProp, 2.5 * daProp),
    5 * daProp
  );
  QklPropPole = Math.min(
    2 * 36.1 * daProp ** 2,
    0.5 * (Poledia - 20) * 36.1 * daProp
  );
  QkpPropPole = Math.min(
    grade.k11Per * grade.fpjPer * daProp ** 2,
    0.5 * 2 * b * grade.fpjPer * daProp
  );

  QklPropRafter = Math.min(
    grade.k11Par * grade.fcjPar * daProp ** 2,
    0.5 * 2 * b * grade.fcjPar * daProp
  );
  QkpPropRafter = Math.min(
    grade.k11Per * grade.fpjPer * daProp ** 2,
    0.5 * 2 * b * grade.fpjPer * daProp
  );
  QklProp = Math.min(QklPropPole, QklPropRafter);
  QkpProp = Math.min(QkpPropRafter, QkpPropPole);

  QnPropShort = (
    (0.7 * NodaProp * grade.k12 * k13 * 2 * (k1short * (QklProp * QkpProp))) /
    (QklProp * 0.5 + QkpProp * 0.5) /
    1000
  ).toFixed(2);
  QnPropMedium = (QnPropShort * k1medium).toFixed(2);
  QnPropLong = (QnPropShort * k1long).toFixed(2);
  PropLength = PropL / 0.707;

  s1u = PropLength / b;

  if (moisture == "dry") {
    a1 = 0.21;
    a2 = 0.175;
    a3 = -0.0116;
    a4 = 1 / 5000;
    a5 = 235.5;
    a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  } else {
    a1 = 0.45;
    a2 = 0.1237;
    a3 = -0.0082;
    a4 = 1 / 7500;
    a5 = 251.4;
    a6 = -1.933;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }

  PhiNcxShort = 2 * (0.8 * k1short * k8d * grade.fc * b * d * 0.001).toFixed(2);
  PhiNcxMedium =
    2 * (0.8 * k1medium * k8d * grade.fc * b * d * 0.001).toFixed(2);
  PhiNcxLong = 2 * (0.8 * k1long * k8d * grade.fc * b * d * 0.001).toFixed(2);
  PhiMnShort =
    2 * ((0.8 * k1short * grade.fb * d * b ** 2) / 6000000).toFixed(2);
  PhiMnMedium =
    2 * ((0.8 * k1medium * grade.fb * d * b ** 2) / 6000000).toFixed(2);
  PhiMnLong = 2 * ((0.8 * k1long * grade.fb * d * b ** 2) / 6000000).toFixed(2);
  PropRatioShort = (
    MReactionPropShortImp / PhiNcxShort +
    (MReactionPropShortImp * b * 0.001) / PhiMnShort
  ).toFixed(2);
  PropRatioMedium = (
    MReactionPropMediumImp / PhiNcxMedium +
    (MReactionPropMediumImp * b * 0.001) / PhiMnMedium
  ).toFixed(2);
  PropRatioLong = (
    MReactionPropLongImp / PhiNcxLong +
    (MReactionPropLongImp * b * 0.001) / PhiMnLong
  ).toFixed(2);
};

let BoltPerpendicularExternal = function (PoleWidth, da, Noda, member) {
  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }
  v = (
    (0.7 * 1 * 1 * 1 * grade.fs * b * da * 5 +
      0.7 * 1 * 1 * 1 * grade.fs * b * (d - da * 5 - da * 5)) /
    1000
  ).toFixed(2);
  Qkl = Math.min(2 * 36.1 * da ** 2, 0.5 * PoleWidth * 36.1 * da);

  Qkp = Math.min(
    grade.k11Per * grade.fpjPer * da ** 2,
    0.5 * 2 * b * grade.fpjPer * da
  );
  if (Noda <= 4) {
    k13 = 1;
  } else if (Noda == 5) {
    k13 = 0.95;
  } else if (Noda > 5 && Noda <= 10) {
    k13 = 0.8;
  }
  Qnshort = (
    (0.7 * (Noda * k1short * grade.k12 * k13 * Math.min(Qkp, Qkl))) /
    1000
  ).toFixed(2);
  Qnmedium = (
    (0.7 * (Noda * k1medium * grade.k12 * k13 * Math.min(Qkp, Qkl))) /
    1000
  ).toFixed(2);
  Qnlong = (
    (0.7 * (Noda * k1long * grade.k12 * k13 * Math.min(Qkp, Qkl))) /
    1000
  ).toFixed(2);
};

let k2long = " ";
let k2short = "";
let k4 = 1;
let k5 = 1;
let k8d = " ";
let k8u = " ";
let vshortRI = "";
let vmediumRI = "";
let vlongRI = "";
let PMLongRI = "";
let PMMediumRI = "";
let PMshortuRI = "";
let reactionRI = "";
let reactionupRI = "";
let reactionProp = "";
let reactionPropUp = "";
let reactionRI2 = "";
let reactionupRI2 = "";
let r1dead = "";
let r1live = "";
let r1wind = "";
let r1short = "";
let r1medium = "";
let r1long = "";
let PropQuantity = "";
let l1 = "";
let Pl = 1.1; // short term k1=1
exports.analysis = function (
  DeadLoad,
  LiveLoad,
  WindUp,
  WindDown,
  SnowDown,
  PurlinSpan,
  RafterSpanI,
  PurlinSpacing,
  RafterSpacingI,
  RSpanE,
  RSpacingE,
  PropQ,
  PropL,
  MMomentLong,
  MMomentMedium,
  MMomentShort,
  MReactionLong,
  MReactionMedium,
  MReactionShort,
  MReaction2Long,
  MReaction2Medium,
  MReaction2Short,
  MReactionPropLong,
  MReactionPropMedium,
  MReactionPropShort
) {
  let Dl = Number(DeadLoad);
  let Ll = Number(LiveLoad);
  let Wu = Number(WindUp);
  let Snd = Number(SnowDown);
  let PSpan = Number(PurlinSpan);
  let RSpanI = Number(RafterSpanI)-150;
  let pSpacing = Number(PurlinSpacing);
  let RSpacingI = Number(RafterSpacingI);
  let RafterSpanE = Number(RSpanE);
  let RafterSpacingE = Number(RSpacingE);
  let PropQuantity = Number(PropQ);
  let PropLength = Number(PropL);
  let UDl = 1.35 * Number(Dl); // long term k1 = 0.6
  let UDnL = 1.2 * Number(Dl) + 1.5 * Number(Ll); // Medium term k1 = 0.8
  let UDnWd = 1.2 * Number(Dl) + Number(WindDown); // Medium term k1 = 0.8
  let UDnSnd = 1.2 * Number(Dl) + Number(Snd); // Medium term k1 = 0.8
 
  let UDnWu = 0.9 * Number(Dl) - Number(Wu); // short term K1 = 1
 
  l1 = RafterSpanI - PropL;
  let vshort = ((UDnWu * pSpacing * PSpan) / 2000000).toFixed(2);
  let vmedium = (
    (Math.max(UDnL, UDnWd, UDnSnd) * pSpacing * PSpan) /
    2000000
  ).toFixed(2);
  let vlong = ((UDl * pSpacing * PSpan) / 2000000).toFixed(2);
  let PMLong = ((UDl * pSpacing * PSpan ** 2) / 8000000000).toFixed(2);
  let PMMedium = Math.max(
    (Math.max(UDnL, UDnWd, UDnSnd) * pSpacing * PSpan ** 2) / 8000000000,
    (1.2 * pSpacing * Dl * PSpan ** 2) / 8000000000 +
      (0.55 * PSpan * 0.5) / 1000 , (1.2 * pSpacing * Dl * PSpan ** 2) / 8000000000 + 1.5 * 1.1 * PSpan/4000
  ).toFixed(2);
 
  let PMshortu = ((UDnWu * pSpacing * PSpan ** 2) / 8000000000).toFixed(2);
  let reaction = Math.max(
    (UDl * pSpacing * PSpan, Math.max(UDnL, UDnWd, UDnSnd) * pSpacing * PSpan) /
      2000000
  ).toFixed(2);
  let reactionup = ((UDnWu * pSpacing * PSpan) / 2000000).toFixed(2);

  let vshortRE = ((UDnWu * RSpacingE * RSpanE) / 2000000).toFixed(2);
  let vmediumRE = (
    (Math.max(UDnL, UDnWd, UDnSnd) * RSpacingE * RSpanE) /
    2000000
  ).toFixed(2);
  let vlongRE = ((UDl * RSpacingE * RSpanE) / 2000000).toFixed(2);
  let PMLongRE = ((UDl * RSpacingE * RSpanE ** 2) / 8000000000).toFixed(2);
  
  let PMMediumRE = Math.max(
    (Math.max(UDnL, UDnWd, UDnSnd) * RSpacingE * RSpanE ** 2) / 8000000000,
    (1.2 * RSpacingE * Dl * RSpanE ** 2) / 8000000000 +
      (0.55 * RSpanE * 0.5) / 1000
  ).toFixed(2);
  
  let PMshortuRE = ((UDnWu * RSpacingE * RSpanE ** 2) / 8000000000).toFixed(2);
  let reactionRE = Math.max(
    (UDl * RSpacingE * RSpanE,
    Math.max(UDnL, UDnWd, UDnSnd) * RSpacingE * RSpanE) / 2000000
  ).toFixed(2);
  let reactionupRE = ((UDnWu * RSpacingE * RSpanE) / 2000000).toFixed(2);

  if (PropQuantity == 0) {
    vshortRI = ((UDnWu * RSpacingI * RSpanI) / 2000000).toFixed(2);
    vmediumRI = (
      (Math.max(UDnL, UDnWd, UDnSnd) * RSpacingI * RSpanI) /
      2000000
    ).toFixed(2);
    vlongRI = ((UDl * RSpacingI * RSpanI) / 2000000).toFixed(2);
    PMLongRI = ((UDl * RSpacingI * RSpanI ** 2) / 8000000000).toFixed(2);

    PMMediumRI = Math.max(
      (Math.max(UDnL, UDnWd, UDnSnd) * RSpacingI * RSpanI ** 2) / 8000000000,
      (1.2 * RSpacingI * Dl * RSpanI ** 2) / 8000000000 +
        (0.55 * RSpanI * 0.5) / 1000
    ).toFixed(2);
    PMshortuRI = ((UDnWu * RSpacingI * RSpanI ** 2) / 8000000000).toFixed(2);
    reactionRI = Math.max(
      (UDl * RSpacingI * RSpanI,
      Math.max(UDnL, UDnWd, UDnSnd) * RSpacingI * RSpanI) / 2000000
    ).toFixed(2);
    reactionupRI = ((UDnWu * RSpacingI * RSpanI) / 2000000).toFixed(2);
    reactionupRI2 = reactionupRI;
    reactionRI2 = reactionRI;
    reactionProp = 0;
    reactionPropUp = 0;
  } else if (PropQuantity == 1) {
    let m1dead =
      -(
        Math.abs(Dl) *
        RSpacingI *
        0.001 *
        ((PropLength * 0.001) ** 3 + ((RSpanI - PropLength) * 0.001) ** 3)
      ) /
      (8 * RSpanI * 0.001);
    let m1live =
      -(
        Math.abs(Ll) *
        RSpacingI *
        0.001 *
        ((PropLength * 0.001) ** 3 + ((RSpanI - PropLength) * 0.001) ** 3)
      ) /
      (8 * RSpanI * 0.001);
    let m1wind =
      -(
        Math.abs(WindDown) *
        RSpacingI *
        0.001 *
        ((PropLength * 0.001) ** 3 + ((RSpanI - PropLength) * 0.001) ** 3)
      ) /
      (8 * RSpanI * 0.001);
    let m1short =
      -(
        Math.abs(UDnWu) *
        RSpacingI *
        0.001 *
        ((PropLength * 0.001) ** 3 + ((RSpanI - PropLength) * 0.001) ** 3)
      ) /
      (8 * RSpanI * 0.001);

    let m1medium =
      -(
        Math.max(UDnL, UDnWd, UDnSnd) *
        RSpacingI *
        0.001 *
        ((PropLength * 0.001) ** 3 + ((RSpanI - PropLength) * 0.001) ** 3)
      ) /
      (8 * RSpanI * 0.001);
    let m1long =
      -(
        UDl *
        RSpacingI *
        0.001 *
        ((PropLength * 0.001) ** 3 + ((RSpanI - PropLength) * 0.001) ** 3)
      ) /
      (8 * RSpanI * 0.001);

    r1dead =
      (m1dead * 1000000) / (RSpanI - PropLength) +
      Math.abs(Dl) * RSpacingI * 0.001 * (RSpanI - PropLength) * 0.5;
    r1live =
      (m1live * 1000000) / (RSpanI - PropLength) +
      Math.abs(Ll) * RSpacingI * 0.001 * (RSpanI - PropLength) * 0.5;
    r1wind =
      (m1wind * 1000000) / (RSpanI - PropLength) +
      Math.abs(WindDown) * RSpacingI * 0.001 * (RSpanI - PropLength) * 0.5;
    r1short =
      (m1short * 1000000) / (RSpanI - PropLength) +
      Math.abs(UDnWu) * RSpacingI * 0.001 * (RSpanI - PropLength) * 0.5;

    r1medium =
      (m1medium * 1000000) / (RSpanI - PropLength) +
      Math.max(UDnL, UDnWd, UDnSnd) *
        RSpacingI *
        0.001 *
        (RSpanI - PropLength) *
        0.5;
    r1long =
      (m1long * 1000000) / (RSpanI - PropLength) +
      UDl * RSpacingI * 0.001 * (RSpanI - PropLength) * 0.5;

    let r3short =
      (m1short * 1000000) / PropLength +
      Math.abs(UDnWu) * RSpacingI * 0.001 * PropLength * 0.5;

    let r3medium =
      (m1medium * 1000000) / (RSpanI - PropLength) +
      Math.max(UDnL, UDnWd, UDnSnd) * RSpacingI * 0.001 * PropLength * 0.5;
    let r3long =
      (m1long * 1000000) / (RSpanI - PropLength) +
      UDl * RSpacingI * 0.001 * PropLength * 0.5;

    let r2short =
      Math.abs(UDnWu) * RSpacingI * 0.001 * RSpanI - r1short - r3short;

    let r2medium =
      Math.max(UDnL, UDnWd, UDnSnd) * RSpacingI * 0.001 * RSpanI -
      r1medium -
      r3medium;
    let r2long = UDl * RSpacingI * 0.001 * RSpanI - r1long - r3long;

    vshortRI = (r2short / 1000).toFixed(2);

    vmediumRI = (r2medium / 1000).toFixed(2);
    vlongRI = (r2long / 1000).toFixed(2);

    PMshortuRI = m1short.toFixed(2);

    PMMediumRI = m1medium.toFixed(2);

    PMLongRI = m1long.toFixed(2);
    reactionProp = Math.max(r2long, r2medium);
    reactionPropUp = r2short;
    reactionRI = (Math.max(r1long, r1medium) / 1000).toFixed(2);
    reactionupRI = (r1short / 1000).toFixed(2);
    reactionRI2 = (Math.max(r3long, r3medium) / 1000).toFixed(2);
    reactionupRI2 = (r3short / 1000).toFixed(2);
  } else if (PropQuantity == 2) {
    PMshortuRI = MMomentShort;

    PMMediumRI = MMomentMedium;

    PMLongRI = MMomentLong;

    reactionRI = Math.max(MReactionLong, MReactionMedium);
    reactionupRI = MReactionShort;
    reactionRI2 = Math.max(MReaction2Long, MReaction2Medium);
    reactionupRI2 = MReaction2Short;
    reactionProp = Math.max(MReactionPropLong, MReactionPropMedium) * 1000;
    reactionPropUp = MReactionPropShort * 1000;
    vshortRI = MReactionShort;
    MReactionPropShortImp = MReactionPropShort;
    MReactionPropMediumImp = MReactionPropMedium;
    MReactionPropLongImp = MReactionPropLong;
    vmediumRI = MReactionMedium;
    vlongRI = MReactionLong;
  }

  return [
    {
      MomentLong: PMLong,
      MomentMedium: PMMedium,
      MomentShort: PMshortu,
      PSpan: PSpan,
      pSpacing: pSpacing,
      Dl: Dl,
      Ll: Ll,
      reaction: reaction,
      reactionup: reactionup,
      windup: Wu,
      SnowDown: Snd,
      vshort: vshort,
      vmedium: vmedium,
      vlong: vlong,
      vshortRI: vshortRI,
      vmediumRI: vmediumRI,
      vlongRI: vlongRI,
      PMLongRI: PMLongRI,
      PMMediumRI: PMMediumRI,
      PMshortuRI: PMshortuRI,
      reactionRI: reactionRI,
      reactionupRI: reactionupRI,
      RSpacingI: RSpacingI,
      RSpanI: RSpanI,
      vshortRE: vshortRE,
      vmediumRE: vmediumRE,
      vlongRE: vlongRE,
      PMLongRE: PMLongRE,
      PMMediumRE: PMMediumRE,
      PMshortuRE: PMshortuRE,
      reactionRE: reactionRE,
      reactionupRE: reactionupRE,
      RSpacingE: RSpacingE,
      RSpanE: RSpanE,
      reactionProp: (reactionProp / 1000).toFixed(2),
      reactionPropUp: (reactionPropUp / 1000).toFixed(2),
      reactionRI2: reactionRI2,
      reactionupRI2: reactionupRI2,
      MMomentLong: MMomentLong,
      MMomentMedium: MMomentMedium,
      MMomentShort: MMomentShort,
      MReactionLong: MReactionLong,
      MReactionMedium: MReactionMedium,
      MReactionShort: MReactionShort,
      MReaction2Long: MReaction2Long,
      MReaction2Medium: MReaction2Medium,
      MReaction2Short: MReaction2Short,
      MReactionPropLong: MReactionPropLong,
      MReactionPropMedium: MReactionPropMedium,
      MReactionPropShort: MReactionPropShort,
    },
  ];
};

exports.beamdesign = function (
  member,
  BottomRest,
  TopRes,
  Dl,
  pSpacing,
  PSpan,
  wind,
  windDown,
  Ll,
  RSpI,
  RSpaI,
  IL
) {
  let BRes = Number(BottomRest);
  let TRes = Number(TopRes);
  let RSpacingI = Number(RSpI);
  let RSpanI = Number(RSpaI);

  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";

  memberproperties(member);

  let k24 = Math.min((300 / d) ** 0.167,1);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }

  s1u = 1.35 * ((BRes / b) * (((d / b) ** 2) - 1) ** 0.5) ** 0.5;
  s1d = 1.35 * ((TRes / b) * (((d / b) ** 2) - 1) ** 0.5) ** 0.5;
  
  if (moisture == "dry") {
    a1 = 0.21;
    a2 = 0.175;
    a3 = -0.0116;
    a4 = 1 / 5000;
    a5 = 235.5;
    a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    a1 = 0.45;
    a2 = 0.1237;
    a3 = -0.0082;
    a4 = 1 / 7500;
    a5 = 251.4;
    a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }

  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort = (
    (0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let vmedium = (
    (0.8 * k1medium * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let vlong = (
    (0.8 * k1long * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let Mnushort = (
    (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mnumedium = (
    (0.8 * k1medium * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mnulong = (
    (0.8 * k1long * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndshort = (
    (0.8 * k1short * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndmedium = (
    (0.8 * k1medium * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndlong = (
    (0.8 * k1long * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);

  let deflong = Math.max(
    (grade.k2long * 5 * Dl * pSpacing * PSpan ** 4) / (384000 * I * grade.Elb) +
    (grade.k2short * 0.4 * 5 * Ll * pSpacing * PSpan ** 4) /
      (384000 * I * grade.Elb),  (grade.k2long * 5 * Dl * pSpacing * PSpan ** 4) / (384000 * I * grade.Elb) + (1100 * PSpan ** 3) /(48* I * grade.Elb)
  ).toFixed(2);

  let defshort = (
    (grade.k2long * 5 * Dl * pSpacing * PSpan ** 4) / (384000 * I * grade.Elb) +
    (grade.k2short * 5 * windDown * pSpacing * 0.5 * PSpan ** 4) /
      (384000 * I * grade.Elb)
  ).toFixed(2);
  console.log(deflong, defshort)
  
  let Deflimit = "";
  let Deflimitwn = "";

if (IL == "IL1") {
  Deflimit = (PSpan / 240).toFixed(2);
  Deflimitwn = (PSpan / 100).toFixed(2);
} else {
  Deflimit = (PSpan / 360).toFixed(2);
  Deflimitwn = (PSpan / 150).toFixed(2);
}

  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k1long: k1long,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort,
      shearMedium: vmedium,
      shearLong: vlong,
      Momentupshort: Mnushort || 0,
      MomentDownshort: Mndshort || 0,
      Momentupmedium: Mnumedium || 0,
      MomentDownmedium: Mndmedium || 0,
      Momentuplong: Mnulong || 0,
      MomentDownlong: Mndlong || 0,
      moisture: moisture,
      member: membername,
      MCondition: MCondition,
      deflong: deflong,
      defshort: defshort,
      E: grade.Elb,
      k2long: grade.k2long,
      Deflimit: Deflimit,
      Deflimitwn: Deflimitwn,
    },
  ];
};

exports.rafterdesign = function (
  member,
  Dl,
  RSpI,
  RSpaI,
  wind,
  windDown,
  Ll,
  noOfBay,
  PropQuantity,
  PropInternal,
  PropL,
  MDefShort,
  MDefLong,
  da,
  Noda,
  Pole,
  daProp,
  NodaProp,
  IL
) {
  let Poledia = "";
  if (Pole == "150SED") {
    Poledia = 150;
  } else if (Pole == "175SED") {
    Poledia = 175;
  } else if (Pole == "200SED") {
    Poledia = 200;
  } else if (Pole == "225SED") {
    Poledia = 225;
  } else if (Pole == "250SED") {
    Poledia = 250;
  } else if (Pole == "275SED") {
    Poledia = 275;
  } else if (Pole == "300SED") {
    Poledia = 300;
  } else if (Pole == "275UNI") {
    Poledia = 275;
  } else if (Pole == "300UNI") {
    Poledia = 300;
  }

  let RSpacingI = Number(RSpI);
  let RSpanI = Number(RSpaI);
  let display = " ";
  if (noOfBay == 0) {
    display = "none";
  } else {
    display = "";
  }

  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);

  BoltPerpendicularInternal(
    100,
    da,
    Noda,
    member,
    Poledia,
    daProp,
    NodaProp,
    PropInternal,
    PropL,
    MReactionPropShortImp,
    MReactionPropMediumImp,
    MReactionPropLongImp
  );


  
  memberproperties(member);
  let k24 = Math.min((300 / d) ** 0.167, 1);
  
  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }

  let s1u = 1.35 * ((900 / (2 * b)) * ((d / (2 * b)) ** 2 - 1) ** 0.5) ** 0.5;
  let s1d = 1.35 * ((900 / (2 * b)) * ((d / (2 * b)) ** 2 - 1) ** 0.5) ** 0.5;
  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }
  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort = (
    (0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let vmedium = (
    (0.8 * k1medium * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let vlong = (
    (0.8 * k1long * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let Mnushort = (
    (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  
  let Mnumedium = (
    (0.8 * k1medium * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mnulong = (
    (0.8 * k1long * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndshort = (
    (0.8 * k1short * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndmedium = (
    (0.8 * k1medium * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let deflong = "";
  let defshort = "";
  let Mndlong = (
    (0.8 * k1long * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);

  if (PropQuantity == 0) {
    deflong = (
      (grade.k2long * 5 * Dl * RSpacingI * RSpanI ** 4) /
        (2 * 384000 * I * grade.EI) +
      (0.4 * (grade.k2short * 5 * 0.4 * Ll * RSpacingI * RSpanI ** 4)) /
        (2 * 384000 * I * grade.EI)
    ).toFixed(2);

    defshort = (
      (grade.k2long * 5 * Dl * RSpacingI * RSpanI ** 4) /
        (2 * 384000 * I * grade.EI) +
      (grade.k2short * 5 * windDown * RSpacingI * 0.5 * RSpanI ** 4) /
        (2 * 384000 * I * grade.EI)
    ).toFixed(2);
  } else if (PropQuantity == 1) {
    deflong = (
      (grade.k2long *
        l1 ** 2 *
        (1.5 * l1 * (4 * r1dead - Dl * RSpacingI) -
          0.25 * l1 * (Dl * RSpacingI))) /
        (96 * grade.EI * I * 2) +
      (grade.k2short *
        0.4 *
        l1 ** 2 *
        (1.5 * l1 * (4 * r1live - Ll * RSpacingI) -
          0.25 * l1 * Ll * RSpacingI)) /
        (96 * grade.EI * I * 2)
    ).toFixed(2);
    defshort = (
      (grade.k2long *
        l1 ** 2 *
        (1.5 * l1 * (4 * r1dead - Dl * RSpacingI) -
          0.25 * l1 * (Dl * RSpacingI))) /
        (96 * grade.EI * I) +
      (grade.k2short *
        0.5 *
        l1 ** 2 *
        (1.5 * l1 * (4 * r1wind - windDown * RSpacingI) -
          0.25 * l1 * windDown * RSpacingI)) /
        (96 * grade.EI * I)
    ).toFixed(2);
  } else {
    deflong = MDefLong * grade.k2long;
    defshort = MDefShort;
  }
  let Deflimit = "";
  let Deflimitwn = "";
  if (IL == "IL1") {
    Deflimit = (RSpanI / 240).toFixed(2);
    Deflimitwn = (RSpanI / 100).toFixed(2);
  } else {
    Deflimit = (RSpanI / 360).toFixed(2);
    Deflimitwn = (RSpanI / 150).toFixed(2);
  }
  

  
  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k1long: k1long,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort * 2,
      shearMedium: vmedium * 2,
      shearLong: vlong * 2,
      Momentupshort: Mnushort * 2,
      MomentDownshort: Mndshort * 2,
      Momentupmedium: Mnumedium * 2,
      MomentDownmedium: Mndmedium * 2,
      Momentuplong: Mnulong * 2,
      MomentDownlong: Mndlong * 2,
      moisture: moisture,
      member: membername,
      MCondition: MCondition,
      deflong: deflong / 2,
      defshort: defshort / 2,
      E: grade.EI,
      k2long: grade.k2long,
      Deflimit: Deflimit,
      Deflimitwn: Deflimitwn,
      display: display,
      PropQ: PropQuantity,
      PropInternal: "2/" + PropInternal,
      PropL: PropL + "mm",
      MDefShort: MDefShort,
      MDefLong: MDefLong,
      fcjPar: grade.fcjPar,
      fpjPer: grade.fpjPer,
      k11Par: grade.k11Par,
      k11Per: grade.k11Per,
      JD: grade.JD,
      Qnshort: Qnshort,
      da: da,
      Noda: Noda,
      be: 2 * b,
      QnPropShort: QnPropShort,
      QnPropMedium: QnPropMedium,
      QnPropLong: QnPropLong,
      daProp: daProp,
      NodaProp: NodaProp,
      Poledia: Poledia,
      aperMin: aperMin,
      aperProp: aperProp,
      PropRatioShort: PropRatioShort,
      PropRatioMedium: PropRatioMedium,
      PropRatioLong: PropRatioLong,
      Pl: Pl
    },
  ];
};
exports.rafterdesignE = function (
  member,
  Dl,
  RSpI,
  RSpaI,
  wind,
  windDown,
  Ll,
  da,
  Noda,
  IL
) {

  let RSpacingI = Number(RSpI) / 2;
  let RSpanI = Number(RSpaI);
  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);
  BoltPerpendicularExternal(100, da, Noda, member);

  let k24 = Math.min( (300 / d) ** 0.167, 1);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }

  let s1u = 1.35 * ((900 / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  let s1d = 1.35 * ((900 / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }
  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort = (
    (0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let vmedium = (
    (0.8 * k1medium * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let vlong = (
    (0.8 * k1long * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);
  let Mnushort = (
    (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mnumedium = (
    (0.8 * k1medium * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mnulong = (
    (0.8 * k1long * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndshort = (
    (0.8 * k1short * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let Mndmedium = (
    (0.8 * k1medium * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);

  let Mndlong = (
    (0.8 * k1long * k4 * k5 * k8t * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);
  let deflong = (
    (grade.k2long * 5 * Dl * RSpacingI * RSpanI ** 4) /
      (384000 * I * grade.EI) +
    (grade.k2short * 5 * 0.4 * Ll * RSpacingI * RSpanI ** 4) /
      (384000 * I * grade.EI)
  ).toFixed(2);
  let defshort = (
    (grade.k2long * 5 * Dl * RSpacingI * RSpanI ** 4) /
      (384000 * I * grade.EI) +
    (grade.k2short * 5 * windDown * RSpacingI * 0.5 * RSpanI ** 4) /
      (384000 * I * grade.EI)
  ).toFixed(2);

  let Deflimit = "";
  let Deflimitwn = "";
  if (IL == "IL1") {
    Deflimit = (RSpanI / 240).toFixed(2);
    Deflimitwn = (RSpanI / 100).toFixed(2);
  } else {
    Deflimit = (RSpanI / 360).toFixed(2);
    Deflimitwn = (RSpanI / 150).toFixed(2);
  }


  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k1long: k1long,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort,
      shearMedium: vmedium,
      shearLong: vlong,
      Momentupshort: Mnushort,
      MomentDownshort: Mndshort,
      Momentupmedium: Mnumedium,
      MomentDownmedium: Mndmedium,
      Momentuplong: Mnulong,
      MomentDownlong: Mndlong,
      moisture: moisture,
      member: membername,
      MCondition: MCondition,
      deflong: deflong,
      defshort: defshort,
      E: grade.EI,
      k2long: grade.k2long,
      Deflimit: Deflimit,
      Deflimitwn: Deflimitwn,
      fcjPar: grade.fcjPar,
      fpjPer: grade.fpjPer,
      k11Par: grade.k11Par,
      k11Per: grade.k11Per,
      JD: grade.JD,
      Qnshort: Qnshort,
      da: da,
      Noda: Noda,
      v: v,
      b: b,
    },
  ];
};

exports.IntermediateFB = function (
  member,
  ForB,
  FSpan,
  pitch,
  Bayw,
  wind,
  Sn,
  type,
  width,
  MaxGirtSpan,
  IFBAuto,
  IFBSpan,
  IFBWidth,
  IL
) {
  let IFBDisplay = "";
  let bayWidth = "";
  let Span = " ";
  if (IFBAuto == "IFBAuto") {
    IFBDisplay = "none";
    bayWidth = Number(Bayw);
    if (type == "Mono") {
      if (ForB == "Front") {
        Span = Number(FSpan) - 0.15;
      } else {
        Span = Number(FSpan) - width * Math.tan(pitch * (Math.PI / 180)) - 0.15;
      }
    } else {
      Span =
        Number(FSpan) - 0.5 * width * Math.tan(pitch * (Math.PI / 180)) - 0.15;
    }
  } else {
    IFBDisplay = "";
    Span = Number(IFBSpan / 1000);
    bayWidth = Number(IFBWidth);
  }

  let display = "";
  if (Bayw <= MaxGirtSpan) {
    display = "none";
  } else {
    display = "";
  }

  

  let Snow = Number(Sn);
  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);
  let k24 = Math.min((300 / d) ** 0.167,1);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11; 
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }

  let s1u = 1.35 * ((Span / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  let s1d = 1.35 * ((900 / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }
  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort =
    2 * ((0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) / 1000).toFixed(2);

  let Mnushort =
    2 *
    (
      (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
      6000000
    ).toFixed(2);
   
    
  let MApplied = (
    (Math.max(Number(wind), Number(Snow)) * bayWidth * 0.5 * Span ** 2) /
    8000
  ).toFixed(2);
  

  let reaction = (
    (Math.max(Number(wind), Number(Snow)) * bayWidth * 0.5 * Span) /
    2000
  ).toFixed(2);
  let defshort =
    0.5 *
    (
      (grade.k2short * 5 * wind * bayWidth * 0.5 * (Span * 1000) ** 4) /
        (384000 * I * grade.EI) +
      (grade.k2short * 5 * Snow * bayWidth * 0.5 * (Span * 1000) ** 4) /
        (384000 * I * grade.EI)
    ).toFixed(2);
    
    let Deflimitwn = "";

    
    if (IL == "IL1") {
      
      Deflimitwn = (Span*1000 / 100).toFixed(2);
    } else {
      
      Deflimitwn = (Span*1000 / 250).toFixed(2);
    }

  

  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort,
      reaction: reaction,
      Mnushort: Mnushort,
      MApplied: MApplied,
      moisture: moisture,
      bayWidth: bayWidth * 0.5,
      Span: (Span * 1000).toFixed(0),
      member: membername,
      MCondition: MCondition,
      defshort: defshort,
      E: grade.EI,
      k2short: grade.k2short,
      Deflimitwn: Deflimitwn,
      display: display,
      IFBDisplay: IFBDisplay,
      IFBSpan: IFBSpan,
      IFBWidth: IFBWidth,
      IL
    },
  ];
};

exports.IntermediateSides = function (
  member,
  roofType,
  FSpan,
  pitch,
  Bayw,
  wind,
  Sn,
  noOfEndBays,
  width,
  MaxGirtSpan,
  ISIAuto,
  ISISpan,
  ISIWidth,
  IL
) {
  let Span = " ";
  let BSpan = "";
  let ISIDisplay = "";
  let display = "";
  let bayWidth = "";

  if (ISIAuto == "ISIAuto") {
    ISIDisplay = "none";

    if (Bayw <= MaxGirtSpan / 1000) {
      display = "none";
      bayWidth = Number(Bayw);
    } else {
      display = "";
      bayWidth = Number(Bayw) / 2;
    }

    if (roofType == "Mono") {
      BSpan = Number(FSpan) - width * Math.tan(pitch * (Math.PI / 180));
      if (noOfEndBays == 1) {
        Span = (Number(FSpan) + Number(BSpan)) / 2 - 0.15;
      } else if (noOfEndBays == 2) {
        Span = ((Number(FSpan) + Number(BSpan)) / 2 + Number(FSpan)) / 2 - 0.15;
      } else {
        Span =
          (((Number(FSpan) + Number(BSpan)) / 2 + Number(FSpan)) / 2 +
            Number(FSpan)) /
            2 -
          0.15;
      }
    } else {
      BSpan = Number(FSpan) - 0.5 * width * Math.tan(pitch * (Math.PI / 180));
      if (noOfEndBays == 1) {
        Span = Number(FSpan) - 0.15;
      } else if (noOfEndBays == 2) {
        Span = (Number(FSpan) + Number(BSpan)) / 2 - 0.15;
      } else {
        Span = ((Number(FSpan) + Number(BSpan)) / 2 + Number(FSpan)) / 2 - 0.15;
      }
    }
  } else {
    ISIDisplay = "";
    Span = ISISpan / 1000;
    bayWidth = ISIWidth / 1000;
  }

  let Snow = Number(Sn);

  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);
  let k24 = Math.min((300 / d) ** 0.167,1);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }
  let s1u = 1.35 * ((Span / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  let s1d = 1.35 * ((900 / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }
  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort =
    2 * ((0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) / 1000).toFixed(2);

  let Mnushort =
    2 *
    (
      (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
      6000000
    ).toFixed(2);

    
    let test = (wind*bayWidth*0.5*Span**2/8)
    
  let MApplied = (
    (Math.max(Number(wind), Number(Snow)) * bayWidth* 0.5  * Span**2) /
    8
  ).toFixed(2);
 
  let reaction = (
    (Math.max(Number(wind), Number(Snow)) * bayWidth* 0.5 * Span) /
    2
  ).toFixed(2);
  let defshort =
    0.5 *
    (
      (grade.k2short * 5 * wind * bayWidth * 1000 * (Span * 1000) ** 4) /
        (384000 * I * grade.EI) +
      (grade.k2short * 5 * Snow * bayWidth * 1000 * (Span * 1000) ** 4) /
        (384000 * I * grade.EI)
    ).toFixed(2);

    let Deflimitwn = "";

    
    if (IL == "IL1") {
      
      Deflimitwn = (Span*1000 / 100).toFixed(2);
    } else {
      
      Deflimitwn = (Span*1000 / 250).toFixed(2);
    }

  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort,
      reaction: reaction,
      Mnushort: Mnushort,
      MApplied: MApplied,
      moisture: moisture,
      bayWidth: bayWidth,
      Span: (Span * 1000).toFixed(0),
      member: membername,
      MCondition: MCondition,
      defshort: defshort,
      E: grade.EI,
      k2short: grade.k2short,
      Deflimitwn: Deflimitwn,
      display: display,
      ISIDisplay: ISIDisplay,
      ISISpan: ISISpan,
      ISIWidth: ISIWidth,
    },
  ];
};

exports.GirtsFB = function (member, Bayw, Gspacing, wind, Sn, MaxGirtSpan,gFBBlocking, InDisplay,IL) {
 
  let spacing = Number(Gspacing);
  let Spaning = 1;
  let display = "";
  if (Bayw <= MaxGirtSpan) {
    display = "";
  } else {
    display = ""; //none
    Spaning = 0.5;
  }
  let Span = Number(Bayw)* Spaning;

  let Snow = Number(Sn);
  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);

  let k24 = Math.min((300 / d) ** 0.167,1);

  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }

  let s1u = 1.35 * ((Span / (b*gFBBlocking)) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  let s1d = 1.35 * ((900 / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;

  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }

  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort = (
    (0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);

  let Mnushort = (
    (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);

  let MApplied = (
    (Math.max(Number(wind), Number(Snow)) * spacing  * Span ** 2) /
    8000000000
  ).toFixed(2);
  let reaction = (
    (Math.max(Number(wind), Number(Snow)) * spacing  * Span) /
    2000000
  ).toFixed(2);
  let defshort = (
    (grade.k2short * 5 * wind * spacing * 1000  * Span ** 4) /
      (384000000 * I * grade.Elb) +
    (grade.k2short * 5 * Snow * spacing * 1000  * Span ** 4) /
      (384000000 * I * grade.Elb)
  ).toFixed(2);
  let Isag = (d * b ** 3) / 12;
  let Selfweight = (d * b * 6.5) / 1000000;
  let sag = (1 * 5 * Selfweight * Span ** 4) / (384 * Isag * grade.Elb);

  let Deflimitwn = "";

    
  if (IL == "IL1") {
    
    Deflimitwn = (Span / 100).toFixed(2);
  } else {
    
    Deflimitwn = (Span / 250).toFixed(2);
  }

  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort,
      reaction: reaction,
      Mnushort: Mnushort,
      MApplied: MApplied,
      moisture: moisture,
      spacing: spacing,
      Span: Span.toFixed(0),
      member: membername,
      MCondition: MCondition,
      defshort: defshort,
      E: grade.Elb,
      k2short: grade.k2short,
      Deflimitwn: Deflimitwn,
      display: display,
      sag: sag.toFixed(2),
      gFBBlocking: gFBBlocking || 1
    },
  ];
};

exports.GirtsSi = function (member, Bayw, Gspacing, wind, Sn, MaxGirtSpan, gSIBlocking,IL) {

  let spacing = Number(Gspacing);
  let Spaning = "";

  let display = "";
  if (Bayw <= MaxGirtSpan) {
    display = "";
    Spaning = 1;
  } else {
    display = ""; //none
    Spaning = 0.5;
  }
 
  
  let Span = Number(Bayw) * Spaning;
  let Snow = Number(Sn);
  moisture = "";
  d = "";
  b = "";
  gr = [];
  membername = "";
  MCondition = "";
  memberproperties(member);

  let k24 = Math.min((300 / d) ** 0.167,1);
  if (gr == "SG8") {
    grade = SG8DFDP;
  } else if (gr == "SG6Wet") {
    grade = SG6DFWP;
  } else if (gr == "SG6Dry") {
    grade = SG6DFDP;
  } else if (gr == "lvl8") {
    grade = LVL8;
  } else if (gr == "lvl13") {
    grade = LVL13;
  } else if (gr == "lvl11") {
    grade = LVL11;
  } else if (gr == "SG8Wet") {
    grade = SG8DFWP
  }

  let s1u = 1.35 * ((Span / (b*gSIBlocking)) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  let s1d = 1.35 * ((900 / b) * ((d / b) ** 2 - 1) ** 0.5) ** 0.5;
  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s1d <= 10) {
      k8t = 1;
    } else if (s1d > 10 && s1d < 25) {
      k8t = a1 + a2 * s1d + a3 * s1d ** 2 + a4 * s1d ** 3;
    } else {
      k8t = a5 * s1d ** a6;
    }
    if (s1u <= 10) {
      k8d = 1;
    } else if (s1u > 10 && s1u < 25) {
      k8d = a1 + a2 * s1u + a3 * s1u ** 2 + a4 * s1u ** 3;
    } else {
      k8d = a5 * s1u ** a6;
    }
  }
  let I = (b * d ** 3) / 12;
  // beam shear Design

  let vshort = (
    (0.8 * k1short * k4 * k5 * grade.fs * 0.67 * b * d) /
    1000
  ).toFixed(2);

  let Mnushort = (
    (0.8 * k1short * k4 * k5 * k8d * grade.fb * k24 * (b * d ** 2)) /
    6000000
  ).toFixed(2);

  
    
  let MApplied = (
    (Math.max(Number(wind), Number(Snow)) * spacing  * Span ** 2) /
    8000000000
  ).toFixed(2);
  
  let reaction = (
    (Math.max(Number(wind), Number(Snow)) * spacing  * Span) /
    2000000
  ).toFixed(2);
  let defshort = (
    (grade.k2short * 5 * wind * spacing * 1000  * Span ** 4) /
      (384000000 * I * grade.Elb) +
    (grade.k2short * 5 * Snow * spacing * 1000 * Span ** 4) /
      (384000000 * I * grade.Elb)
  ).toFixed(2);
  let Isag = (d * b ** 3) / 12;
  let Selfweight = (d * b * 6.5) / 1000000;
  let sag = (1 * 5 * Selfweight * Span ** 4) / (384 * Isag * grade.Elb);

  let Deflimitwn = "";

   
  if (IL == "IL1") {
    
    Deflimitwn = (Span / 100).toFixed(2);
  } else {
    
    Deflimitwn = (Span / 250).toFixed(2);
  }

  return [
    {
      k1Short: k1short,
      k1medium: k1medium,
      k4: k4,
      k5: k5,
      k8down: k8d,
      k8top: k8t,
      s1up: s1u,
      s1down: s1d,
      ShearStress: grade.fs,
      BendingStress: grade.fb,
      shearShort: vshort,
      reaction: reaction,
      Mnushort: Mnushort,
      MApplied: MApplied,
      moisture: moisture,
      spacing: spacing,
      Span: Span.toFixed(0),
      member: membername,
      MCondition: MCondition,
      defshort: defshort,
      E: grade.Elb,
      k2short: grade.k2short,
      Deflimitwn: Deflimitwn,
      display: display,
      sag: sag.toFixed(2),
      gSIBlocking: gSIBlocking || 1
    },
  ];
};

exports.PoleDesignI = function (
  poleDepth,
  RHeight,
  member,
  RSpacingI,
  RSpanI,
  wind,
  snow,
  noOfColInMiddleBay,
  noOfColInEndBay,
  noOfBay,
  length,
  width,
  Gsnow,
  rafter,
  RFrom1,
  RTo1,
  RCPe1,
  Rpe1,
  Rpnet1,
  RFrom2,
  RTo2,
  RCpe2,
  Rpe2,
  Rpnet2,
  WFrom1,
  WTo1,
  WCPe1,
  Wpe1,
  Wpnet1,
  WFrom2,
  WTo2,
  WCpe2,
  Wpe2,
  Wpnet2,
  Type,
  WCpi1,
  WCpi2,
  RCpi2,
  RMaxD,
  RMaxU,
  WMax,
  RackMax,
  pSpanManual,
  displayManual,
  cer,
  info,
  MPoleHeight,
  MPoleRes,
  PropL,
  PropQ,
  MDeadLoad,
  MLiveLoad,
  MWindLoad,
  MSnowLoad,
  MWindDown,
  MWindLateral,
  MSnowLateral,
  MWindLateralPole,
  MSnowLateralPole,
  PDisplay,
  ReDisplay,
  RDisplay,
  roofType,
  InDisplay,
  PeDisplay,
  InSideDisplay,
  PiDisplay,
  DL,
  Cohesion,
  Friction,
  Density,
  IL
) {
  let IntermediateSideDisplay = "";
  if (InSideDisplay == "Hide") {
    IntermediateSideDisplay = "none";
  } else {
    IntermediateSideDisplay = "";
  }

  let PoleInternalDisplay = "";
  if (PiDisplay == "Hide") {
    PoleInternalDisplay = "none";
  } else {
    PoleInternalDisplay = "";
  }

  let PoleExternalDisplay = "";
  if (PeDisplay == "Hide") {
    PoleExternalDisplay = "none";
  } else {
    PoleExternalDisplay = "";
  }

  let IntermediateFBDisplay = "";
  if (InDisplay == "Hide") {
    IntermediateFBDisplay = "none";
  } else {
    IntermediateFBDisplay = "";
  }

  let RInternalDisplay = "";
  if (RDisplay == "Hide") {
    RInternalDisplay = "none";
  } else {
    RInternalDisplay = "";
  }

  let RExternalDisplay = "";
  if (ReDisplay == "Hide") {
    RExternalDisplay = "none";
  } else {
    RExternalDisplay = "";
  }

  
  let PurlinDisplay = "";
  if (PDisplay == "Hide") {
    PurlinDisplay = "none";
  } else {
    PurlinDisplay = "";
  }
  let MipCalc = "";
  if (PropQ == 0) {
    MipCalc = "none";
  } else {
    MipCalc = "";
  }
  let IInfo = "";
  if (info == "Hide") {
    IInfo = "none";
  } else {
    IInfo = "";
  }

  let cerdisplay = "";
  if (cer == "No") {
    cerdisplay = "none";
  } else {
    cerdisplay = "";
  }
  let Manualdisplay = "";
  if (displayManual == "Auto") {
    Manualdisplay = "none";
  } else {
    Manualdisplay = "";
  }
  
  let gamma = Number(Density) || 18;

  let EQp = "";
  let SNp = "";
  
  if (IL == "IL1") {
    EQp = 100;
    SNp = 50;
    IL=1
  } else {
    EQp=500;
    SNp = 150;
    IL=2
  }

  // let NoofColumns =
  //   (Number(noOfColInMiddleBay) + 1) * (Number(noOfBay) - 1) +
  //   (Number(noOfColInEndBay) + 1) * 2;
  // let TotalArea = length * width;
  // let UpLiftOnColumn = ((RMaxU - 0.9 * 0.25) * TotalArea) / NoofColumns;

  let TotalArea = "";

  if (noOfColInMiddleBay == 1) {
    TotalArea = (RSpacingI * RSpanI * 0.5) / 1000000;
  } else {
    TotalArea = (RSpacingI * RSpanI) / 1000000;
  }

  let UpLiftOnColumn = (RMaxU - 0.9 *  DL) * TotalArea;

  let phi = 0.55;
  let kp = ((1+Math.sin((Number(Friction) * Math.PI) / 180))/(1-Math.sin((Number(Friction) * Math.PI) / 180))).toFixed(2);
  let k0 = (1/kp).toFixed(2);
 
  let Ds = 0.6;
  let Hu =
    (phi * (kp * Ds * (poleDepth / 1000) ** 3 * gamma)) /
    (2 * (Number(RHeight) + Number(poleDepth / 1000)));
  let Mu =
    phi *
    Hu *
    (0.67 * Math.sqrt((2 * Hu) / (3 * kp * Ds * gamma)) + Number(RHeight));
  let dr = "";
  if (rafter == "SG815050Dry") {
    dr = 150;
  } else if (rafter == "SG820050Dry") {
    dr = 200;
  } else if (rafter == "SG825050Dry") {
    dr = 250;
  } else if (rafter == "SG830050Dry") {
    dr = 300;
  } else if (rafter == "SG829045Dry") {
    dr = 290;
  } else if (rafter == "20045LVL13") {
    dr = 200;
  } else if (rafter == "24045LVL13") {
    dr = 240;
  } else if (rafter == "30045LVL13") {
    dr = 300;
  } else if (rafter == "36045LVL13") {
    dr = 360;
  } else if (rafter == "40045LVL13") {
    dr = 400;
  } else if (rafter == "45045LVL13") {
    dr = 450;
  } else if (rafter == "20063LVL13") {
    dr = 200;
  } else if (rafter == "24063LVL13") {
    dr = 240;
  } else if (rafter == "30063LVL13") {
    dr = 300;
  } else if (rafter == "36063LVL13") {
    dr = 360;
  } else if (rafter == "30090LVL11") {
    dr = 300;
  } else {
    dr = 200;
  }

  memberproperties(member);

  let Area = "";
  let ShearArea = "";
  let Ipole = "";
  let Zpole = "";
 
if (shape == "square"){
  Area = b*d;
  ShearArea = Area * 0.75;
  Ipole = (b*(d**3))/12;
  Zpole = (b*(d**2))/6 ;
} else {

  Area = (3.14 * d ** 2) / 4;
  ShearArea = Area * 0.75;
  Ipole = (3.14 * d ** 4) / 64;
  Zpole = (Ipole * 2) / d;
}


  let phiPole = 0.8;

  k10 = 2; //assuming no restraint at top
  let s = Math.min(Number(MPoleRes) / d, (2 * Number(MPoleHeight) - dr) / d);

  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s <= 10) {
      k8 = 1;
    } else if (s > 10 && s < 25) {
      k8 = a1 + a2 * s + a3 * s ** 2 + a4 * s ** 3;
    } else {
      k8 = a5 * s ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s <= 10) {
      k8 = 1;
    } else if (s > 10 && s < 25) {
      k8 = a1 + a2 * s + a3 * s ** 2 + a4 * s ** 3;
    } else {
      k8 = a5 * s ** a6;
    }
  }

  let PhiNcxW = (0.8 * 1 * Area * grade.fc * k8) / 1000;
  let PhiMn = (0.8 * 1 * k8 * grade.fb * Zpole) / 1000000;
  let PhiVn = (0.8 * 1 * grade.fs * Area * 0.75) / 1000;
  let PhiNcxD = PhiNcxW * 0.6;
  let PhiMnD = PhiMn * 0.6;
  let PhiVnD = PhiVn * 0.6;
  let PhiNcxS = PhiNcxW * 0.8;
  let PhiMnS = PhiMn * 0.8;
  let PhiVnS = PhiVn * 0.8;
  let RSpanoverPole = "";
  if (noOfColInMiddleBay == 1) {
    RSpanoverPole = RSpanI / 2;
  } else {
    RSpanoverPole = RSpanI;
  }

  let areaOverPole = RSpacingI * RSpanoverPole;

  let DeadLoad = " ";
  let LiveLoad = "";
  let windLoad = "";
  let snowLoad = "";
  let MwindLateral = "";
  let MwindLateralPole = "";
  let MwindDownward = "";
  let Dead = "";
  let Live = "";
  let Sn = "";
  let SnMoment = "";
  let SnMomentPole = "";
  Dead = RSpacingI * RSpanI *  DL;
  Live = RSpacingI * RSpanI * 0.25;
  Sn = RSpacingI * RSpanI * snow;

  if (PropQ == 0) {
    DeadLoad = areaOverPole *  DL;
    LiveLoad = areaOverPole * 0.25;
    windLoad = areaOverPole * wind;
    snowLoad = areaOverPole * snow;

    MwindLateral =
      (RSpacingI * RHeight * 0.5 * 1.33 * RHeight * 1000 * RackMax) /
      (Number(noOfColInMiddleBay) + 1);

    MwindDownward = RSpacingI * RSpanI * wind;

    SnMoment =
      (RSpacingI * RHeight * 1000 * 1.33 * 0.5 * Gsnow) /
      (Number(noOfColInMiddleBay) + 1);
    MWindLateralPole = MwindLateral;
    MSnowLateralPole = SnMoment;
  } else {
    DeadLoad = Number(MDeadLoad) * 1000000;
    LiveLoad = Number(MLiveLoad) * 1000000;
    windLoad = Number(MWindDown) * 1000000;
    snowLoad = Number(MSnowLoad) * 1000000;
    MwindLateral = Number(MWindLateral) * 1000000;
    SnMoment = Number(MSnowLateral) * 1000000;
    MWindLateralPole = Number(MWindLateralPole) * 1000000;
    SnMomentPole = Number(MSnowLateralPole) * 1000000;
  }

  let Ccheck1 =
    (1.2 * DeadLoad) / (PhiNcxD * 1000000) +
    Math.max(windLoad / (PhiNcxW * 1000000), snowLoad / (PhiNcxS * 1000000)) +
    Math.max(MwindLateral / (PhiMn * 1000000), SnMoment / (PhiMnS * 1000000));
  let Ccheck2 =
    (1.2 * DeadLoad) / (PhiNcxD * 1000000) +
    Math.max(windLoad / (PhiNcxW * 1000000), snowLoad / (PhiNcxS * 1000000)) +
    Math.max(MwindLateral / (PhiMn * 1000000), SnMoment / (PhiMnS * 1000000)) **
      2;
  let Ccheck = Math.max(Ccheck1, Ccheck2);

  let Def = Math.max(
    (((RSpacingI * MPoleHeight * 0.5 * RackMax * 0.001) /
      (Number(noOfColInMiddleBay) + 1)) *
      (RHeight * 1000) ** 2 *
      (3 * RHeight * 1000 * 1.33 - RHeight * 1000)) /
      (6 * grade.E * Ipole * 2)
  );

  let Deflimit = " ";
  let VerDefDead = " ";
  let VerDefWind="";
  let LatDef = "";


  if (IL == 1){

    Deflimit = MPoleHeight / 100;
    VerDefDead = 240;
    VerDefWind= 100;
    LatDef = 100;

  } else {
    Deflimit = MPoleHeight / 150;
    VerDefDead = 360;
    VerDefWind=250;
    LatDef = 150;
  }

  

  //footing design

  let FcheckM = Math.max(MWindLateralPole, MSnowLateralPole) / (Mu * 1000000);

  let Shearwind =
    (RSpacingI * RHeight * 1.33 * 0.5 * RackMax) /
    (Number(noOfColInMiddleBay) + 1);
  let Shearsnow =
    (RSpacingI * RHeight * 1.33 * 0.5 * Gsnow) /
    (Number(noOfColInMiddleBay) + 1);

  let FcheckS = Math.max(Shearwind, Shearsnow) / (Hu * 1000);

  let Fcheck = Math.max(FcheckM, FcheckS);
  let display = "";
  if (snow == 0) {
    display = "none";
  } else {
    display = "";
  }

  // uplift check

  let conpiledia = 0.6;

  let pileSkinFriction =
    (0.55 *
      poleDepth ** 2 *
      3.14 *
      conpiledia *
      1.5 *
      gamma *
      0.5 *
      Math.tan((Friction * Math.PI) / 180)) /
    1000000;

  let pileWeight =
    (0.9 * poleDepth * 3.14 * (conpiledia * 0.5 - d * 0.001 * 0.5) ** 2 * 24) / 1000 +
    (0.9 * poleDepth * (d * 0.001 * 0.5) ** 2 * 5) / 1000 +
    pileSkinFriction;

  return [
    {
      member: membername,
      Height: MPoleHeight,
      MPoleRes: MPoleRes,
      Area: Area.toFixed(0),
      ShearArea: ShearArea,
      Ipole: Ipole.toFixed(0),
      Zpole: Zpole.toFixed(0),
      PhiNcxW: PhiNcxW.toFixed(2),
      PhiMn: PhiMn.toFixed(2),
      PhiVn: PhiVn.toFixed(2),
      PhiNcxD: PhiNcxD.toFixed(2),
      PhiMnD: PhiMnD.toFixed(2),
      PhiVnD: PhiVnD.toFixed(2),
      PhiNcxS: PhiNcxS.toFixed(2),
      PhiMnS: PhiMnS.toFixed(2),
      PhiVnS: PhiVnS.toFixed(2),
      fb: grade.fb,
      fc: grade.fc,
      fs: grade.fs,
      fp: grade.fp,
      E: grade.E,
      ft: grade.ft,
      DeadLoad: (DeadLoad / 1000000).toFixed(2),
      LiveLoad: (LiveLoad / 1000000).toFixed(2),
      windLoad: (windLoad / 1000000).toFixed(2),
      snowLoad: (snowLoad / 1000000).toFixed(2),
      MwindLateral: (MwindLateral / 1000000).toFixed(2),
      SnMoment: (SnMoment / 1000000).toFixed(2),
      Hu: Hu.toFixed(2),
      Mu: Mu.toFixed(2),
      k8: k8.toFixed(2),
      k20: k20,
      Ccheck1: Ccheck1.toFixed(2),
      Ccheck2: Ccheck2.toFixed(2),
      Ccheck: Ccheck.toFixed(2),
      FcheckM: FcheckM.toFixed(2),
      FcheckS: FcheckS.toFixed(2),
      Fcheck: Fcheck.toFixed(2),
      Def: Def.toFixed(2),
      Deflimit: Deflimit.toFixed(2),
      display: display,
      poleDepth: poleDepth,
      RHeight: (RHeight * 1000).toFixed(0),
      Shearwind: (Shearwind / 1000).toFixed(2),
      Shearsnow: (Shearsnow / 1000).toFixed(2),
      RFrom1: RFrom1,
      RTo1: RTo1,
      RCPe1: RCPe1,
      Rpe1: Rpe1,
      Rpnet1: Rpnet1,
      RFrom2: RFrom2,
      RCpe2: RCpe2,
      Rpe2: Rpe2,
      RTo2: RTo2,
      Rpnet2: Rpnet2,
      WFrom1: WFrom1,
      WTo1: WTo1,
      WCPe1: WCPe1,
      Wpe1: Wpe1,
      Wpnet1: Wpnet1,
      WFrom2: WFrom2,
      WTo2: WTo2,
      WCpe2: WCpe2,
      Wpe2: Wpe2,
      Wpnet2: Wpnet2,
      Type: Type,
      WCpi1: WCpi1,
      WCpi2: WCpi2,
      RCpi2: RCpi2,
      RMaxD: RMaxD,
      RMaxU: RMaxU,
      WMax: WMax,
      RackMax: RackMax,
      UpLiftOnColumn: UpLiftOnColumn.toFixed(2),
      pileWeight: pileWeight.toFixed(2),
      pSpanManual: pSpanManual,
      Manualdisplay: Manualdisplay,
      cerdisplay: cerdisplay,
      PLWManual: RSpacingI,
      IInfo: IInfo,
      pileSkinFriction: pileSkinFriction.toFixed(2),
      RISManual: RSpanI,
      PropL: PropL,
      MDeadLoad: MDeadLoad,
      MLiveLoad: MLiveLoad,
      MWindDown: MWindDown,
      MSnowLoad: MSnowLoad,
      MWindLateral: MWindLateral,
      MSnowLateral: MSnowLateral,
      MWindLateralPole: (MWindLateralPole / 1000000).toFixed(2),
      MSnowLateralPole: (MSnowLateralPole / 1000000).toFixed(2),
      MipCalc: MipCalc,
      PurlinDisplay: PurlinDisplay,
      RExternalDisplay: RExternalDisplay,
      RInternalDisplay: RInternalDisplay,
      TotalArea: TotalArea,
      roofType: roofType,
      IntermediateFBDisplay: IntermediateFBDisplay,
      PoleExternalDisplay: PoleExternalDisplay,
      IntermediateSideDisplay: IntermediateSideDisplay,
      PoleInternalDisplay: PoleInternalDisplay,
      Cohesion:Cohesion || 0,
      Friction:Friction || 30,
      Density:Density || 18,
      kpcoefficient:kp,
      k0coefficient:k0,
      IL:IL,
      EQp: EQp,
      SNp: SNp,
      conpiledia: conpiledia,
      VerDefDead: VerDefDead,
      VerDefWind: VerDefWind,
      LatDef: LatDef,
      DL: DL,
      Pl: Pl
    },
  ];
};

exports.PoleDesignE = function (
  poleDepth,
  RHeight,
  member,
  RSpacingI,
  RSpanI,
  wind,
  snow,
  noOfColInMiddleBay,
  Gsnow,
  rafter,
  RMaxD,
  RMaxU,
  WMax,
  RackMax,
  council,
  pages,
  dated,
  b2,
  soil,
  DL,
  Cohesion,
  Friction,
  Density,
  Geotech,
  IL
) {
  
  soil = soil || 300;
      
  Geotech = Geotech || "an Ultimate foundation bearing pressure of" +" "+soil+" "+ "kPa in accordance with NZS3604:2011";
  
  let displayb2 = "";
  if (b2 == "No") {
    displayb2 = "none";
  } else {
    displayb2 = "";
  }
  let gamma = Number(Density) || 18;
  let phi = 0.55;
  let kp = ((1+Math.sin((Number(Friction) * Math.PI) / 180))/(1-Math.sin((Number(Friction) * Math.PI) / 180))).toFixed(2);
  let k0 = (1/kp).toFixed(2);
  
  let Ds = 0.6;
  let Hu =
    (phi * (kp * Ds * (poleDepth / 1000) ** 3 * gamma)) /
    (2 * (Number(RHeight) + Number(poleDepth / 1000)));
  let Mu =
    phi *
    Hu *
    (0.67 * Math.sqrt((2 * Hu) / (3 * kp * Ds * gamma)) + Number(RHeight));
  let dr = "";
  if (rafter == "SG815050Dry") {
    dr = 150;
  } else if (rafter == "SG820050Dry") {
    dr = 200;
  } else if (rafter == "SG825050Dry") {
    dr = 250;
  } else if (rafter == "SG830050Dry") {
    dr = 300;
  } else if (rafter == "20045LVL13") {
    dr = 200;
  } else if (rafter == "24045LVL13") {
    dr = 240;
  } else if (rafter == "30045LVL13") {
    dr = 300;
  } else if (rafter == "36045LVL13") {
    dr = 360;
  } else if (rafter == "40045LVL13") {
    dr = 400;
  } else if (rafter == "45045LVL13") {
    dr = 450;
  } else if (rafter == "20063LVL13") {
    dr = 200;
  } else if (rafter == "24063LVL13") {
    dr = 240;
  } else if (rafter == "30063LVL13") {
    dr = 300;
  } else if (rafter == "36063LVL13") {
    dr = 360;
  } else if (rafter == "24045LVL8") {
    dr = 240;
  } else {
    dr = 200;
  }

  memberproperties(member);

  if (shape == "square"){
    Area = b*d;
    ShearArea = Area * 0.75;
    Ipole = (b*(d**3))/12;
    Zpole = (b*(d**2))/6 ;
  } else {
  
    Area = (3.14 * d ** 2) / 4;
    ShearArea = Area * 0.75;
    Ipole = (3.14 * d ** 4) / 64;
    Zpole = (Ipole * 2) / d;
  }
  

  
  let phiPole = 0.8;
  k10 = 2; //assuming no restraint at top
  let s = Math.min(
    (RHeight * 1000 * 1.333 - dr) / d,
    (2 * RHeight * 1000 * 1.333 - dr) / d
  );

  if (moisture == "dry") {
    let a1 = 0.21;
    let a2 = 0.175;
    let a3 = -0.0116;
    let a4 = 1 / 5000;
    let a5 = 235.5;
    let a6 = -1.937;

    if (s <= 10) {
      k8 = 1;
    } else if (s > 10 && s < 25) {
      k8 = a1 + a2 * s + a3 * s ** 2 + a4 * s ** 3;
    } else {
      k8 = a5 * s ** a6;
    }
  } else {
    let a1 = 0.45;
    let a2 = 0.1237;
    let a3 = -0.0082;
    let a4 = 1 / 7500;
    let a5 = 251.4;
    let a6 = -1.933;

    if (s <= 10) {
      k8 = 1;
    } else if (s > 10 && s < 25) {
      k8 = a1 + a2 * s + a3 * s ** 2 + a4 * s ** 3;
    } else {
      k8 = a5 * s ** a6;
    }
  }

  let PhiNcxW = (0.8 * 1 * Area * grade.fc * k8) / 1000;
  let PhiMn = (0.8 * 1 * k8 * grade.fb * Zpole) / 1000000;
  let PhiVn = (0.8 * 1 * grade.fs * Area * 0.75) / 1000;
  let PhiNcxD = PhiNcxW * 0.6;
  let PhiMnD = PhiMn * 0.6;
  let PhiVnD = PhiVn * 0.6;
  let PhiNcxS = PhiNcxW * 0.8;
  let PhiMnS = PhiMn * 0.8;
  let PhiVnS = PhiVn * 0.8;
  let areaOverPole = RSpacingI * RSpanI/2 ;
  let DeadLoad = areaOverPole *  DL;
  let LiveLoad = areaOverPole * 0.25;
  let windLoad = areaOverPole * wind;
  let snowLoad = areaOverPole * snow;
  let MwindLateral =
    (RSpacingI * RHeight * 0.5 * 1.33 * RHeight * 1000 * RackMax) /
    (Number(noOfColInMiddleBay) + 1);

  let MwindDownward = RSpacingI * RSpanI * wind;
  let Dead = RSpacingI * RSpanI *  DL;
  let Live = RSpacingI * RSpanI * 0.25;
  let Sn = RSpacingI * RSpanI * snow;
  let SnMoment =
    (RSpacingI * RHeight * 1000 * 1.33 * 0.5 * Gsnow) /
    (Number(noOfColInMiddleBay) + 1);
  let Ccheck1 =
    (1.2 * DeadLoad) / (PhiNcxD * 1000000) +
    Math.max(windLoad / (PhiNcxW * 1000000), snowLoad / (PhiNcxS * 1000000)) +
    Math.max(MwindLateral / (PhiMn * 1000000), SnMoment / (PhiMnS * 1000000));
  let Ccheck2 =
    (1.2 * DeadLoad) / (PhiNcxD * 1000000) +
    Math.max(windLoad / (PhiNcxW * 1000000), snowLoad / (PhiNcxS * 1000000)) +
    Math.max(MwindLateral / (PhiMn * 1000000), SnMoment / (PhiMnS * 1000000)) **
      2;
  let Ccheck = Math.max(Ccheck1, Ccheck2);

  let Def = Math.max(
    (((RSpacingI * RHeight * 1000 * 1.33 * 0.5 * RackMax * 0.001) /
      (Number(noOfColInMiddleBay) + 1)) *
      (RHeight * 1000) ** 2 *
      (3 * RHeight * 1000 * 1.33 - RHeight * 1000)) /
      (6 * grade.E * Ipole * 2)
  );

  let Deflimit = " ";


  if (IL == "IL1"){

    Deflimit = (RHeight * 1000 * 1.33) / 100;
  } else {

    Deflimit = (RHeight * 1000 * 1.33) / 150;
  }

 
  //footing design

  let FcheckM = Math.max(MwindLateral, SnMoment) / (Mu * 1000000);

  let Shearwind =
    (RSpacingI * RHeight * 1.33 * 0.5 * RackMax) /
    (Number(noOfColInMiddleBay) + 1);
  let Shearsnow =
    (RSpacingI * RHeight * 1.33 * 0.5 * Gsnow) /
    (Number(noOfColInMiddleBay) + 1);
  let FcheckS = Math.max(Shearwind, Shearsnow) / (Hu * 1000);

  let Fcheck = Math.max(FcheckM, FcheckS);
  let display = "";
  if (snow == 0) {
    display = "none";
  } else {
    display = "";
  }

  // uplift check
  let conpiledia = 0.6;

  let pileWeight =
    (0.9 * poleDepth * 3.14 * (conpiledia*0.5 - d * 0.001 * 0.5) ** 2 * 24) / 1000 +
    (0.9 * poleDepth * (d * 0.001 * 0.5) ** 2 * 5) / 1000 +
    (0.4 *
      poleDepth *
      3.14 *
      conpiledia *
      0.33 *
      gamma *
      0.5 *
      Math.tan((Friction * Math.PI) / 180)) /
      1000;

  return [
    {
      member: membername,
      Height: ((RHeight / 0.75) * 1000 - dr).toFixed(0),
      Area: Area.toFixed(0),
      ShearArea: ShearArea,
      Ipole: Ipole.toFixed(0),
      Zpole: Zpole.toFixed(0),
      PhiNcxW: PhiNcxW.toFixed(2),
      PhiMn: PhiMn.toFixed(2),
      PhiVn: PhiVn.toFixed(2),
      PhiNcxD: PhiNcxD.toFixed(2),
      PhiMnD: PhiMnD.toFixed(2),
      PhiVnD: PhiVnD.toFixed(2),
      PhiNcxS: PhiNcxS.toFixed(2),
      PhiMnS: PhiMnS.toFixed(2),
      PhiVnS: PhiVnS.toFixed(2),
      fb: grade.fb,
      fc: grade.fc,
      fs: grade.fs,
      fp: grade.fp,
      E: grade.E,
      ft: grade.ft,
      DeadLoad: (DeadLoad / 1000000).toFixed(2),
      LiveLoad: (LiveLoad / 1000000).toFixed(2),
      windLoad: (windLoad / 1000000).toFixed(2),
      snowLoad: (snowLoad / 1000000).toFixed(2),
      MwindLateral: (MwindLateral / 1000000).toFixed(2),
      SnMoment: (SnMoment / 1000000).toFixed(2),
      Hu: Hu.toFixed(2),
      Mu: Mu.toFixed(2),
      k8: k8.toFixed(2),
      k20: k20,
      Ccheck1: Ccheck1.toFixed(2),
      Ccheck2: Ccheck2.toFixed(2),
      Ccheck: Ccheck.toFixed(2),
      FcheckM: FcheckM.toFixed(2),
      FcheckS: FcheckS.toFixed(2),
      Fcheck: Fcheck.toFixed(2),
      Def: Def.toFixed(2),
      Deflimit: Deflimit.toFixed(2),
      display: display,
      poleDepth: poleDepth,
      RHeight: (RHeight * 1000).toFixed(0),
      Shearwind: (Shearwind / 1000).toFixed(2),
      Shearsnow: (Shearsnow / 1000).toFixed(2),
      council: council,
      pages: pages,
      dated: dated,
      displayb2: displayb2,
      soil: soil,
      poleDepth: poleDepth,
      TotalArea: areaOverPole / 1000000,
      kpcoefficient:kp,
      k0coefficient:k0,
      conpiledia: conpiledia,
      Geotech: Geotech
    },
  ];
};
