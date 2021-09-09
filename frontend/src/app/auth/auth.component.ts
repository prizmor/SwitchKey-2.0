import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
const { version, author } = require('../../assets/config');

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  version = version;
  author = author;

  constructor( public router: Router, public activatedRoute: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
