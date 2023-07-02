import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todos.service';
import { CreateTodo } from './dto/create.todo.dto';
import { UpdateTodo } from './dto/update.todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    getAllTodos() {
        return this.todoService.findAll()
    }
    @Get(':id')
    getOneTodos(@Param('id') id: string) {
        return this.todoService.findOne(id)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-Type', 'application/json')
    createTodo(@Body() createTodo: CreateTodo) {
        return this.todoService.create(createTodo)
    }

    @Patch(':id')
    updateTodo(@Body() updateTodo: UpdateTodo, @Param('id') id: string) {
        return this.todoService.update(id, updateTodo)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(id)
    }
}
