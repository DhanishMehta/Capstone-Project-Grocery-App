import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-bread-crumb-area',
  templateUrl: './bread-crumb-area.component.html',
  styleUrls: ['./bread-crumb-area.component.scss'],
})
export class BreadCrumbAreaComponent implements OnInit {
  @Input() activePage = '';
  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit(): void {
    // this.getPage();
  }

  getPage() {
    let path = window.location.pathname.slice(1);
    path = path.toLowerCase();
    path = path.slice(1).toUpperCase + path.slice(1);
    this.activePage = path;
  }
}
