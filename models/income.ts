"use strict";
import { Model } from "sequelize";

interface IncomeAttributes {
  name: string;
  value: number;
  user_email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Income extends Model<IncomeAttributes> implements IncomeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string;
    value!: number;
    user_email!: string;

    static associate(models: any) {
      // define association here
      Income.belongsTo(models.User, {
        foreignKey: "user_email",
        onDelete: "CASCADE",
      });
    }
  }
  Income.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Income",
    }
  );
  return Income;
};
