const productsModel = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        "products",
        {
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            p_name: {
                type: DataTypes.STRING(64),
                allowNull: false,
                defaultValue: "기본",
            },
            p_type: {
                type: DataTypes.STRING(32),
                allowNull: false,
            },
            p_img: {
                type: DataTypes.STRING(64),
                allowNull: false,
                defaultValue: "default",
            },
            p_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "products",
            timestamps: false,
            freezeTableName: true,
        }
    );
    return model;
};

module.exports = productsModel;
