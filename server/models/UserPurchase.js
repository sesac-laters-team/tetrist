const userPurchaseModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "user_purchase",
        {
            purchase_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            // 연결 테이블, user_id와 product_id는 index에서 관계 설정
        },
        {
            tableName: "user_purchase",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = userPurchaseModel;
