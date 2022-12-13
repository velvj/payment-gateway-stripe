module.exports=(sequelize,DataTypes)=>{
    const orders = sequelize.define('orders',{
        customerID:{
            type: DataTypes.STRING
        },
        stripeID:{
            type: DataTypes.STRING
        }},{
            freezeTableName:true,
            timestamps:true
        })
        return orders;
}