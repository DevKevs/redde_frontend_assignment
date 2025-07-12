import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isDarkMode: boolean;
  regexPattern = new RegExp("true");

  constructor(){
    const page_appearance = localStorage.getItem('isDarkMode');
    if (page_appearance != undefined) {
      this.isDarkMode = this.regexPattern.test(page_appearance)
      return;
    }
    this.isDarkMode = false;
  }

  setPageAppearance(){
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', `${ this.isDarkMode }`)
  }
}
