const asyncHandler = require("express-async-handler");
const Job = require("../model/Job");
const engineerDescriptions = require("../data/engineerDetail");
const pdf = require("pdf-parse");
const {
  analysis,
  beamdesign,
  rafterdesign,
  rafterdesignE,
  IntermediateFB,
  IntermediateSides,
  GirtsFB,
  GirtsSi,
  PoleDesignI,
  PoleDesignE,
} = require("../views/mdesign");
// const fs = require("fs");
const { snowLoads } = require("../modules/snowloads");
const {
  options,
  shedType,
  IL,
  roofType,
  condition,
  PSize,
  RSize,
  RESize,
  IFb,
  Fb,
  ISi,
  GFb,
  GSi,
  Eq,
  Db,
  MPi,
  EPi,
  b2,
  calcs,
  cer,
  IInfo,
  PrSize,
  PropQ,
  PDisplay,
  ReDisplay,
  PeDisplay,
  PiDisplay,
  RDisplay,
  InDisplay,
  InSideDisplay,
  BI,
  BE,
  BProp,
  IFBAuto,
  ISIAuto,
} = require("../modules/selection");
const {
  rackingForceM,
  rackingForceE,
  bayWidth,
  rackingForceHeight,
  upliftArea,
} = require("../modules/rackingforces");
const { windPressure, windCategory } = require("../modules/pressureCalc");

