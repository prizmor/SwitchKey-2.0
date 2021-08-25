import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-void',
  templateUrl: './void.component.html',
  styleUrls: ['./void.component.scss']
})
export class VoidComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
