import { Component, OnInit } from "@angular/core";
import { APIService } from "./API.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  todos: Array<any>;

  title = "myAmplifyProject";
  constructor(private apiService: APIService) {}

  createTodo(name, description) {
    this.apiService.CreateTodo({
      name: name,
      description: description
    });
  }

  async ngOnInit() {
    this.apiService.ListTodos().then(evt => {
      this.todos = evt.items;
    });

    this.apiService.OnCreateTodoListener.subscribe(evt => {
      const data = (evt as any).value.data.onCreateTodo;
      this.todos = [...this.todos, data];
    });
  }
}
