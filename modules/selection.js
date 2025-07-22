const { cond } = require("lodash");

exports.options = function (option) {
  if (option == "N0") {
    return ["selected", "", "", "", "", ""];
  } else if (option == "N1") {
    return ["", "selected", "", "", "", ""];
  } else if (option == "N2") {
    return ["", "", "selected", "", "", ""];
  } else if (option == "N3") {
    return ["", "", "", "selected", "", ""];
  } else if (option == "N4") {
    return ["", "", "", "", "selected", ""];
  } else {
    return ["", "", "", "", "", "selected"];
  }
};

exports.shedType = function (type) {
  if (type == "Enclosed") {
    return ["selected", "", ""];
  } else if (type == "Open") {
    return ["", "selected", ""];
  } else {
    return ["", "", "selected"];
  }
};

exports.roofType = function (roofType) {
  if (roofType == "Mono") {
    return ["selected", " "];
  } else {
    return [" ", "selected"];
  }
};
exports.condition = function (condition) {
  if (condition == "DryUseNoSnow") {
    return ["selected", "", "", ""];
  } else if (condition == "DryUseSnow") {
    return ["", "selected", "", ""];
  } else if (condition == "WetUseNoSnow") {
    return ["", "", "selected", ""];
  } else {
    return ["", "", "", "selected"];
  }
};

