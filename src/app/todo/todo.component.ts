import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  complete: Tasks[] = [];
  inProgress: Tasks[] = [];
  todo: Tasks[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      addTask: ['', Validators.required],
    });
  }

  drop(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // ------- add --------
  addTask() {
    this.todo.push({
      description: this.todoForm.value.addTask,
      done: false,
    });
    this.todoForm.reset();
  }

  // -------- delete -------
  deleteTask(i: number) {
    this.todo.splice(i, 1);
  }
  deleteFromInProgress(i: number) {
    this.inProgress.splice(i, 1);
  }
  deleteFromDone(i: number) {
    this.complete.splice(i, 1);
  }

  // ------- update --------
  isUpdated: boolean = false;
  updateIndex: any;

  onEdit(item: Tasks, i: number) {
    this.todoForm.controls['addTask'].setValue(item.description);
    this.updateIndex = i;
    this.isUpdated = true;
  }

  updateTask() {
    this.todo[this.updateIndex].description = this.todoForm.value.addTask;
    this.todo[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isUpdated = false;
  }
}
