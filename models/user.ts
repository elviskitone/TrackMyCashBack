"use strict";
import { Model } from "sequelize";
import bcrypt from "bcrypt";

interface UserAttributes {
  username?: string;
  email: string;
  password?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    username?: string;
    email!: string;
    password?: string;

    static associate(models: any) {
      // define association here
      User.hasMany(models.Income, { foreignKey: "user_email" });
      User.hasMany(models.Expense, { foreignKey: "user_email" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user, options) => {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  });

  return User;
};
