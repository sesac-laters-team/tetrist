const usersModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "users",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING(64),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(64),
                allowNull: false,
                unique: true,
            },
            profile: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "/profile/default",
            },
            profileEdge: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "/profileEdge/default",
            },
            theme: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "#ffffff",
            },
            win: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            lose: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            access_penalty: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: "users",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = usersModel;
