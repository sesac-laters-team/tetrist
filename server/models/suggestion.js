const suggestionsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "suggestions",
        {
            sug_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            sug_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sug_content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            sug_checked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: "suggestions",
            timestamps: true,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = suggestionsModel;
