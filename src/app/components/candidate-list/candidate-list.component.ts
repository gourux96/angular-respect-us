import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate.service';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
candidates?: Candidate[] ;
  currentCandidate?: Candidate;
  currentIndex = -1;
  fullName = '';

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.retrieveCandidates();
  }

  retrieveCandidates(): void {
    this.candidateService.getAll()
      .subscribe(
        data => {

          const a = JSON.parse(data)

          this.candidates = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveCandidates();
    this.currentCandidate = undefined;
    this.currentIndex = -1;
  }

  setActiveCandidate(candidate: Candidate, index: number): void {
    this.currentCandidate = candidate;
    this.currentIndex = index;
  }

  removeAllCandidates(): void {
    this.candidateService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchByName(): void {
    this.candidateService.findByName(this.fullName)
      .subscribe(
        data => {
          this.candidates = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
