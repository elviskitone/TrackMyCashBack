"use strict";
import { Model } from "sequelize";

interface ExpenseAttributes {
  name: string;
  value: number;
  user_email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Expense extends Model<ExpenseAttributes> implements ExpenseAttributes {
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
      Expense.belongsTo(models.User, {
        foreignKey: "user_email",
        onDelete: "CASCADE",
      });
    }
  }
  Expense.init(
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
      modelName: "Expense",
    }
  );
  return Expense;
};