exports.PSize = function (PSize) {
  if (PSize == "SG815050Dry") {
    return ["selected"];
  } else if (PSize == "SG820050Dry") {
    return ["", "selected"];
  } else if (PSize == "SG825050Dry") {
    return Array(2).fill("").concat(["selected"]);
  } else if (PSize == "SG830050Dry") {
    return Array(3).fill("").concat(["selected"]);
  } else if (PSize == "SG610050wet") {
    return Array(4).fill("").concat(["selected"]);
  } else if (PSize == "SG615050wet") {
    return Array(5).fill("").concat(["selected"]);
  } else if (PSize == "SG620050wet") {
    return Array(6).fill("").concat(["selected"]);
  } else if (PSize == "SG610050Dry") {
    return Array(7).fill("").concat(["selected"]);
  } else if (PSize == "SG615050Dry") {
    return Array(8).fill("").concat(["selected"]);
  } else if (PSize == "SG620050Dry") {
    return Array(9).fill("").concat(["selected"]);
  } else if (PSize == "9045LVL8") {
    return Array(10).fill("").concat(["selected"]);
  } else if (PSize == "14045LVL8") {
    return Array(11).fill("").concat(["selected"]);
  } else if (PSize == "19045LVL8") {
    return Array(12).fill("").concat(["selected"]);
  } else if (PSize == "24045LVL8") {
    return Array(13).fill("").concat(["selected"]);
  } else if (PSize == "29045LVL8") {
    return Array(14).fill("").concat(["selected"]);
  } else if (PSize == "SG814045Dry") {
    return Array(15).fill("").concat(["selected"]);
  } else if (PSize == "SG819045Dry") {
    return Array(16).fill("").concat(["selected"]);
  } else if (PSize == "SG824045Dry") {
    return Array(17).fill("").concat(["selected"]);
  } else if (PSize == "SG614045Dry") {
    return Array(18).fill("").concat(["selected"]);
  } else if (PSize == "SG619045Dry") {
    return Array(19).fill("").concat(["selected"]);
  } else if (PSize == "SG624045Dry") {
    return Array(20).fill("").concat(["selected"]);
  } else if (PSize == "SG614045wet") {
    return Array(21).fill("").concat(["selected"]);
  } else if (PSize == "SG619045wet") {
    return Array(22).fill("").concat(["selected"]);
  } else if (PSize == "SG624045wet") {
    return Array(23).fill("").concat(["selected"]);
  } else if (PSize == "SG629045wet") {
    return Array(24).fill("").concat(["selected"]);
  } else if (PSize == "SG824045wet") {
    return Array(25).fill("").concat(["selected"]);
  } else if (PSize == "SG829045wet") {
    return Array(26).fill("").concat(["selected"]);
  } else if (PSize == "24045LVL13") {
    return Array(27).fill("").concat(["selected"]);
  } else if (PSize == "30045LVL13") {
    return Array(28).fill("").concat(["selected"]);
  } else if (PSize == "36045LVL13") {
    return Array(29).fill("").concat(["selected"]);
  } else if (PSize == "40045LVL13") {
    return Array(30).fill("").concat(["selected"]);
  } else if (PSize == "45045LVL13") {
    return Array(31).fill("").concat(["selected"]);
  } else if (PSize == "SG815050wet") {
    return Array(32).fill("").concat(["selected"]);
  } else if (PSize == "SG820050wet") {
    return Array(33).fill("").concat(["selected"]);
  } else if (PSize == "SG825050wet") {
    return Array(34).fill("").concat(["selected"]);
  } else if (PSize == "SG830050wet") {
    return Array(35).fill("").concat(["selected"]);
  } else if (PSize == "SG829045Dry") {
    return Array(36).fill("").concat(["selected"]);
  }
};
exports.RSize = function (RSize) {
  if (RSize == "SG815050Dry") {
    return ["selected"];
  } else if (RSize == "SG820050Dry") {
    return Array(1).fill("").concat(["selected"]);
  } else if (RSize == "SG825050Dry") {
    return Array(2).fill("").concat(["selected"]);
  } else if (RSize == "SG830050Dry") {
    return Array(3).fill("").concat(["selected"]);
  } else if (RSize == "20045LVL13") {
    return Array(4).fill("").concat(["selected"]);
  } else if (RSize == "24045LVL13") {
    return Array(5).fill("").concat(["selected"]);
  } else if (RSize == "30045LVL13") {
    return Array(6).fill("").concat(["selected"]);
  } else if (RSize == "36045LVL13") {
    return Array(7).fill("").concat(["selected"]);
  } else if (RSize == "40045LVL13") {
    return Array(8).fill("").concat(["selected"]);
  } else if (RSize == "45045LVL13") {
    return Array(9).fill("").concat(["selected"]);
  } else if (RSize == "20063LVL13") {
    return Array(10).fill("").concat(["selected"]);
  } else if (RSize == "24063LVL13") {
    return Array(11).fill("").concat(["selected"]);
  } else if (RSize == "30063LVL13") {
    return Array(12).fill("").concat(["selected"]);
  } else if (RSize == "36063LVL13") {
    return Array(13).fill("").concat(["selected"]);
  } else if (RSize == "30090LVL11") {
    return Array(14).fill("").concat(["selected"]);
  } else if (RSize == "SG829045Dry") {
    return Array(15).fill("").concat(["selected"]);
  } else if (RSize == "40063LVL13") {
    return Array(16).fill("").concat(["selected"]);
  } else if (RSize == "40090LVL11") {
    return Array(17).fill("").concat(["selected"]);
  } else if (RSize == "61090LVL11") {
    return Array(18).fill("").concat(["selected"]);
  } else if (RSize == "24045LVL11") {
    return Array(19).fill("").concat(["selected"]);
  } else if (RSize == "24045LVL8") {
    return Array(20).fill("").concat(["selected"]);
  } else if (RSize == "29045LVL8") {
    return Array(21).fill("").concat(["selected"]);
  } else if (RSize == "61031.5LVL13") {
    return Array(22).fill("").concat(["selected"]);
  } else if (RSize == "30045LVL11") {
    return Array(23).fill("").concat(["selected"]);
  } else if (RSize == "36045LVL11") {
    return Array(24).fill("").concat(["selected"]);
  } else if (RSize == "40045LVL11") {
    return Array(25).fill("").concat(["selected"]);
  } else if (RSize == "30063LVL11") {
    return Array(26).fill("").concat(["selected"]);
  } else if (RSize == "36063LVL11") {
    return Array(27).fill("").concat(["selected"]);
  } else if (RSize == "40063LVL11") {
    return Array(28).fill("").concat(["selected"]);
  } else if (RSize == "SG624045wet") {
    return Array(29).fill("").concat(["selected"]);
  } else if (RSize == "SG629045wet") {
    return Array(30).fill("").concat(["selected"]);
  } else if (RSize == "SG824045wet") {
    return Array(31).fill("").concat(["selected"]);
  } else if (RSize == "SG829045wet") {
    return Array(32).fill("").concat(["selected"]);
  } else if (RSize == "40022.5LVL13") {
    return Array(33).fill("").concat(["selected"]);
  } else if (RSize == "45063LVL13") {
    return Array(34).fill("").concat(["selected"]);
  } else if (RSize == "61045LVL11") {
    return Array(35).fill("").concat(["selected"]);
  } else if (RSize == "SG815050wet") {
    return Array(36).fill("").concat(["selected"]);
  } else if (RSize == "SG820050wet") {
    return Array(37).fill("").concat(["selected"]);
  } else if (RSize == "SG825050wet") {
    return Array(38).fill("").concat(["selected"]);
  } else if (RSize == "SG830050wet") {
    return Array(39).fill("").concat(["selected"]);
  } else if (RSize == "SG814045Dry") {
    return Array(40).fill("").concat(["selected"]);
  } else if (RSize == "SG819045Dry") {
    return Array(41).fill("").concat(["selected"]);
  } else if (RSize == "SG824045Dry") {
    return Array(42).fill("").concat(["selected"]);
  }

 };
 
