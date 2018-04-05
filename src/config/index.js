const Sequelize = require('sequelize')
module.exports = {
    sequelize: new Sequelize('mysql://root:password@127.0.0.1:3306/todo', {
        timezone: '+07:00'
    }),
    transactionOptions: {
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        autocommit: false
    }
}