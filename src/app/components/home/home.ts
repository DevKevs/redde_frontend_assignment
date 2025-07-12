import { Component } from '@angular/core';
import { Footer } from "../../utils/footer/footer";
import { Navbar } from "../../utils/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [Footer, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