exports.RESize = function (RESize) {
  if (RESize == "SG815050Dry") {
    return ["selected"];
  } else if (RESize == "SG820050Dry") {
    return Array(1).fill("").concat(["selected"]);
  } else if (RESize == "SG825050Dry") {
    return Array(2).fill("").concat(["selected"]);
  } else if (RESize == "SG830050Dry") {
    return Array(3).fill("").concat(["selected"]);
  } else if (RESize == "20045LVL13") {
    return Array(4).fill("").concat(["selected"]);
  } else if (RESize == "24045LVL13") {
    return Array(5).fill("").concat(["selected"]);
  } else if (RESize == "30045LVL13") {
    return Array(6).fill("").concat(["selected"]);
  } else if (RESize == "36045LVL13") {
    return Array(7).fill("").concat(["selected"]);
  } else if (RESize == "40045LVL13") {
    return Array(8).fill("").concat(["selected"]);
  } else if (RESize == "45045LVL13") {
    return Array(9).fill("").concat(["selected"]);
  } else if (RESize == "20063LVL13") {
    return Array(10).fill("").concat(["selected"]);
  } else if (RESize == "24063LVL13") {
    return Array(11).fill("").concat(["selected"]);
  } else if (RESize == "30063LVL13") {
    return Array(12).fill("").concat(["selected"]);
  } else if (RESize == "36063LVL13") {
    return Array(13).fill("").concat(["selected"]);
  } else if (RESize == "24045LVL8") {
    return Array(14).fill("").concat(["selected"]);
  } else if (RESize == "SG829045Dry") {
    return Array(15).fill("").concat(["selected"]);
  } else if (RESize == "40063LVL13") {
    return Array(16).fill("").concat(["selected"]);
  } else if (RESize == "30090LVL11") {
    return Array(17).fill("").concat(["selected"]);
  } else if (RESize == "40090LVL11") {
    return Array(18).fill("").concat(["selected"]);
  } else if (RESize == "61090LVL11") {
    return Array(19).fill("").concat(["selected"]);
  } else if (RESize == "24045LVL11") {
    return Array(20).fill("").concat(["selected"]);
  } else if (RESize == "24045LVL8") {
    return Array(21).fill("").concat(["selected"]);
  } else if (RESize == "29045LVL8") {
    return Array(22).fill("").concat(["selected"]);
  } else if (RESize == "30045LVL11") {
    return Array(23).fill("").concat(["selected"]);
  } else if (RESize == "36045LVL11") {
    return Array(24).fill("").concat(["selected"]);
  } else if (RESize == "40045LVL11") {
    return Array(25).fill("").concat(["selected"]);
  } else if (RESize == "30063LVL11") {
    return Array(26).fill("").concat(["selected"]);
  } else if (RESize == "36063LVL11") {
    return Array(27).fill("").concat(["selected"]);
  } else if (RESize == "40063LVL11") {
    return Array(28).fill("").concat(["selected"]);
  } else if (RESize == "SG624045wet") {
    return Array(29).fill("").concat(["selected"]);
  } else if (RESize == "SG629045wet") {
    return Array(30).fill("").concat(["selected"]);
  } else if (RESize == "SG824045wet") {
    return Array(31).fill("").concat(["selected"]);
  } else if (RESize == "SG829045wet") {
    return Array(32).fill("").concat(["selected"]);
  } else if (RESize == "40022.5LVL13") {
    return Array(33).fill("").concat(["selected"]);
  } else if (RESize == "45063LVL13") {
    return Array(34).fill("").concat(["selected"]);
  } else if (RESize == "SG815050wet") {
    return Array(35).fill("").concat(["selected"]);
  } else if (RESize == "SG820050wet") {
    return Array(36).fill("").concat(["selected"]);
  } else if (RESize == "SG825050wet") {
    return Array(37).fill("").concat(["selected"]);
  } else if (RESize == "SG830050wet") {
    return Array(38).fill("").concat(["selected"]);
  } else if (RESize == "SG814045Dry") {
    return Array(39).fill("").concat(["selected"]);
  } else if (RESize == "SG819045Dry") {
    return Array(40).fill("").concat(["selected"]);
  } else if (RESize == "SG824045Dry") {
    return Array(41).fill("").concat(["selected"]);
  }
};

