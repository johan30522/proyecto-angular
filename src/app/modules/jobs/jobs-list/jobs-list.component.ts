import { Component, OnInit } from '@angular/core';
import { Job } from '../../../shared/models/jobs.model';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobModalComponent } from '../job-modal/job-modal.component';

@Component({
  selector: 'reclutamiento-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
  public list:Job;

  constructor(
    private readonly jobsService:JobsService,
    private readonly toastr:ToastrService,
    private readonly modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.loadJobs();
  }
  private loadJobs(): void{
    this.jobsService.getJobs().subscribe(
      (result)=>{
        this.list=result;
      },
      (error)=>{
        this.toastr.error(error);
      }
    );
  }
  public deleteJob(job:Job):void{
    this.jobsService.deleteJob(job.id).subscribe(()=>{
      this.toastr.success('Job Deleted Successfully');
      this.loadJobs();
    })
  }
  public createJob():void{
    const modalRef = this.modalService.open(JobModalComponent, {
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.successfulTransaction.subscribe(() => {
      this.loadJobs();
    });
  }

}
