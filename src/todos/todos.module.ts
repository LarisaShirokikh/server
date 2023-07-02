import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodoService } from './todos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './models/todo.model';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodoService]
})
export class TodosModule {}