exports.IFb = function (IFb) {
  if (IFb == "SG810050Dry") {
    return ["selected"];
  } else if (IFb == "SG815050Dry") {
    return ["", "selected"];
  } else if (IFb == "SG820050Dry") {
    return ["", "", "selected"];
  } else if (IFb == "SG825050Dry") {
    return ["", "", "", "selected"];
  } else if (IFb == "SG830050Dry") {
    return ["", "", "", "", "selected"];
  } else if (IFb == "SG610050wet") {
    return ["", "", "", "", "", "selected"];
  } else if (IFb == "SG615050wet") {
    return ["", "", "", "", "", "", "selected"];
  } else if (IFb == "SG620050wet") {
    return ["", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG625050wet") {
    return ["", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG815050wet") {
    return ["", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG820050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG825050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG830050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG814045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG819045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG824045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (IFb == "SG829045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  }
};
exports.Fb = function (Fb) {
  if (Fb == "Front") {
    return ["selected"];
  } else if (Fb == "Back") {
    return ["", "selected"];
  }
};

exports.ISi = function (ISi) {
  if (ISi == "SG810050Dry") {
    return ["selected"];
  } else if (ISi == "SG815050Dry") {
    return ["", "selected"];
  } else if (ISi == "SG820050Dry") {
    return ["", "", "selected"];
  } else if (ISi == "SG825050Dry") {
    return ["", "", "", "selected"];
  } else if (ISi == "SG830050Dry") {
    return ["", "", "", "", "selected"];
  } else if (ISi == "SG610050wet") {
    return ["", "", "", "", "", "selected"];
  } else if (ISi == "SG615050wet") {
    return ["", "", "", "", "", "", "selected"];
  } else if (ISi == "SG620050wet") {
    return ["", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG625050wet") {
    return ["", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG814045Dry") {
    return ["", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG819045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG824045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG619045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG614045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG614045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG815050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG820050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG825050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG830050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (ISi == "SG829045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  }
};

exports.GFb = function (GFb) {
  if (GFb == "SG810050Dry") {
    return ["selected"];
  } else if (GFb == "SG815050Dry") {
    return ["", "selected"];
  } else if (GFb == "SG820050Dry") {
    return ["", "", "selected"];
  } else if (GFb == "SG825050Dry") {
    return ["", "", "", "selected"];
  } else if (GFb == "SG830050Dry") {
    return ["", "", "", "", "selected"];
  } else if (GFb == "SG610050wet") {
    return ["", "", "", "", "", "selected"];
  } else if (GFb == "SG615050wet") {
    return ["", "", "", "", "", "", "selected"];
  } else if (GFb == "SG620050wet") {
    return ["", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG625050wet") {
    return ["", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG814045Dry") {
    return ["", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG819045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG614045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG614045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG619045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG624045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG629045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG819045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG824045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG829045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "20045LVL13") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "24045LVL13") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "30045LVL13") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "selected"];
  } else if (GFb == "20045LVL8") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "selected"];
  } else if (GFb == "24045LVL8") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "",  "", "selected"];
  } else if (GFb == "29045LVL8") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",   "", "selected"];
  } else if (GFb == "SG815050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",  "",  "", "selected"];
  } else if (GFb == "SG820050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",  "",  "",  "", "selected"];
  } else if (GFb == "SG825050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",  "", "", "",  "", "selected"];
  } else if (GFb == "SG830050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",  "", "", "", "",  "", "selected"];
  } else if (GFb == "SG824045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",  "", "", "", "", "",  "", "selected"];
  } else if (GFb == "SG829045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",  "", "", "", "", "", "",  "", "selected"];
  } 

 
};

