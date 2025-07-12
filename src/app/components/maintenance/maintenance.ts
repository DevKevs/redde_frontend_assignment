import { Component } from '@angular/core';
import { Navbar } from "../../utils/navbar/navbar";
import { Footer } from "../../utils/footer/footer";

@Component({
  selector: 'app-maintenance',
  imports: [Navbar, Footer],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css'
})
export class Maintenance {

}
