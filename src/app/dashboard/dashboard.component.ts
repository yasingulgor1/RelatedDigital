import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { UserService } from '../user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  myList: any[] = [];
  page = 1;
  pageSize = 10;

  constructor(private http: HttpClient, private userService: UserService, private toDoService: ToDoService, private modalService: BsModalService) {
    this.toDoService.getAllData().subscribe(todos => {
      this.userService.getAllData().subscribe(users => {

        todos.forEach(todo => {
          users.forEach(user => {
            if (todo["userId"] == user["id"]) {
              todo.Assignee = user["name"];
              this.myList.push(todo);
            }
          })
        });

        console.log("List : " + JSON.stringify(this.myList));


      });
    });
  }

  ngOnInit(): void {
  }



  counter = 0;
  sortArray() {
    this.counter++;
    if (this.counter % 2 == 0) {
      this.myList.sort((a, b) => a.completed < b.completed ? -1 : 0);
    }
    else {
      this.myList.sort((a, b) => a.completed > b.completed ? -1 : 0);
    }
  }


  modalRef: any;
  fillTitle: string = "";
  editId: number = -1;
  editIndex : number = -1;
  openModal(template: TemplateRef<any>, editIndex: number) {
    this.fillTitle = this.myList[editIndex].title;
    this.editIndex = editIndex;
    this.editId = this.myList[editIndex].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  updateTitle(value: any) {
    if (this.editId != -1) {
      this.toDoService.updateData(this.editId,value.title).subscribe(result => {
        this.myList[this.editIndex].title = value.title;
        this.editId = -1;
        this.editIndex = -1;
        this.fillTitle = "";
        this.modalRef.hide();
      });
    };
  }

  closeModal() {
    this.editId = -1;
    this.editIndex = -1;
    this.fillTitle = "";
    this.modalRef.hide();
  }



  deleteData(id: number, i: number) {

    this.toDoService.deleteData(id).subscribe(result => {
      this.myList.splice(i, 1);
      console.log(result);
    });

  }


}