exports.GSi = function (GFb) {
  if (GFb == "SG810050Dry") {
    return ["selected"];
  } else if (GFb == "SG815050Dry") {
    return ["", "selected"];
  } else if (GFb == "SG820050Dry") {
    return ["", "", "selected"];
  } else if (GFb == "SG825050Dry") {
    return ["", "", "", "selected"];
  } else if (GFb == "SG830050Dry") {
    return ["", "", "", "", "selected"];
  } else if (GFb == "SG610050wet") {
    return ["", "", "", "", "", "selected"];
  } else if (GFb == "SG615050wet") {
    return ["", "", "", "", "", "", "selected"];
  } else if (GFb == "SG620050wet") {
    return ["", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG625050wet") {
    return ["", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG814045Dry") {
    return ["", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG819045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG614045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG614045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG619045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG624045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG629045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG819045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG824045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG829045wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "20045LVL13") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "24045LVL13") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "30045LVL13") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "selected"];
  } else if (GFb == "20045LVL8") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "selected"];
  } else if (GFb == "24045LVL8") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "",  "", "selected"];
  } else if (GFb == "29045LVL8") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "",   "", "selected"];
  } else if (GFb == "SG815050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "", "",  "", "selected"];
  } else if (GFb == "SG820050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "", "",  "", "", "selected"];
  } else if (GFb == "SG825050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG830050wet") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "", "", "", "", "", "", "selected"];
  } else if (GFb == "SG824045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "", "", "", "", "", "","", "selected"];
  } else if (GFb == "SG829045Dry") {
    return ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",  "", "", "", "", "", "", "", "","", "selected"];
  } 
};

exports.Eq = function (GFb) {
  if (GFb == "1") {
    return ["selected"];
  } else if (GFb == "2") {
    return ["", "selected"];
  } else if (GFb == "3") {
    return ["", "", "selected"];
  } else if (GFb == "4") {
    return ["", "", "", "selected"];
  }
};

exports.Db = function (GFb) {
  if (GFb == "B") {
    return ["selected"];
  } else if (GFb == "C") {
    return ["", "selected"];
  } else if (GFb == "D") {
    return ["", "", "selected"];
  }
};

exports.MPi = function (GFb) {
  if (GFb == "150SED") {
    return ["selected"];
  } else if (GFb == "175SED") {
    return Array(1).fill("").concat(["selected"]);
  } else if (GFb == "200SED") {
    return Array(2).fill("").concat(["selected"]);
  } else if (GFb == "225SED") {
    return Array(3).fill("").concat(["selected"]);
  } else if (GFb == "250SED") {
    return Array(4).fill("").concat(["selected"]);
  } else if (GFb == "275SED") {
    return Array(5).fill("").concat(["selected"]);
  } else if (GFb == "300SED") {
    return Array(6).fill("").concat(["selected"]);
  } else if (GFb == "275UNI") {
    return Array(7).fill("").concat(["selected"]);
  } else if (GFb == "300UNI") {
    return Array(8).fill("").concat(["selected"]);
  } else if (GFb == "100SED") {
    return Array(9).fill("").concat(["selected"]);
  } else if (GFb == "125SED") {
    return Array(10).fill("").concat(["selected"]);
  } else if (GFb == "150UNI") {
    return Array(11).fill("").concat(["selected"]);
  } else if (GFb == "175UNI") {
    return Array(12).fill("").concat(["selected"]);
  } else if (GFb == "200UNI") {
    return Array(13).fill("").concat(["selected"]);
  } else if (GFb == "225UNI") {
    return Array(14).fill("").concat(["selected"]);
  } else if (GFb == "250UNI") {
    return Array(15).fill("").concat(["selected"]);
  } else if (GFb == "350SED") {
    return Array(16).fill("").concat(["selected"]);
  } else if (GFb == "150SEDHD") {
    return Array(17).fill("").concat(["selected"]);
  } else if (GFb == "175SEDHD") {
    return Array(18).fill("").concat(["selected"]);
  } else if (GFb == "200SEDHD") {
    return Array(19).fill("").concat(["selected"]);
  } else if (GFb == "225SEDHD") {
    return Array(20).fill("").concat(["selected"]);
  } else if (GFb == "250SEDHD") {
    return Array(21).fill("").concat(["selected"]);
  } else if (GFb == "275SEDHD") {
    return Array(22).fill("").concat(["selected"]);
  } else if (GFb == "300SEDHD") {
    return Array(23).fill("").concat(["selected"]);
  } else if (GFb == "350SEDHD") {
    return Array(24).fill("").concat(["selected"]);
  } else if (GFb == "350SEDHD") {
    return Array(24).fill("").concat(["selected"]);
  } else if (GFb == "100x100SG8") {
    return Array(25).fill("").concat(["selected"]);
  } else if (GFb == "125x125SG8") {
    return Array(26).fill("").concat(["selected"]);
  } else if (GFb == "150x150SG8") {
    return Array(27).fill("").concat(["selected"]);
  } else if (GFb == "175x175SG8") {
    return Array(28).fill("").concat(["selected"]);
  } else if (GFb == "200x200SG8") {
    return Array(29).fill("").concat(["selected"]);
  } else if (GFb == "225x225SG8") {
    return Array(30).fill("").concat(["selected"]);
  } else if (GFb == "250x250SG8") {
    return Array(31).fill("").concat(["selected"]);
  }
} ;

