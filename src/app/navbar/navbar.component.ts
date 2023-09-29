import { Component, OnInit } from '@angular/core';
import { RegisterationService } from 'src/services/registration.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private login: RegisterationService) {
  }
  logout() {
    this.login.signOut();
  }
  ngOnInit(): void {
  }

}
