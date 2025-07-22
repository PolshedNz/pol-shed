const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
let jobNumber = "";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  const dbo = db.db("polesDB");
  dbo.collection("jobs").findOne({}, function (err, result) {
    if (err) throw err;
    let jobNumber = result.jobNumber;

    db.close();
  });
});
let x = "";
let dt = [
  {
    name: "Shyam",
    age: "26",
    jobNumber: x,
  },
  {
    name: "Navjot",
    age: "26",
    jobNumber: 100,
  },
  {
    name: "Vitthal",
    age: "26",
    jobNumber: 100,
  },
];

module.exports = dt;
