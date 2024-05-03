import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'user',
        // Customize automatically added field names by sequelize
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
