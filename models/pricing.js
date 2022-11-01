"use strict";

const Campaign = require("./campaign");

module.exports = function (sequelize, DataTypes) {
  var Pricing = sequelize.define(
    "Pricing",
    {
      campaignId: {
        type: DataTypes.INTEGER,
        references: {
          model: Campaign,
          key: "id",
        },
      },
      platform: { type: DataTypes.STRING },
      country: { type: DataTypes.STRING },
      price: { type: DataTypes.NUMERIC },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
      tableName: "pricing",
    }
  );

  return Pricing;
};
