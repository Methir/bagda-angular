import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ReportService } from '../report.service';
import { ReportModalComponent } from '../report-modal/report-modal.component';

@Component({
  selector: 'eth-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public _reports: any[] = [];
  
  @Input() ofRpg: number = null;
  @Input() pageSize: number = 5;
  @Input() page: number = 1;

  private reportSubscription: Subscription;

  constructor(private reportService: ReportService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reportSubscription = this.reportService.reports(this.ofRpg).subscribe(
      (response: any) => {
        this.reports = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  set reports(reports: any[]) {
    this._reports = reports;
  }

  get reports() {
    return this._reports.slice((this.page-1)*this.pageSize, (this.page)*this.pageSize);
  }

  open(report) {
    console.log(report);
    const modalRef = this.modalService.open(
      ReportModalComponent, {
        size: 'lg',
        centered: true
      }
    );
    modalRef.componentInstance.report = report;
  }

  ngOnDestroy(): void {
    this.reportSubscription.unsubscribe();
  }

}
