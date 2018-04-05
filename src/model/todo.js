module.exports = (sequelize, DataTypes) => {
    let Todo = sequelize.define('todo', {
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        done: {
            type: DataTypes.BOOLEAN,
            field: 'done',
            default: false
        },
        createdAt: {
            type: DataTypes.DATE
        },
        createdBy: {
            type: DataTypes.STRING
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        updatedBy: {
            type: DataTypes.STRING
        }
    },{
        tableName: 'todo'
    })
    return Todo
}