import { Component, OnInit } from '@angular/core';
import CardService from '../../domains/card/card.service';
import StatusService from '../../domains/status/status.service';
import Status from '../../domains/status/model/Status';
import Card from '../../domains/card/model/Card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cards: Array<Card> = [];
  status: Array<Status> = [];
  namingNewTask = false;
  namingNewStatus = false;

  creatingNewTaskName = '';
  creatingNewStatusName = '';

  constructor(
    private taskService: CardService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  loadStatus(): void {
    this.statusService.getAll().subscribe({
      next: (res) => {
        this.status = res;
      },
    });
  }

  handleClickNewTaskButton(): void {
    this.namingNewTask = true;
    const newTaskEventCbReference = (event: KeyboardEvent): void => {
      if (event.key == 'Enter') {
        this.namingNewTask = false;
        if (this.creatingNewTaskName.length > 0) {
          this.createTask(this.creatingNewTaskName);
        }
      } else if (event.key == 'Escape') {
        this.namingNewTask = false;
        window.removeEventListener('keydown', newTaskEventCbReference);
      }
    };
    window.addEventListener('keydown', newTaskEventCbReference);
  }

  handleClickNewStatusButton(): void {
    this.namingNewStatus = true;
    const newStatusEventCbReference = (event: KeyboardEvent): void => {
      if (event.key == 'Enter') {
        this.namingNewStatus = false;
        this.createStatus(this.creatingNewStatusName);
        if (this.creatingNewStatusName.length > 0) {
        }
      } else if (event.key == 'Escape') {
        this.namingNewStatus = false;
        window.removeEventListener('keydown', newStatusEventCbReference);
      }
    };
    window.addEventListener('keydown', newStatusEventCbReference);
  }

  createTask(name: string): void {
    this.taskService.create(name).subscribe({
      next: () => {
        //this.loadCards();
      },
    });
  }

  createStatus(name: string): void {
    this.statusService.create(name).subscribe({
      next: () => {
        this.loadStatus();
      },
    });
  }
}
