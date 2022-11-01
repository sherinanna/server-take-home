"use strict";

const Campaign = require("./campaign");
const Creator = require("./creator");

module.exports = function (sequelize, DataTypes) {
  var Access = sequelize.define(
    "Access",
    {
      campaignId: {
        type: DataTypes.INTEGER,
        references: {
          model: Campaign,
          key: "id",
        },
      },
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: Creator,
          key: "id",
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
      tableName: "access",
    }
  );

  return Access;
};