const DL = 0.25;
const createJob = asyncHandler(async (req, res) => {
  const user = req.user.id;

  if (!req.user || !req.user.id) {
    console.log("No authenticated user found");
    return res.status(401).json({ message: "User not authenticated" });
  }

  let ejobNumber = req.body.jobNumber;
  let selectedEngineer = req.body.engineerName;
  const engineerData = engineerDescriptions[selectedEngineer] || {};
  console.log("engineer:", selectedEngineer);
  console.log("data:", engineerData);
  let pdfUrl = req.body.pdfUrl;
  console.log("pdl url:", pdfUrl);
  if (!pdfUrl) return res.status(400).send("PDF URL missing.");

  const response = await fetch(pdfUrl);
  const arrayBuffer = await response.arrayBuffer();
  const dataBuffer = Buffer.from(arrayBuffer);

  pdf(dataBuffer).then(function (data) {
    chlength = data.text
      .substring(
        data.text.indexOf("LENGTH") + 7,
        data.text.lastIndexOf("HEIGHT")
      )
      .substring(0, 5);

    chwidth = data.text
      .substring(
        data.text.indexOf("WIDTH") + 6,
        data.text.lastIndexOf("LENGTH") - 4
      )
      .substring(0, 5);

    latitude = data.text.substring(
      data.text.indexOf("LATITUDE") + 9,
      data.text.lastIndexOf("LONGITUDE")
    );
    longitude = data.text.substring(
      data.text.indexOf("LONGITUDE") + 10,
      data.text.lastIndexOf("ELEVATION")
    );
    elevation = data.text
      .substring(
        data.text.indexOf("ELEVATION:") + 10,
        data.text.lastIndexOf("WIND") - 2
      )
      .substring(0, 6);
    wRegion = data.text.substring(
      data.text.indexOf("REGION") + 7,
      data.text.lastIndexOf("ULTIMATEARI")
    );
    tc = data.text.substring(
      data.text.indexOf("TC:") + 3,
      data.text.lastIndexOf("Mz,cat:")
    );
    lee = data.text.substring(
      data.text.indexOf("Mlee:") + 5,
      data.text.lastIndexOf("Mel:")
    );

    WSpeed = data.text.substring(
      data.text.indexOf("Vsit") + 7,
      data.text.lastIndexOf("qsit") - 4
    );
    console.log(WSpeed);
    ari = data.text.substring(
      data.text.indexOf("ULTIMATEARI") + 12,
      data.text.lastIndexOf("YEARS")
    );

    if (lee > 1) {
      leeZone = " YES";
    } else {
      leeZone = "NO";
    }

    if (req.body.calcs == "Auto") {
      addedwidth = bayWidth(req.body.Length, req.body.noOfBays);
      PoleLoadWidth = bayWidth(req.body.Length, req.body.noOfBays);
      RISManual = (chwidth * 1000) / req.body.noOfColInMiddleBay;
    } else {
      addedwidth = Number(req.body.pSpanManual);
      PoleLoadWidth = Number(req.body.PLWManual);
      RISManual = Number(req.body.RISManual);
    }

    Moment = analysis(
      DL,
      0.25,
      req.body.RMaxU,
      req.body.RMaxD,
      snowLoads(
        elevation,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[1],
      addedwidth - 150,
      RISManual,
      req.body.pSpacing,
      PoleLoadWidth,
      (
        (chwidth * 1000) /
          req.body.NoOfColInEndBay /
          Math.cos((req.body.RoofPitch * Math.PI) / 180) -
        200
      ).toFixed(0),
      addedwidth / 2,
      req.body.PropQ,
      req.body.PropL,
      req.body.MMomentLong,
      req.body.MMomentMedium,
      req.body.MMomentShort,
      req.body.MReactionLong,
      req.body.MReactionMedium,
      req.body.MReactionShort,
      req.body.MReaction2Long,
      req.body.MReaction2Medium,
      req.body.MReaction2Short,
      req.body.MReactionPropLong,
      req.body.MReactionPropMedium,
      req.body.MReactionPropShort
    );

    GirtsFrontBack = GirtsFB(
      req.body.GirtsFB,
      addedwidth,
      req.body.gSpacing,
      req.body.WMax,
      snowLoads(
        elevation,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[1],
      req.body.MaxGirtSpan,
      req.body.gFBBlocking,
      req.body.InDisplay,
      req.body.IL
    );

    GirtsSides = GirtsSi(
      req.body.GirtsSi,
      (chwidth / req.body.NoOfColInEndBay) * 1000,
      req.body.gsSpacing,
      req.body.WMax,
      snowLoads(
        elevation,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[1],
      req.body.MaxGirtSpan,
      req.body.gSIBlocking,
      req.body.IL
    );

    MomentLong = Moment[0].MomentLong;
    MomentMedium = Moment[0].MomentMedium;
    MomentShort = Moment[0].MomentShort;

    MomentCapacity = beamdesign(
      req.body.purlinSize,
      (addedwidth - 200) / req.body.Blocking,
      900,
      DL,
      req.body.pSpacing,
      addedwidth - 200,
      req.body.RMaxU,
      req.body.RMaxD,
      0.25,
      addedwidth,
      (chwidth / req.body.noOfColInMiddleBay) * 1000 - 200,
      req.body.IL
    );

    RafterCapacity = rafterdesign(
      req.body.rafterSize,
      DL,
      PoleLoadWidth,
      RISManual,
      req.body.RMaxU,
      req.body.RMaxD,
      0.25,
      req.body.noOfColInMiddleBay,
      req.body.PropQ,
      req.body.PropInternal,
      req.body.PropL,
      req.body.MDefShort,
      req.body.MDefLong,
      req.body.RBoltInternal,
      req.body.Noda,
      req.body.MPole,
      req.body.RBoltProp,
      req.body.NodaProp,
      req.body.IL
    );
    RafterCapacityE = rafterdesignE(
      req.body.rafterSizeE,
      DL,
      addedwidth / 2,
      (chwidth * 1000) / req.body.NoOfColInEndBay,
      req.body.RMaxU,
      req.body.RMaxD,
      0.25,
      req.body.RBoltExternal,
      req.body.NodaEx,
      req.body.IL
    );

    IntermediateFrontBack = IntermediateFB(
      req.body.IntermediateFB,
      req.body.FrontorBack,
      req.body.MaxHeight,
      req.body.RoofPitch,
      addedwidth,
      req.body.WMax,
      snowLoads(
        req.body.SElev,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[0],
      req.body.roofType,
      chwidth,
      req.body.MaxGirtSpan,
      req.body.IFBAuto,
      req.body.IFBSpan,
      req.body.IFBWidth,
      req.body.IL
    );
    IntermediateSIDES = IntermediateSides(
      req.body.IntermediateSides,
      req.body.roofType,
      req.body.MaxHeight,
      req.body.RoofPitch,
      chwidth / req.body.NoOfColInEndBay,
      req.body.WMax,
      snowLoads(
        req.body.SElev,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[0],
      req.body.NoOfColInEndBay,
      chwidth,
      req.body.MaxGirtSpan,
      req.body.ISIAuto,
      req.body.ISISpan,
      req.body.ISIWidth,
      req.body.IL
    );
    PoleDesignInternal = PoleDesignI(
      req.body.MPoleDepth,
      req.body.MaxHeight * 0.75,
      req.body.MPole,
      PoleLoadWidth,
      RISManual,
      req.body.RMaxD,
      snowLoads(
        req.body.SElev,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[1],
      req.body.noOfColInMiddleBay,
      req.body.NoOfColInEndBay,
      req.body.noOfBays,
      req.body.Length,
      req.body.Width,
      snowLoads(
        req.body.SElev,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[0],
      req.body.rafterSize,
      req.body.RFrom1,
      req.body.RTo1,
      req.body.RCPe1,
      req.body.Rpe1,
      req.body.Rpnet1,
      req.body.RFrom2,
      req.body.RTo2,
      req.body.RCpe2,
      req.body.Rpe2,
      req.body.Rpnet2,
      req.body.WFrom1,
      req.body.WTo1,
      req.body.WCPe1,
      req.body.Wpe1,
      req.body.Wpnet1,
      req.body.WFrom2,
      req.body.WTo2,
      req.body.WCpe2,
      req.body.Wpe2,
      req.body.Wpnet2,
      req.body.Type,
      req.body.WCpi1,
      req.body.WCpi2,
      req.body.RCpi2,
      req.body.RMaxD,
      req.body.RMaxU,
      req.body.WMax,
      req.body.RackMax,
      req.body.pSpanManual,
      req.body.calcs,
      req.body.cer,
      req.body.IInfo,
      req.body.MPoleHeight,
      req.body.MPoleRes,
      req.body.PropL,
      req.body.PropQ,
      req.body.MDeadLoad,
      req.body.MLiveLoad,
      req.body.MWindLoad,
      req.body.MSnowLoad,
      req.body.MWindDown,
      req.body.MWindLateral,
      req.body.MSnowLateral,
      req.body.MWindLateralPole,
      req.body.MSnowLateralPole,
      req.body.PDisplay,
      req.body.ReDisplay,
      req.body.RDisplay,
      req.body.roofType,
      req.body.InDisplay,
      req.body.PeDisplay,
      req.body.InSideDisplay,
      req.body.PiDisplay,
      DL,
      req.body.soilCohesion,
      req.body.soilFriction,
      req.body.soilDensity,
      req.body.IL
    );
    PoleDesignExternal = PoleDesignE(
      req.body.EPoleDepth,
      req.body.MaxHeight * 0.75,
      req.body.EPole,
      addedwidth / 2,
      (chwidth * 1000) / req.body.NoOfColInEndBay,
      req.body.RMaxD,
      snowLoads(
        req.body.SElev,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[1],
      req.body.NoOfColInEndBay,
      snowLoads(
        req.body.SElev,
        req.body.snowZone,
        req.body.RoofPitch,
        req.body.IL
      )[0],
      req.body.rafterSizeE,
      req.body.RMaxD,
      req.body.RMaxU,
      req.body.WMax,
      req.body.RackMax,
      req.body.council,
      req.body.pages,
      req.body.dated,
      req.body.b2,
      req.body.soil,
      DL,
      req.body.soilCohesion,
      req.body.soilFriction,
      req.body.soilDensity,
      req.body.Geotech,
      req.body.IL
    );

    Momentupshort = MomentCapacity[0].Momentupshort || 0;
    MomentDownmedium = MomentCapacity[0].MomentDownmedium || 0;
    MomentDownlong = MomentCapacity[0].MomentDownlong || 0;
  });

  Job.findOne(
    { jobNumber: req.body.jobNumber },
    async function (err, foundJob) {
      if (foundJob) {
        Job.updateMany(
          { jobNumber: foundJob.jobNumber },
          {
            $set: {
              jobNumber: req.body.jobNumber,
              address: req.body.address,
              date: req.body.date,
              engineer: engineerData.fullName,
              engineerDescription: engineerData.description,
              registrationNumber: engineerData.registrationNumber,
              phoneNumber: engineerData.phoneNumber,
              engineerEmail: engineerData.engineerEmail,
              engineerCompany: engineerData.engineerCompany,
              companyaddress: engineerData.companyaddress,
              user,
              pdfUrl: req.body.pdfUrl,
              latitude: latitude,
              longitude: longitude,
              elevation: elevation,
              wRegion: wRegion,
              tc: tc,
              lee: lee,
              leeZone: leeZone,
              WSpeed: WSpeed,
              ari: ari,
              shedType: shedType(req.body.Type),
              IL: IL(req.body.IL),
              length: req.body.Length,
              width: req.body.Width,
              chlength: chlength,
              chwidth: chwidth,
              noOfBays: req.body.noOfBays,
              noOfColInMiddleBay: req.body.noOfColInMiddleBay,
              NoOfColInEndBay: req.body.NoOfColInEndBay,
              MaxHeight: req.body.MaxHeight,
              roofType: roofType(req.body.roofType),
              RoofPitch: req.body.RoofPitch,
              condition: condition(req.body.Condition),
              windSpeed: req.body.windSpeed,
              snowZone: req.body.snowZone,
              SElev: req.body.SElev,
              RSnowLoad: snowLoads(
                req.body.SElev,
                req.body.snowZone,
                req.body.RoofPitch,
                req.body.IL
              )[1],
              GSnowLoad: snowLoads(
                req.body.SElev,
                req.body.snowZone,
                req.body.RoofPitch,
                req.body.IL
              )[0],
              windPressure1: windPressure(WSpeed),
              windCategory: windCategory(req.body.windSpeed),
              rackingM: rackingForceM(
                req.body.MaxHeight,
                req.body.Length,
                req.body.noOfBays,
                windPressure(req.body.windSpeed),
                req.body.noOfColInMiddleBay,
                snowLoads(
                  req.body.SElev,
                  req.body.snowZone,
                  req.body.RoofPitch,
                  req.body.IL
                )[0] || 0
              ),
              rackingE:
                rackingForceE(
                  req.body.MaxHeight,
                  req.body.Length,
                  req.body.noOfBays,
                  windPressure(req.body.windSpeed),
                  req.body.noOfColInMiddleBay,
                  snowLoads(
                    req.body.SElev,
                    req.body.snowZone,
                    req.body.RoofPitch,
                    req.body.IL
                  )[0]
                ) || 0,
              bayWidth: addedwidth,
              RackForceHeight: rackingForceHeight(req.body.MaxHeight),
              upliftMiddleMiddle:
                upliftArea(
                  req.body.noOfColInMiddleBay,
                  bayWidth(req.body.Length, req.body.noOfBays),
                  req.body.Width,
                  windPressure(req.body.windSpeed),
                  req.body.Type
                )[1] || 0,
              upliftMiddleEnd:
                upliftArea(
                  req.body.noOfColInMiddleBay,
                  bayWidth(req.body.Length, req.body.noOfBays),
                  req.body.Width,
                  windPressure(req.body.windSpeed),
                  req.body.Type
                )[0] || 0,
              selected: options(req.body.snowZone),
              PSize: PSize(req.body.purlinSize),
              RSize: RSize(req.body.rafterSize),
              RESize: RESize(req.body.rafterSizeE),
              IFb: IFb(req.body.IntermediateFB),
              ISi: ISi(req.body.IntermediateSides),
              GFb: GFb(req.body.GirtsFB),
              GSi: GSi(req.body.GirtsSi),
              Fb: Fb(req.body.FrontorBack),
              Eq: Eq(req.body.EqZone),
              Db: Db(req.body.DZone),
              MPi: MPi(req.body.MPole),
              EPi: EPi(req.body.EPole),
              b2: b2(req.body.b2),
              cer: cer(req.body.cer),
              IInfo: IInfo(req.body.IInfo),
              PDisplay: PDisplay(req.body.PDisplay),
              ReDisplay: ReDisplay(req.body.ReDisplay),
              PeDisplay: PeDisplay(req.body.PeDisplay),
              PiDisplay: PiDisplay(req.body.PiDisplay),
              RDisplay: RDisplay(req.body.RDisplay),
              InDisplay: InDisplay(req.body.InDisplay),
              InSideDisplay: InSideDisplay(req.body.InSideDisplay),
              BI: BI(req.body.RBoltInternal),
              BE: BE(req.body.RBoltExternal),
              BProp: BProp(req.body.RBoltProp),
              IFBAuto: IFBAuto(req.body.IFBAuto),
              ISIAuto: ISIAuto(req.body.ISIAuto),
              PrSize: PrSize(req.body.PropInternal),
              PropQ: PropQ(req.body.PropQ),
              calcs: calcs(req.body.calcs),
              PSpacing: req.body.pSpacing,
              PDepthI: req.body.MPoleDepth,
              PDepthE: req.body.EPoleDepth,
              PProperties: MomentCapacity[0],
              PAnalysis: Moment[0],
              RafterCapacity: RafterCapacity[0],
              RafterCapacityE: RafterCapacityE[0],
              IntermediateFrontBack: IntermediateFrontBack[0],
              IntermediateSIDES: IntermediateSIDES[0],
              GirtsFrontBack: GirtsFrontBack[0],
              GirtsSides: GirtsSides[0],
              PoleDesignInternal: PoleDesignInternal[0],
              PoleDesignExternal: PoleDesignExternal[0],
              Blocking: req.body.Blocking,
              MomentLong: MomentLong,
              MomentMedium: MomentMedium,
              MomentShort: MomentShort,
              Momentupshort: Momentupshort,
              MomentDownmedium: MomentDownmedium,
              MomentDownlong: MomentDownlong,
              EqZone: req.body.EqZone,
              DZone: req.body.DZone,
              MaxGirtSpan: req.body.MaxGirtSpan,
            },
          },

          (err, res) => {
            if (!err) {
              console.log("data updated");
            }
          }
        ),
          res.redirect("/job/" + foundJob._id);
      } else {
        const job = new Job({
          jobNumber: req.body.jobNumber,
          address: req.body.address,
          date: req.body.date,
          engineer: engineerData.fullName,
          engineerDescription: engineerData.description,
          registrationNumber: engineerData.registrationNumber,
          phoneNumber: engineerData.phoneNumber,
          engineerEmail: engineerData.engineerEmail,
          engineerCompany: engineerData.engineerCompany,
          companyaddress: engineerData.companyaddress,
          pdfUrl: req.body.pdfUrl,
          user,
          latitude: latitude,
          longitude: longitude,
          elevation: elevation,
          wRegion: wRegion,
          tc: tc,
          lee: lee,
          leeZone: leeZone,
          ari: ari,
          shedType: shedType(req.body.Type),
          IL: IL(req.body.type),
          length: req.body.Length,
          width: req.body.Width,
          chlength: chlength,
          chwidth: chwidth,
          noOfBays: req.body.noOfBays,
          noOfColInMiddleBay: req.body.noOfColInMiddleBay,
          NoOfColInEndBay: req.body.NoOfColInEndBay,
          MaxHeight: req.body.MaxHeight,
          roofType: roofType(req.body.roofType),
          RoofPitch: req.body.RoofPitch,
          condition: condition(req.body.Condition),
          windSpeed: req.body.windSpeed,
          WSpeed: WSpeed,
          snowZone: req.body.snowZone,
          SElev: req.body.SElev,
          RSnowLoad: snowLoads(
            req.body.SElev,
            req.body.snowZone,
            req.body.RoofPitch,
            req.body.IL
          )[1],
          GSnowLoad: snowLoads(
            req.body.SElev,
            req.body.snowZone,
            req.body.RoofPitch,
            req.body.IL
          )[0],
          windPressure1: windPressure(req.body.windSpeed),
          windCategory: windCategory(WSpeed),
          rackingM: rackingForceM(
            req.body.MaxHeight,
            req.body.Length,
            req.body.noOfBays,
            windPressure(req.body.windSpeed),
            req.body.noOfColInMiddleBay,
            snowLoads(
              req.body.SElev,
              req.body.snowZone,
              req.body.RoofPitch,
              req.body.IL
            )[0]
          ),
          rackingE: rackingForceE(
            req.body.MaxHeight,
            req.body.Length,
            req.body.noOfBays,
            windPressure(req.body.windSpeed),
            req.body.noOfColInMiddleBay,
            snowLoads(
              req.body.SElev,
              req.body.snowZone,
              req.body.RoofPitch,
              req.body.IL
            )[0]
          ),
          bayWidth: bayWidth(req.body.Length, req.body.noOfBays),
          RackForceHeight: rackingForceHeight(req.body.MaxHeight),
          upliftMiddleMiddle:
            upliftArea(
              req.body.noOfColInMiddleBay,
              bayWidth(req.body.Length, req.body.noOfBays),
              req.body.Width,
              windPressure(req.body.windSpeed),
              req.body.Type
            )[1] || 0,
          upliftMiddleEnd:
            upliftArea(
              req.body.noOfColInMiddleBay,
              bayWidth(req.body.Length, req.body.noOfBays),
              req.body.Width,
              windPressure(req.body.windSpeed),
              req.body.Type
            )[0] || 0,
          selected: options(req.body.snowZone),
          PSize: PSize(req.body.purlinSize[0]),
          ReDisplay: ReDisplay(req.body.ReDisplay[0]),
          PeDisplay: PeDisplay(req.body.PeDisplay[0]),
          PiDisplay: PiDisplay(req.body.PiDisplay[0]),
          RDisplay: RDisplay(req.body.RDisplay[0]),
          InDisplay: InDisplay(req.body.InDisplay[0]),
          InSideDisplay: InSideDisplay(req.body.InSideDisplay[0]),
          RSize: RSize(req.body.rafterSize[0]),
          RESize: RESize(req.body.rafterSizeE[0]),
          IFb: IFb(req.body.IntermediateFB),
          ISi: ISi(req.body.IntermediateSides),
          GFb: GFb(req.body.GirtsFB),
          GSi: GSi(req.body.GirtsSi),
          Fb: Fb(req.body.FrontorBack),
          Eq: Eq(req.body.EqZone),
          Db: Db(req.body.DZone),
          MPi: MPi(req.body.MPole),
          EPi: EPi(req.body.EPole),
          b2: b2(req.body.b2),
          cer: cer(req.body.cer),
          IInfo: IInfo(req.body.IInfo),
          PDisplay: PDisplay(req.body.PDisplay),
          PrSize: PrSize(req.body.PropInternal),
          BI: BI(req.body.RBoltInternal),
          BE: BE(req.body.RBoltExternal),
          BProp: BProp(req.body.RBoltProp),
          IFBAuto: IFBAuto(req.body.IFBAuto),
          ISIAuto: ISIAuto(req.body.ISIAuto),
          PropQ: PropQ(req.body.PropQ),
          calcs: calcs(req.body.calcs),
          PSpacing: req.body.pSpacing,
          PDepthI: req.body.MPoleDepth,
          PDepthE: req.body.EPoleDepth,
          PProperties: MomentCapacity[0],
          PAnalysis: Moment[0],
          RafterCapacity: RafterCapacity[0],
          RafterCapacityE: RafterCapacityE[0],
          IntermediateFrontBack: IntermediateFrontBack[0],
          IntermediateSIDES: IntermediateSIDES[0],
          GirtsFrontBack: GirtsFrontBack[0],
          GirtsSides: GirtsSides[0],
          PoleDesignInternal: PoleDesignInternal[0],
          PoleDesignExternal: PoleDesignExternal[0],
          Blocking: req.body.Blocking,
          MomentLong: MomentLong,
          MomentMedium: MomentMedium,
          MomentShort: MomentShort,
          Momentupshort: Momentupshort,
          MomentDownmedium: MomentDownmedium,
          MomentDownlong: MomentDownlong,
          EqZone: req.body.EqZone,
          DZone: req.body.DZone,
          MaxGirtSpan: req.body.MaxGirtSpan,
        });

        await job.save();
        res.redirect("/job/" + job._id);
      }
    }
  );
});

const getJobPage = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  res.render("list", {
    windPressure1: 0,
    windCategory: "None",
    rackingM: 0,
    rackingE: 0,
    bayWidth: 0,
    RackForceHeight: 0,
    upliftMiddleMiddle: 0,
    upliftMiddleEnd: 0,
    jobNumber: "",
    address: "  ",
    date: today,
    latitude: " ",
    longitude: " ",
    elevation: "",
    wRegion: "",
    ari: "",
    tc: "",
    lee: "",
    leeZone: "",
    WSpeed: "",
    shedType: " ",
    IL: "",
    length: " ",
    width: " ",
    chlength: " ",
    chwidth: " ",
    noOfBays: " ",
    noOfColInMiddleBay: " ",
    NoOfColInEndBay: " ",
    MaxHeight: " ",
    roofType: " ",
    RoofPitch: " ",
    condition: " ",
    windSpeed: " ",
    snowZone: " ",
    SElev: " ",
    RSnowLoad: " ",
    GSnowLoad: " ",
    selected: " ",
    PSize: " ",
    RSize: "",
    RESize: "",
    IFb: "",
    ISi: "",
    GFb: "",
    GSi: "",
    Fb: "",
    Eq: "",
    Db: "",
    MPi: "",
    EPi: "",
    b2: "",
    cer: "",
    IInfo: "",
    PDisplay: "",
    ReDisplay: "",
    PeDisplay: "",
    PiDisplay: "",
    RDisplay: "",
    InDisplay: "",
    InSideDisplay: "",
    BI: "",
    BE: "",
    BProp: "",
    IFBAuto: "",
    ISIAuto: "",
    PrSize: "",
    PropQ: "",
    calcs: "",
    PSpacing: " ",
    PDepthI: "",
    PDepthE: "",
    PProperties: " ",
    PAnalysis: " ",
    RafterCapacity: "",
    RafterCapacityE: "",
    IntermediateFrontBack: "",
    IntermediateSIDES: "",
    GirtsFrontBack: "",
    GirtsSides: "",
    PoleDesignInternal: "",
    PoleDesignExternal: "",
    Blocking: " ",
    MomentLong: " ",
    MomentMedium: " ",
    MomentShort: "",
    Momentupshort: " ",
    MomentDownmedium: " ",
    MomentDownlong: " ",
    EqZone: "",
    DZone: "",
    MaxGirtSpan: "",
    engineerName: "",
    engineerDescription: "",
  });
});

const getJobByNumber = asyncHandler(async (req, res) => {
  const ejobNumber = req.params.ejobNumber;

  try {
    if (ejobNumber === "jobList.ejs") {
      const foundJobs = await Job.find({});
      return res.render("jobList", { jobs: foundJobs });
    }

    const foundJob = await Job.findOne({ jobNumber: ejobNumber });

    if (!foundJob) {
      console.log("No job found");
      return res.status(404).send("Job not found");
    }

    // console.log("Data rendered from found job");

    // Render list view with foundJob data
    return res.render("list", {
      jobNumber: foundJob.jobNumber,
      address: foundJob.address,
      date: new Date().toLocaleDateString(),
      latitude: foundJob.latitude,
      longitude: foundJob.longitude,
      elevation: foundJob.elevation,
      wRegion: foundJob.wRegion,
      ari: foundJob.ari,
      tc: foundJob.tc,
      lee: foundJob.lee,
      leeZone: foundJob.leeZone,
      WSpeed: foundJob.WSpeed,
      shedType: foundJob.shedType,
      IL: foundJob.IL,
      length: foundJob.length,
      width: foundJob.width,
      chlength: foundJob.chlength,
      chwidth: foundJob.chwidth,
      noOfBays: foundJob.noOfBays,
      noOfColInMiddleBay: foundJob.noOfColInMiddleBay,
      NoOfColInEndBay: foundJob.NoOfColInEndBay,
      MaxHeight: foundJob.MaxHeight,
      roofType: foundJob.roofType,
      RoofPitch: foundJob.RoofPitch,
      condition: foundJob.condition,
      windSpeed: foundJob.windSpeed,
      snowZone: foundJob.snowZone,
      SElev: foundJob.SElev,
      RSnowLoad: foundJob.RSnowLoad,
      GSnowLoad: foundJob.GSnowLoad,
      windPressure1: foundJob.windPressure1,
      windCategory: foundJob.windCategory,
      rackingM: foundJob.rackingM,
      rackingE: foundJob.rackingE,
      bayWidth: foundJob.bayWidth,
      RackForceHeight: foundJob.RackForceHeight,
      upliftMiddleMiddle: foundJob.upliftMiddleMiddle,
      upliftMiddleEnd: foundJob.upliftMiddleEnd,
      selected: foundJob.selected,
      PSize: foundJob.PSize,
      RSize: foundJob.RSize,
      RESize: foundJob.RESize,
      IFb: foundJob.IFb,
      ISi: foundJob.ISi,
      Fb: foundJob.Fb,
      GFb: foundJob.GFb,
      GSi: foundJob.GSi,
      Eq: foundJob.Eq,
      Db: foundJob.Db,
      MPi: foundJob.MPi,
      EPi: foundJob.EPi,
      b2: foundJob.b2,
      cer: foundJob.cer,
      IInfo: foundJob.IInfo,
      PDisplay: foundJob.PDisplay,
      ReDisplay: foundJob.ReDisplay,
      PeDisplay: foundJob.PeDisplay,
      PiDisplay: foundJob.PiDisplay,
      RDisplay: foundJob.RDisplay,
      InDisplay: foundJob.InDisplay,
      InSideDisplay: foundJob.InSideDisplay,
      BI: foundJob.BI,
      BE: foundJob.BE,
      BProp: foundJob.BProp,
      IFBAuto: foundJob.IFBAuto,
      ISIAuto: foundJob.ISIAuto,
      PrSize: foundJob.PrSize,
      PropQ: foundJob.PropQ,
      calcs: foundJob.calcs,
      PSpacing: foundJob.PSpacing,
      PDepthI: foundJob.PDepthI,
      PDepthE: foundJob.PDepthE,
      PProperties: foundJob.PProperties?.[0],
      PAnalysis: foundJob.PAnalysis?.[0],
      RafterCapacity: foundJob.RafterCapacity?.[0],
      RafterCapacityE: foundJob.RafterCapacityE?.[0],
      IntermediateFrontBack: foundJob.IntermediateFrontBack?.[0],
      IntermediateSIDES: foundJob.IntermediateSIDES?.[0],
      GirtsFrontBack: foundJob.GirtsFrontBack?.[0],
      GirtsSides: foundJob.GirtsSides?.[0],
      PoleDesignInternal: foundJob.PoleDesignInternal?.[0],
      PoleDesignExternal: foundJob.PoleDesignExternal?.[0],
      Blocking: foundJob.Blocking,
      MomentLong: foundJob.MomentLong,
      MomentMedium: foundJob.MomentMedium,
      MomentShort: foundJob.MomentShort,
      Momentupshort: foundJob.Momentupshort,
      MomentDownmedium: foundJob.MomentDownmedium,
      MomentDownlong: foundJob.MomentDownlong,
      EqZone: foundJob.EqZone,
      DZone: foundJob.DZone,
      MaxGirtSpan: foundJob.MaxGirtSpan,
    });
  } catch (error) {
    console.error("Error fetching job:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const foundJob = await Job.findById(jobId);

    if (!foundJob) {
      return res.status(404).send("Job not found");
    }

    // console.log("Data rendered from found job", foundJob);
    // console.log("job data", foundJob.engineer);
    // console.log("job data", foundJob.engineerDescription);

    // Render list view with foundJob data
    return res.render("list", {
      job: foundJob,
      jobNumber: foundJob.jobNumber,
      address: foundJob.address,
      date: new Date().toLocaleDateString(),
      latitude: foundJob.latitude,
      longitude: foundJob.longitude,
      elevation: foundJob.elevation,
      wRegion: foundJob.wRegion,
      ari: foundJob.ari,
      tc: foundJob.tc,
      lee: foundJob.lee,
      leeZone: foundJob.leeZone,
      WSpeed: foundJob.WSpeed,
      shedType: foundJob.shedType,
      IL: foundJob.IL,
      length: foundJob.length,
      width: foundJob.width,
      chlength: foundJob.chlength,
      chwidth: foundJob.chwidth,
      noOfBays: foundJob.noOfBays,
      noOfColInMiddleBay: foundJob.noOfColInMiddleBay,
      NoOfColInEndBay: foundJob.NoOfColInEndBay,
      MaxHeight: foundJob.MaxHeight,
      roofType: foundJob.roofType,
      RoofPitch: foundJob.RoofPitch,
      condition: foundJob.condition,
      windSpeed: foundJob.windSpeed,
      snowZone: foundJob.snowZone,
      SElev: foundJob.SElev,
      RSnowLoad: foundJob.RSnowLoad,
      GSnowLoad: foundJob.GSnowLoad,
      windPressure1: foundJob.windPressure1,
      windCategory: foundJob.windCategory,
      rackingM: foundJob.rackingM,
      rackingE: foundJob.rackingE,
      bayWidth: foundJob.bayWidth,
      RackForceHeight: foundJob.RackForceHeight,
      upliftMiddleMiddle: foundJob.upliftMiddleMiddle,
      upliftMiddleEnd: foundJob.upliftMiddleEnd,
      selected: foundJob.selected,
      PSize: foundJob.PSize,
      RSize: foundJob.RSize,
      RESize: foundJob.RESize,
      IFb: foundJob.IFb,
      ISi: foundJob.ISi,
      Fb: foundJob.Fb,
      GFb: foundJob.GFb,
      GSi: foundJob.GSi,
      Eq: foundJob.Eq,
      Db: foundJob.Db,
      MPi: foundJob.MPi,
      EPi: foundJob.EPi,
      b2: foundJob.b2,
      cer: foundJob.cer,
      IInfo: foundJob.IInfo,
      PDisplay: foundJob.PDisplay,
      ReDisplay: foundJob.ReDisplay,
      PeDisplay: foundJob.PeDisplay,
      PiDisplay: foundJob.PiDisplay,
      RDisplay: foundJob.RDisplay,
      InDisplay: foundJob.InDisplay,
      InSideDisplay: foundJob.InSideDisplay,
      BI: foundJob.BI,
      BE: foundJob.BE,
      BProp: foundJob.BProp,
      IFBAuto: foundJob.IFBAuto,
      ISIAuto: foundJob.ISIAuto,
      PrSize: foundJob.PrSize,
      PropQ: foundJob.PropQ,
      calcs: foundJob.calcs,
      PSpacing: foundJob.PSpacing,
      PDepthI: foundJob.PDepthI,
      PDepthE: foundJob.PDepthE,
      PProperties: foundJob.PProperties?.[0],
      PAnalysis: foundJob.PAnalysis?.[0],
      RafterCapacity: foundJob.RafterCapacity?.[0],
      RafterCapacityE: foundJob.RafterCapacityE?.[0],
      IntermediateFrontBack: foundJob.IntermediateFrontBack?.[0],
      IntermediateSIDES: foundJob.IntermediateSIDES?.[0],
      GirtsFrontBack: foundJob.GirtsFrontBack?.[0],
      GirtsSides: foundJob.GirtsSides?.[0],
      PoleDesignInternal: foundJob.PoleDesignInternal?.[0],
      PoleDesignExternal: foundJob.PoleDesignExternal?.[0],
      Blocking: foundJob.Blocking,
      MomentLong: foundJob.MomentLong,
      MomentMedium: foundJob.MomentMedium,
      MomentShort: foundJob.MomentShort,
      Momentupshort: foundJob.Momentupshort,
      MomentDownmedium: foundJob.MomentDownmedium,
      MomentDownlong: foundJob.MomentDownlong,
      EqZone: foundJob.EqZone,
      DZone: foundJob.DZone,
      MaxGirtSpan: foundJob.MaxGirtSpan,
    });
  } catch (error) {
    console.error("Error fetching job:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

const getUsersJob = asyncHandler(async (req, res) => {
  console.log("getting user jobs");
  try {
    const userJobs = await Job.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    return res.render("jobList", { jobs: userJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return res.status(500).send("Internal Server Error");
  }
  F;
});

const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.body.checkbox;
  try {
    await Job.findByIdAndDelete(jobId);
    console.log("Successfully deleted job with ID:", jobId);
    res.redirect("/joblist");
  } catch (err) {
    console.error("Error deleting job:", err.message);
    res.status(500).send("Failed to delete job.");
  }
});

module.exports = {
  createJob,
  getJobPage,
  getJobByNumber,
  getUsersJob,
  getJobById,
  deleteJob,
};
