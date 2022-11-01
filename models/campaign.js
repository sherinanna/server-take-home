"use strict";

module.exports = function (sequelize, DataTypes) {
  var Campaign = sequelize.define(
    "Campaign",
    {
      campaignName: { type: DataTypes.STRING },
      campaignIconUrl: { type: DataTypes.STRING },
      conversionEvent: { type: DataTypes.STRING },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
      tableName: "campaign",
    }
  );

  return Campaign;
};
