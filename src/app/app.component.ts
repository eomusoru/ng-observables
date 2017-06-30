import { UsersService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  active1User = false;
  active2User = false; 

  constructor (private usersService: UsersService) {}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class

    this.usersService.userActivated.subscribe(
      (id: number) => {
        if (id === 1) { this.active1User = true; }
        else if (id === 2) { this.active2User = true; }
      }
    );
  }
}