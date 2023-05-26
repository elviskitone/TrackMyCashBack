"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Expense extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Expense.belongsTo(models.User, {
                foreignKey: "user_email",
                onDelete: "CASCADE",
            });
        }
    }
    Expense.init({
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
        modelName: "Expense",
    });
    return Expense;
};
