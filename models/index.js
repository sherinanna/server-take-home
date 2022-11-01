"use strict";

if (!global.hasOwnProperty("db")) {
  let { Sequelize, sequelize } = require("../service/db");

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Creator: require(__dirname + "/creator")(sequelize, Sequelize.DataTypes),
    Install: require(__dirname + "/install")(sequelize, Sequelize.DataTypes),
    Campaign: require(__dirname + "/campaign")(sequelize, Sequelize.DataTypes),
    Access: require(__dirname + "/access")(sequelize, Sequelize.DataTypes),
    Pricing: require(__dirname + "/pricing")(sequelize, Sequelize.DataTypes),
  };

  global.db.Creator.hasMany(global.db.Install, {
    onDelete: "cascade",
    foreignKey: "creator_id",
  });

  //   //  Each install belongs to one campaign
  //   global.db.Install.belongsTo(global.db.Campaign, {
  //     onDelete: "cascade",
  //     foreignKey: "campaign_id",
  //   });

  //  m:m relation between creator and campaigns through access table. one creator can promote many campaigns and vice versa
  global.db.Creator.belongsToMany(global.db.Campaign, {
    onDelete: "cascade",
    through: "Access",
  });

  global.db.Campaign.belongsToMany(global.db.Creator, {
    onDelete: "cascade",
    through: "Access",
  });
}
