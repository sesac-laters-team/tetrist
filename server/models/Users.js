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
            // 유저가 구매해서 설정한 커스텀들 중 선택한 커스텀
            // ex) '{"profile": 1, "theme": 1}'
            custom: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            // true:온라인, false:오프라인
            connecting: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            chat_penalty: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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