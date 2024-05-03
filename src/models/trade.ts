import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Trade = sequelize.define(
    'Trade',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        currency_pair: {
            type: DataTypes.STRING,
        },
        entry_price: {
            type: DataTypes.DECIMAL,
        },
        exit_price: {
            type: DataTypes.DECIMAL,
        },
        entry_time: {
            type: DataTypes.DATE,
        },
        exit_time: {
            type: DataTypes.DATE,
        },
        position_size: {
            type: DataTypes.DECIMAL,
        },
        profit: {
            type: DataTypes.DECIMAL,
        },
        status: {
            type: DataTypes.ENUM('PROFIT', 'LOSS'),
        },
        strategy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        risk_reward_ratio: {
            type: DataTypes.DECIMAL,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'trade_log',
        // Customize automatically added field names by sequelize
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
