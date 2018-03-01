import { Component, OnInit } from '@angular/core';

import { ToastrService } from './../../layout/toastr.service';
import { AuthService } from './../../shared/auth/auth.service';

@Component({
  selector: 'ho-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }
}
