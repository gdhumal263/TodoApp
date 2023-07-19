export default class Todo {
    constructor(id, description, targetDate, isDone, userId) {
        this.userId = userId
        this.description = description
        this.targetDate = targetDate
        this.isDone = isDone
        this.id = id;
    }
}
