import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';
import { CreateTodo } from './dto/create.todo.dto';
import { UpdateTodo } from './dto/update.todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo) private todosModel: typeof Todo
    ) { }

    async findAll(): Promise<Todo[]> {
        return this.todosModel.findAll()
    }
    findOne(id: string): Promise<Todo> {
        return this.todosModel.findOne({ where: { id } })
    }

    create(createTodo: CreateTodo): Promise<Todo> {
        const todo = new Todo()
        todo.title = createTodo.title
        todo.done = createTodo.done
        return todo.save()
    }

    update(id: string, updateTodo: UpdateTodo): Promise<[affectedCount: number, affectedRows: Todo[]]> {
        return this.todosModel.update({ ...updateTodo }, { where: { id }, returning: true })
    }

    async remove(id: string): Promise<void> {
        const todo = await this.findOne(id);
        await todo.destroy()
    }
}