exports.EPi = function (GFb) {
  if (GFb == "150SED") {
    return ["selected"];
  } else if (GFb == "175SED") {
    return Array(1).fill("").concat(["selected"]);
  } else if (GFb == "200SED") {
    return Array(2).fill("").concat(["selected"]);
  } else if (GFb == "225SED") {
    return Array(3).fill("").concat(["selected"]);
  } else if (GFb == "250SED") {
    return Array(4).fill("").concat(["selected"]);
  } else if (GFb == "275SED") {
    return Array(5).fill("").concat(["selected"]);
  } else if (GFb == "300SED") {
    return Array(6).fill("").concat(["selected"]);
  } else if (GFb == "275UNI") {
    return Array(7).fill("").concat(["selected"]);
  } else if (GFb == "300UNI") {
    return Array(8).fill("").concat(["selected"]);
  } else if (GFb == "100SED") {
    return Array(9).fill("").concat(["selected"]);
  } else if (GFb == "125SED") {
    return Array(10).fill("").concat(["selected"]);
  } else if (GFb == "150UNI") {
    return Array(11).fill("").concat(["selected"]);
  } else if (GFb == "175UNI") {
    return Array(12).fill("").concat(["selected"]);
  } else if (GFb == "200UNI") {
    return Array(13).fill("").concat(["selected"]);
  } else if (GFb == "225UNI") {
    return Array(14).fill("").concat(["selected"]);
  } else if (GFb == "250UNI") {
    return Array(15).fill("").concat(["selected"]);
  } else if (GFb == "350SED") {
    return Array(16).fill("").concat(["selected"]);
  } else if (GFb == "150SEDHD") {
    return Array(17).fill("").concat(["selected"]);
  } else if (GFb == "175SEDHD") {
    return Array(18).fill("").concat(["selected"]);
  } else if (GFb == "200SEDHD") {
    return Array(19).fill("").concat(["selected"]);
  } else if (GFb == "225SEDHD") {
    return Array(20).fill("").concat(["selected"]);
  } else if (GFb == "250SEDHD") {
    return Array(21).fill("").concat(["selected"]);
  } else if (GFb == "275SEDHD") {
    return Array(22).fill("").concat(["selected"]);
  } else if (GFb == "300SEDHD") {
    return Array(23).fill("").concat(["selected"]);
  } else if (GFb == "350SEDHD") {
    return Array(24).fill("").concat(["selected"]);
  } else if (GFb == "100x100SG8") {
    return Array(25).fill("").concat(["selected"]);
  } else if (GFb == "125x125SG8") {
    return Array(26).fill("").concat(["selected"]);
  } else if (GFb == "150x150SG8") {
    return Array(27).fill("").concat(["selected"]);
  } else if (GFb == "175x175SG8") {
    return Array(28).fill("").concat(["selected"]);
  } else if (GFb == "200x200SG8") {
    return Array(29).fill("").concat(["selected"]);
  } else if (GFb == "225x225SG8") {
    return Array(30).fill("").concat(["selected"]);
  } else if (GFb == "250x250SG8") {
    return Array(31).fill("").concat(["selected"]);
  }
};

