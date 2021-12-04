const db = {
    Users: [],
    Boards: [],
    Tasks: []
};

const getAllEntities = tableName => db[tableName];

const getEntity = (tableName, id) => {
    const entity = db[tableName].filter((item) => item.id === id);
    if (!entity.length) {
        throw new Error(`Entity ${id} was not found`);
    }
    return entity[0];
}

const addEntity = (tableName, entity) => {
    
    db[tableName].push(entity);

    return getEntity(tableName, entity.id);
}

const deleteEntity = (tableName, id) => {
    const index = db[tableName].findIndex((item) => item.id === id);
    if (index >= 0){
        db[tableName].splice(index, 1);
    };
    return true;
};

const updateEntity = (tableName, id, entity) => {
    const index = db[tableName].findIndex((item) => item.id === id);
    if (index >= 0){
        const updEntity = entity;
        updEntity.id = id;

        db[tableName][index] = updEntity;
    };

    return getEntity(tableName, id);
}

const deleteTasksByBoardId = (boardId) => {
    db.Tasks = db.Tasks.filter((item) => item.boardId !== boardId);
}

const unassignTasksUser = (userId) => {
    db.Tasks.forEach((item, index) => {
        if (item.userId === userId) {
            db.Tasks[index].userId = null;
        }
    });
}

module.exports = { addEntity, deleteEntity, deleteTasksByBoardId, getAllEntities, getEntity, updateEntity, unassignTasksUser }