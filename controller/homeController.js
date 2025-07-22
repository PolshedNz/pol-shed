const fs = require("fs");
const pdf = require("pdf-creator-node");
const path = require("path");
const options = require("../helpers/options");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const foundJob = require("../app");
const Job = require("../model/Job");

const job = [];

const generatePdf = async (req, res, next) => {
  const jobId = req.params.jobId;

  const foundJob = await Job.findById(jobId);

  if (!foundJob) {
    return res.status(404).send("Job not found");
  }

  const html = fs.readFileSync(
    path.join(__dirname, "../views/template.html"),
    "utf-8"
  );
  const filename = Math.random() + "_doc" + ".pdf";
  const bitmap = fs.readFileSync(__dirname + "/RnH.png");
  const logo = bitmap.toString("base64");
  job.push(foundJob);

  console.log("foundJob", foundJob);

  let dt = [
    {
      logo: logo,
      engineer: foundJob.engineer,
      engineerDescription: foundJob.engineerDescription,
      registrationNumber: foundJob.registrationNumber,
      phoneNumber: foundJob.phoneNumber,
      engineerEmail: foundJob.engineerEmail,
      engineerCompany: foundJob.engineerCompany,
      companyaddress: foundJob.companyaddress,
      clientCompany: foundJob.clientCompany,
      jobNumber: foundJob.jobNumber,
      address: foundJob.address,
      date: foundJob.date,
      latitude: foundJob.latitude,
      longitude: foundJob.longitude,
      elevation: foundJob.SElev,
      length: foundJob.length,
      width: foundJob.width,
      noOfBays: foundJob.noOfBays,
      noOfColInMiddleBay: foundJob.noOfColInMiddleBay,
      NoOfColInEndBay: foundJob.NoOfColInEndBay,
      MaxHeight: foundJob.MaxHeight,
      RoofPitch: foundJob.RoofPitch,
      windSpeed: foundJob.windSpeed,
      snowZone: foundJob.snowZone,
      RSnowLoad: foundJob.RSnowLoad,
      GSnowLoad: foundJob.GSnowLoad,
      ari: foundJob.ari,
      wRegion: foundJob.wRegion,
      tc: foundJob.tc,
      leeZone: foundJob.leeZone,
      windPressure1: foundJob.windPressure1,
      windCategory: foundJob.windCategory,
      rackingM: foundJob.rackingM,
      rackingE: foundJob.rackingE,
      bayWidth: foundJob.bayWidth,
      RackForceHeight: foundJob.RackForceHeight,
      upliftMiddleMiddle: foundJob.upliftMiddleMiddle,
      upliftMiddleEnd: foundJob.upliftMiddleEnd,
      MomentLong: foundJob.MomentLong,
      MomentLongRI: foundJob.PAnalysis[0].PMLongRI,
      MomentLongRE: foundJob.PAnalysis[0].PMLongRE,
      MomentMedium: foundJob.MomentMedium,
      MomentMediumRI: foundJob.PAnalysis[0].PMMediumRI,
      MomentMediumRE: foundJob.PAnalysis[0].PMMediumRE,
      MomentShort: foundJob.MomentShort,
      MomentShortRI: foundJob.PAnalysis[0].PMshortuRI,
      MomentShortRE: foundJob.PAnalysis[0].PMshortuRE,
      MomentShortINFB: foundJob.IntermediateFrontBack[0].PMshortu,
      MomentShortINSides: foundJob.IntermediateSIDES[0].PMshortu,
      Momentupshort: foundJob.Momentupshort,
      MomentupshortRI: foundJob.RafterCapacity[0].Momentupshort,
      MomentupshortRE: foundJob.RafterCapacityE[0].Momentupshort,
      MomentDownmedium: foundJob.MomentDownmedium,
      MomentDownmediumRI: foundJob.RafterCapacity[0].MomentDownmedium,
      MomentDownmediumRE: foundJob.RafterCapacityE[0].MomentDownmedium,
      MomentDownlong: foundJob.MomentDownlong,
      MomentDownlongRI: foundJob.RafterCapacity[0].MomentDownlong,
      MomentDownlongRE: foundJob.RafterCapacityE[0].MomentDownlong,
      Blocking: foundJob.Blocking - 1,
      Per1: ((foundJob.MomentDownlong * 100) / foundJob.MomentLong).toFixed(2),
      Per1RI: (
        (foundJob.RafterCapacity[0].MomentDownlong * 100) /
        foundJob.PAnalysis[0].PMLongRI
      ).toFixed(2),
      Per1RE: (
        (foundJob.RafterCapacityE[0].MomentDownlong * 100) /
        foundJob.PAnalysis[0].PMLongRE
      ).toFixed(2),
      Per2: (
        (foundJob.PProperties[0].MomentDownmedium * 100) /
        foundJob.MomentMedium
      ).toFixed(2),
      Per2RI: (
        (foundJob.RafterCapacity[0].MomentDownmedium * 100) /
        foundJob.PAnalysis[0].PMMediumRI
      ).toFixed(2),
      Per2RE: (
        (foundJob.RafterCapacityE[0].MomentDownmedium * 100) /
        foundJob.PAnalysis[0].PMMediumRE
      ).toFixed(2),
      Per3: Math.abs(
        (foundJob.Momentupshort * 100) / foundJob.MomentShort
      ).toFixed(2),
      Per3RI: Math.abs(
        (foundJob.RafterCapacity[0].Momentupshort * 100) /
          foundJob.PAnalysis[0].PMshortuRI
      ).toFixed(2),
      Per3RE: Math.abs(
        (foundJob.RafterCapacityE[0].Momentupshort * 100) /
          foundJob.PAnalysis[0].PMshortuRE
      ).toFixed(2),
      Per3FB: Math.abs(
        (foundJob.IntermediateFrontBack[0].Mnushort * 100) /
          foundJob.IntermediateFrontBack[0].MApplied
      ).toFixed(2),
      Per3Sides: Math.abs(
        (foundJob.IntermediateSIDES[0].Mnushort * 100) /
          foundJob.IntermediateSIDES[0].MApplied
      ).toFixed(2),
      Per3GFB: Math.abs(
        (foundJob.GirtsFrontBack[0].Mnushort * 100) /
          foundJob.GirtsFrontBack[0].MApplied
      ).toFixed(2),
      Per3GSides: Math.abs(
        (foundJob.GirtsSides[0].Mnushort * 100) /
          foundJob.GirtsSides[0].MApplied
      ).toFixed(2),
      K1short: foundJob.PProperties[0].k1Short,
      K1shortRI: foundJob.RafterCapacity[0].k1Short,
      K1shortRE: foundJob.RafterCapacityE[0].k1Short,
      K1shortFB: foundJob.IntermediateFrontBack[0].k1Short,
      K1shortGFB: foundJob.GirtsFrontBack[0].k1Short,
      K1shortGSide: foundJob.GirtsSides[0].k1Short,
      K1shortSides: foundJob.IntermediateSIDES[0].k1Short,
      K1medium: foundJob.PProperties[0].k1medium,
      K1mediumRI: foundJob.RafterCapacity[0].k1medium,
      K1mediumRE: foundJob.RafterCapacityE[0].k1medium,
      K1long: foundJob.PProperties[0].k1long,
      K1longRI: foundJob.RafterCapacity[0].k1long,
      K1longRE: foundJob.RafterCapacityE[0].k1long,
      k4: foundJob.PProperties[0].k4,
      k4RI: foundJob.RafterCapacity[0].k4,
      k4RE: foundJob.RafterCapacityE[0].k4,
      k4FB: foundJob.IntermediateFrontBack[0].k4,
      k4GFB: foundJob.GirtsFrontBack[0].k4,
      k4GSide: foundJob.GirtsSides[0].k4,
      k4Sides: foundJob.IntermediateSIDES[0].k4,
      k5: foundJob.PProperties[0].k5,
      k5RI: foundJob.RafterCapacity[0].k5,
      k5RE: foundJob.RafterCapacityE[0].k5,
      k5FB: foundJob.IntermediateFrontBack[0].k5,
      k5GFB: foundJob.GirtsFrontBack[0].k5,
      k5GSide: foundJob.GirtsSides[0].k5,
      k5Sides: foundJob.IntermediateSIDES[0].k5,
      k8down: foundJob.PProperties[0].k8down.toFixed(2),
      k8downRI: foundJob.RafterCapacity[0].k8down.toFixed(2),
      k8downRE: foundJob.RafterCapacityE[0].k8down.toFixed(2),
      k8downFB: foundJob.IntermediateFrontBack[0].k8down.toFixed(2),
      k8downGFB: foundJob.GirtsFrontBack[0].k8down.toFixed(2),
      k8downGSide: foundJob.GirtsSides[0].k8down.toFixed(2),
      k8downSides: foundJob.IntermediateSIDES[0].k8down.toFixed(2),
      k8top: foundJob.PProperties[0].k8top.toFixed(2),
      k8topRI: foundJob.RafterCapacity[0].k8top.toFixed(2),
      k8topRE: foundJob.RafterCapacityE[0].k8top.toFixed(2),
      k8topFB: foundJob.IntermediateFrontBack[0].k8top.toFixed(2),
      k8topGFB: foundJob.GirtsFrontBack[0].k8top.toFixed(2),
      k8topGSide: foundJob.GirtsSides[0].k8top.toFixed(2),
      k8topSides: foundJob.IntermediateSIDES[0].k8top.toFixed(2),
      s1up: foundJob.PProperties[0].s1up.toFixed(2),
      s1upRI: foundJob.RafterCapacity[0].s1up.toFixed(2),
      s1upRE: foundJob.RafterCapacityE[0].s1up.toFixed(2),
      s1upFB: foundJob.IntermediateFrontBack[0].s1up.toFixed(2),
      s1upGFB: foundJob.GirtsFrontBack[0].s1up.toFixed(2),
      s1upGSide: foundJob.GirtsSides[0].s1up.toFixed(2),
      s1upSides: foundJob.IntermediateSIDES[0].s1up.toFixed(2),
      s1down: foundJob.PProperties[0].s1down.toFixed(2),
      s1downRI: foundJob.RafterCapacity[0].s1down.toFixed(2),
      s1downRE: foundJob.RafterCapacityE[0].s1down.toFixed(2),
      s1downFB: foundJob.IntermediateFrontBack[0].s1down.toFixed(2),
      s1downGFB: foundJob.GirtsFrontBack[0].s1down.toFixed(2),
      s1downGSide: foundJob.GirtsSides[0].s1down.toFixed(2),
      s1downSides: foundJob.IntermediateSIDES[0].s1down.toFixed(2),
      shearStress: foundJob.PProperties[0].ShearStress,
      shearStressRI: foundJob.RafterCapacity[0].ShearStress,
      shearStressRE: foundJob.RafterCapacityE[0].ShearStress,
      shearStressFB: foundJob.IntermediateFrontBack[0].ShearStress,
      shearStressGFB: foundJob.GirtsFrontBack[0].ShearStress,
      shearStressGSide: foundJob.GirtsSides[0].ShearStress,
      shearStressSides: foundJob.IntermediateSIDES[0].ShearStress,
      BendingStress: foundJob.PProperties[0].BendingStress,
      BendingStressRI: foundJob.RafterCapacity[0].BendingStress,
      BendingStressRE: foundJob.RafterCapacityE[0].BendingStress,
      BendingStressFB: foundJob.IntermediateFrontBack[0].BendingStress,
      BendingStressGFB: foundJob.GirtsFrontBack[0].BendingStress,
      BendingStressGSide: foundJob.GirtsSides[0].BendingStress,
      BendingStressSides: foundJob.IntermediateFrontBack[0].BendingStress,
      MnuShortIB: foundJob.IntermediateFrontBack[0].Mnushort,
      MnuShortSi: foundJob.IntermediateSIDES[0].Mnushort,
      MnuShortGFB: foundJob.GirtsFrontBack[0].Mnushort,
      MnuShortGSide: foundJob.GirtsSides[0].Mnushort,
      MApplied: foundJob.IntermediateFrontBack[0].MApplied,
      MAppliedSide: foundJob.IntermediateSIDES[0].MApplied,
      MAppliedGFB: foundJob.GirtsFrontBack[0].MApplied,
      MAppliedGSide: foundJob.GirtsSides[0].MApplied,
      moisture: foundJob.PProperties[0].moisture,
      Dl: foundJob.PAnalysis[0].Dl,
      Ll: foundJob.PAnalysis[0].Ll,
      PSpan: foundJob.PAnalysis[0].PSpan,
      pSpacing: foundJob.PAnalysis[0].pSpacing,
      RSpacingI: foundJob.PAnalysis[0].RSpacingI,
      RSpacingE: foundJob.PAnalysis[0].RSpacingE,
      InspacingFB: foundJob.IntermediateFrontBack[0].bayWidth,
      GSpacingFB: foundJob.GirtsFrontBack[0].spacing,
      GSpacingSides: foundJob.GirtsSides[0].spacing,
      InspacingSides: foundJob.IntermediateSIDES[0].bayWidth * 1000,
      RSpanI: foundJob.PAnalysis[0].RSpanI,
      RSpanE: foundJob.PAnalysis[0].RSpanE,
      ISpanFB: foundJob.IntermediateFrontBack[0].Span,
      GSpanFB: foundJob.GirtsFrontBack[0].Span,
      GSpanSides: foundJob.GirtsSides[0].Span,
      ISpanSides: foundJob.IntermediateSIDES[0].Span,
      RSize: foundJob.RafterCapacity[0].member,
      RESize: foundJob.RafterCapacityE[0].member,
      reactiondown: foundJob.PAnalysis[0].reaction,
      reactiondownRI: foundJob.PAnalysis[0].reactionRI,
      reactiondownRE: foundJob.PAnalysis[0].reactionRE,
      reactionup: foundJob.PAnalysis[0].reactionup,
      reactionupRI: foundJob.PAnalysis[0].reactionupRI,
      reactionupRE: foundJob.PAnalysis[0].reactionupRE,
      reactionupFB: foundJob.IntermediateFrontBack[0].reaction,
      reactionupGFB: foundJob.GirtsFrontBack[0].reaction,
      reactionupGSide: foundJob.GirtsSides[0].reaction,
      reactionupSides: foundJob.IntermediateSIDES[0].reaction,
      member: foundJob.PProperties[0].member,
      memberRI: foundJob.RafterCapacity[0].member,
      memberRE: foundJob.RafterCapacityE[0].member,
      memberIFB: foundJob.IntermediateFrontBack[0].member,
      memberGFB: foundJob.GirtsFrontBack[0].member,
      memberGSide: foundJob.GirtsSides[0].member,
      memberISides: foundJob.IntermediateSIDES[0].member,
      Mcondition: foundJob.PProperties[0].MCondition,
      MconditionRI: foundJob.RafterCapacity[0].MCondition,
      MconditionRE: foundJob.RafterCapacityE[0].MCondition,
      MconditionFB: foundJob.IntermediateFrontBack[0].MCondition,
      MconditionGFB: foundJob.GirtsFrontBack[0].MCondition,
      MconditionGSide: foundJob.GirtsSides[0].MCondition,
      MconditionSides: foundJob.IntermediateSIDES[0].MCondition,
      windLoad: foundJob.PAnalysis[0].windup,
      SnowDown: foundJob.PAnalysis[0].SnowDown,
      vshort: foundJob.PAnalysis[0].vshort,
      vshortRI: foundJob.PAnalysis[0].vshortRI,
      vshortRE: foundJob.PAnalysis[0].vshortRE,
      vshortFB: foundJob.IntermediateFrontBack[0].reaction,
      vshorGFB: foundJob.GirtsFrontBack[0].reaction,
      vshorGSide: foundJob.GirtsSides[0].reaction,
      vshortSides: foundJob.IntermediateSIDES[0].reaction,
      vmedium: foundJob.PAnalysis[0].vmedium,
      vmediumRI: foundJob.PAnalysis[0].vmediumRI,
      vmediumRE: foundJob.PAnalysis[0].vmediumRE,
      vlong: foundJob.PAnalysis[0].vlong,
      vlongRI: foundJob.PAnalysis[0].vlongRI,
      vlongRE: foundJob.PAnalysis[0].vlongRE,
      shearShort: foundJob.PProperties[0].shearShort,
      shearShortRI: foundJob.RafterCapacity[0].shearShort,
      shearShortRE: foundJob.RafterCapacityE[0].shearShort,
      shearShortFB: foundJob.IntermediateFrontBack[0].shearShort,
      shearShortGFB: foundJob.GirtsFrontBack[0].shearShort,
      shearShortGSide: foundJob.GirtsSides[0].shearShort,
      shearShortSides: foundJob.IntermediateSIDES[0].shearShort,
      shearMedium: foundJob.PProperties[0].shearMedium,
      shearMediumRI: foundJob.RafterCapacity[0].shearMedium,
      shearMediumRE: foundJob.RafterCapacityE[0].shearMedium,
      shearLong: foundJob.PProperties[0].shearLong,
      shearLongRI: foundJob.RafterCapacity[0].shearLong,
      shearLongRE: foundJob.RafterCapacityE[0].shearLong,
      Per1v: Math.abs(
        (foundJob.PProperties[0].shearShort * 100) /
          foundJob.PAnalysis[0].vshort
      ).toFixed(2),
      Per1vRI: Math.abs(
        (foundJob.RafterCapacity[0].shearShort * 100) /
          foundJob.PAnalysis[0].vshortRI
      ).toFixed(2),
      Per1vRE: Math.abs(
        (foundJob.RafterCapacityE[0].shearShort * 100) /
          foundJob.PAnalysis[0].vshortRE
      ).toFixed(2),
      Per1vFB: Math.abs(
        (foundJob.IntermediateFrontBack[0].shearShort * 100) /
          foundJob.IntermediateFrontBack[0].reaction
      ).toFixed(2),
      Per1vSides: Math.abs(
        (foundJob.IntermediateSIDES[0].shearShort * 100) /
          foundJob.IntermediateSIDES[0].reaction
      ).toFixed(2),
      Per1vGFB: Math.abs(
        (foundJob.GirtsFrontBack[0].shearShort * 100) /
          foundJob.GirtsFrontBack[0].reaction
      ).toFixed(2),
      Per1vGSides: Math.abs(
        (foundJob.GirtsSides[0].shearShort * 100) /
          foundJob.GirtsSides[0].reaction
      ).toFixed(2),
      Per2v: (
        (foundJob.PProperties[0].shearMedium * 100) /
        foundJob.PAnalysis[0].vmedium
      ).toFixed(2),
      Per2vRI: (
        (foundJob.RafterCapacity[0].shearMedium * 100) /
        foundJob.PAnalysis[0].vmediumRI
      ).toFixed(2),
      Per2vRE: (
        (foundJob.RafterCapacityE[0].shearMedium * 100) /
        foundJob.PAnalysis[0].vmediumRE
      ).toFixed(2),
      Per3v: (
        (foundJob.PProperties[0].shearLong * 100) /
        foundJob.PAnalysis[0].vlong
      ).toFixed(2),
      Per3vRI: (
        (foundJob.RafterCapacity[0].shearLong * 100) /
        foundJob.PAnalysis[0].vlongRI
      ).toFixed(2),
      Per3vRE: (
        (foundJob.RafterCapacityE[0].shearLong * 100) /
        foundJob.PAnalysis[0].vlongRE
      ).toFixed(2),
      deflong: foundJob.PProperties[0].deflong,
      deflongRI: foundJob.RafterCapacity[0].deflong,
      deflongRE: foundJob.RafterCapacityE[0].deflong,
      defshort: foundJob.PProperties[0].defshort,
      defshortRI: foundJob.RafterCapacity[0].defshort,
      defshortRE: foundJob.RafterCapacityE[0].defshort,
      defshortFB: foundJob.IntermediateFrontBack[0].defshort,
      defshortGFB: foundJob.GirtsFrontBack[0].defshort,
      defshortGSide: foundJob.GirtsSides[0].defshort,
      defshortSides: foundJob.IntermediateSIDES[0].defshort,
      E: foundJob.PProperties[0].E,
      ERI: foundJob.RafterCapacity[0].E,
      ERE: foundJob.RafterCapacityE[0].E,
      EFB: foundJob.IntermediateFrontBack[0].E,
      ESides: foundJob.IntermediateSIDES[0].E,
      EGFB: foundJob.GirtsFrontBack[0].E,
      EGSide: foundJob.GirtsSides[0].E,
      k2long: foundJob.PProperties[0].k2long,
      k2longRI: foundJob.RafterCapacity[0].k2long,
      k2longRE: foundJob.RafterCapacityE[0].k2long,
      Deflimit: foundJob.PProperties[0].Deflimit,
      DeflimitRI: foundJob.RafterCapacity[0].Deflimit,
      DeflimitRE: foundJob.RafterCapacityE[0].Deflimit,
      Deflimitwn: foundJob.PProperties[0].Deflimitwn,
      DeflimitwnFB: foundJob.IntermediateFrontBack[0].Deflimitwn,
      DeflimitwnGFB: foundJob.GirtsFrontBack[0].Deflimitwn,
      DeflimitwnGSide: foundJob.GirtsSides[0].Deflimitwn,
      DeflimitwnSides: foundJob.IntermediateSIDES[0].Deflimitwn,
      DeflimitwnRI: foundJob.RafterCapacity[0].Deflimitwn,
      DeflimitwnRE: foundJob.RafterCapacityE[0].Deflimitwn,
      display: foundJob.IntermediateFrontBack[0].display,
      displaySIDES: foundJob.IntermediateSIDES[0].display,
      displayGFb: foundJob.GirtsFrontBack[0].display,
      displaySides: foundJob.GirtsSides[0].display,
      Eq: foundJob.EqZone,
      Db: foundJob.DZone,
      RafterIDisplay: foundJob.RafterCapacity[0].display,
      PoleDesignInternal: foundJob.PoleDesignInternal[0],
      PoleDesignExternal: foundJob.PoleDesignExternal[0],
      GirtsFrontBack: foundJob.GirtsFrontBack[0],
      GirtsSide: foundJob.GirtsSides[0],
      RafterCapacity: foundJob.RafterCapacity[0],
      RafterCapacityE: foundJob.RafterCapacityE[0],
      PAnalysis: foundJob.PAnalysis[0],
      IntermediateFrontBack: foundJob.IntermediateFrontBack[0],
      windCategory: foundJob.windCategory,
    },
  ];

  const document = {
    html: html,
    data: {
      users: dt,
    },
    path: "./docs/" + filename,
    type: "",
  };

  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });

  const filepath = "/docs/" + filename;

  res.render("download", {
    path: filepath,
  });
};

module.exports = {
  generatePdf,
};
