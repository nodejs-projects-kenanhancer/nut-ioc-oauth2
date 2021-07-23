const { Model, DataTypes } = require("sequelize");

const base = {
    created_at: { type: DataTypes.DATE, required: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}

const baseWithBy = {
    ...base,
    created_by: { type: DataTypes.STRING(21), allowNull: true },
    updated_by: { type: DataTypes.STRING(21), allowNull: true }
}

class Client extends Model { }
class Authorize extends Model { }

module.exports.Service = async ({ datasources: { rdbms: { sequelize } } }) => {

    Client.init({
        client_id: { type: DataTypes.STRING(32), primaryKey: true, unique: true },
        customer_id: { type: DataTypes.STRING(21), required: true },
        client_secret: { type: DataTypes.STRING(64), required: true },
        name: { type: DataTypes.STRING(100), required: true },
        redirect_uri: { type: DataTypes.STRING(256), required: true },
        public_key: { type: DataTypes.STRING(513), required: true },
        disabled: { type: DataTypes.BOOLEAN, required: false, defaultValue: false },
        ...base
    }, {
        sequelize, modelName: 'client', tableName: 'client', timestamps: false,
        indexes: [
            { unique: true, fields: ['client_id'] },
            { unique: false, fields: ['customer_id'] },
        ]
    });

    Authorize.init({
        code: { type: DataTypes.STRING(64), primaryKey: true, unique: true },
        customer_id: { type: DataTypes.STRING(21), required: true },
        client_id: { type: DataTypes.STRING(32), required: true },
        exp: { type: DataTypes.BIGINT, required: true },
        iat: { type: DataTypes.BIGINT, required: true },
        isconsumed: { type: DataTypes.BOOLEAN, required: false, defaultValue: false },
        consume_date: { type: DataTypes.BIGINT, required: true },
        scope: { type: DataTypes.STRING(256), required: true },
        ...base
    }, {
        sequelize, modelName: 'authorize', tableName: 'authorize', timestamps: false,
        indexes: [
            { unique: false, fields: ['customer_id', 'client_id'] },
        ]
    });

    return { Client, Authorize }
}



