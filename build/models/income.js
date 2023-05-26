"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Income extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Income.belongsTo(models.User, {
                foreignKey: "user_email",
                onDelete: "CASCADE",
            });
        }
    }
    Income.init({
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
    }, {
        sequelize,
        modelName: "Income",
    });
    return Income;
};
