"use strict";

let { Sequelize, sequelize } = require("../service/db");

exports.creator = async (req, res) => {
  try {
    const creatorId = req.query.creator_id;
    let user = await db.sequelize.query(
      "SELECT * FROM creator b\n" + "WHERE id=$1\n",
      { bind: [creatorId], type: "RAW" }
    );
    res.send(user[0]);
  } catch (err) {
    console.log("Error is User: " + err);
    res.sendStatus(400);
  }
};

/*
    endpoint to get list of campaigns promoted by a creator. The creator id should be passed a s query string parameter
 */
exports.campaigns = async (req, res) => {
  try {
    const creatorId = req.query.creator_id;
    let results = await db.query(
      `SELECT * FROM campaign AS c
      JOIN  access AS a 
      ON c.id=a.campaign_id
      JOIN creator AS cr
      ON a.creator_id=cr.id
      WHERE cr.id = $1`,
      [creatorId]
    );

    // HOW TO CALCULATE AVERAGE PAY PER INSTALL SINCE WE DO NOT HAVE CAMPAIGN ASSOCIATED WITH AN INSTALL
    //  calculate average pay per install for  a creator-campaign combination
    let price = await db.query(
      `SELECT * FROM pricing AS p
      JOIN  access AS a 
      ON c.id=a.campaign_id
      JOIN creator AS cr
      ON a.creator_id=cr.id
      WHERE p.id = $1`,
      [creatorId]
    );

    res.send(results.rows);
  } catch (err) {
    console.log("Error " + err);
    res.sendStatus(400);
  }
};
