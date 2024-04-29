const roomsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "rooms",
        {
            room_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            r_name: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            r_password: {
                type: DataTypes.STRING(64),
                allowNull: true,
            },
            r_status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: "rooms",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = roomsModel;