exports.b2 = function (a) {
  if (a == "Yes") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.calcs = function (a) {
  if (a == "Auto") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.cer = function (a) {
  if (a == "Yes") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.IInfo = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.PDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.RDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.InDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.InSideDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.ReDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.PeDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.PiDisplay = function (a) {
  if (a == "UnHide") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};

exports.PrSize = function (RSize) {
  if (RSize == "SG815050Dry") {
    return ["selected"];
  } else if (RSize == "SG820050Dry") {
    return Array(1).fill("").concat(["selected"]);
  } else if (RSize == "SG825050Dry") {
    return Array(2).fill("").concat(["selected"]);
  } else if (RSize == "SG830050Dry") {
    return Array(3).fill("").concat(["selected"]);
  } else if (RSize == "20045LVL13") {
    return Array(4).fill("").concat(["selected"]);
  } else if (RSize == "24045LVL13") {
    return Array(5).fill("").concat(["selected"]);
  } else if (RSize == "30045LVL13") {
    return Array(6).fill("").concat(["selected"]);
  } else if (RSize == "36045LVL13") {
    return Array(7).fill("").concat(["selected"]);
  } else if (RSize == "40045LVL13") {
    return Array(8).fill("").concat(["selected"]);
  } else if (RSize == "45045LVL13") {
    return Array(9).fill("").concat(["selected"]);
  } else if (RSize == "20063LVL13") {
    return Array(10).fill("").concat(["selected"]);
  } else if (RSize == "24063LVL13") {
    return Array(11).fill("").concat(["selected"]);
  } else if (RSize == "30063LVL13") {
    return Array(12).fill("").concat(["selected"]);
  } else if (RSize == "36063LVL13") {
    return Array(13).fill("").concat(["selected"]);
  } else if (RSize == "30090LVL11") {
    return Array(14).fill("").concat(["selected"]);
  } else if (RSize == "SG829045Dry") {
    return Array(15).fill("").concat(["selected"]);
  } else if (RSize == "40063LVL13") {
    return Array(16).fill("").concat(["selected"]);
  } else if (RSize == "40090LVL11") {
    return Array(17).fill("").concat(["selected"]);
  } else if (RSize == "61090LVL11") {
    return Array(18).fill("").concat(["selected"]);
  } else if (RSize == "24045LVL11") {
    return Array(19).fill("").concat(["selected"]);
  } else if (RSize == "24045LVL8") {
    return Array(20).fill("").concat(["selected"]);
  } else if (RSize == "29045LVL8") {
    return Array(21).fill("").concat(["selected"]);
  } else if (RSize == "30045LVL11") {
    return Array(22).fill("").concat(["selected"]);
  } else if (RSize == "15050SG8") {
    return Array(23).fill("").concat(["selected"]);
  } else if (RSize == "20050SG8") {
    return Array(24).fill("").concat(["selected"]);
  } else if (RSize == "25050SG8") {
    return Array(25).fill("").concat(["selected"]);
  } else if (RSize == "30050SG8") {
    return Array(26).fill("").concat(["selected"]);
  } 
};

exports.PropQ = function (RSize) {
  if (RSize == "0") {
    return ["selected", "", ""];
  } else if (RSize == "1") {
    return ["", "selected", ""];
  } else {
    return ["", "", "selected"];
  }
};

exports.BI = function (RSize) {
  if (RSize == 12) {
    return ["selected", "", ""];
  } else if (RSize == 16) {
    return ["", "selected", ""];
  } else {
    return ["", "", "selected"];
  }
};

exports.BE = function (RSize) {
  if (RSize == 12) {
    return ["selected", "", ""];
  } else if (RSize == 16) {
    return ["", "selected", ""];
  } else {
    return ["", "", "selected"];
  }
};

exports.BProp = function (RSize) {
  if (RSize == 12) {
    return ["selected", "", ""];
  } else if (RSize == 16) {
    return ["", "selected", ""];
  } else {
    return ["", "", "selected"];
  }
};

exports.IFBAuto = function (RSize) {
  if (RSize == "IFBAuto") {
    return ["selected"];
  } else if (RSize == "IFBManual") {
    return ["", "selected"];
  }
};

exports.ISIAuto = function (RSize) {
  if (RSize == "ISIAuto") {
    return ["selected"];
  } else if (RSize == "ISIManual") {
    return ["", "selected"];
  }
};

exports.IL = function (a) {
  if (a == "IL1") {
    return ["selected"];
  } else {
    return ["", "selected"];
  }
};
