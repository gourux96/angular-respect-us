import { Component, OnInit } from '@angular/core';

import { Candidate } from 'src/app/models/candidate.model';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {
  candidate: Candidate = {
    fullName: '',
    score: ''
  };
  submitted = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
  }

  saveCandidate(): void {
    const data = {
      fullName: this.candidate.fullName,
      score: this.candidate.score,
    };

    this.candidateService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newCandidate(): void {
    this.submitted = false;
    this.candidate = {
      fullName: '',
      score: ''
    };
  }

}
