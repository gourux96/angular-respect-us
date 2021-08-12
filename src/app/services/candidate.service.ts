import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';

const baseUrl = 'https://z488n85ffd.execute-api.eu-west-3.amazonaws.com/prod/candidates';
const baseUrl2 = 'https://z488n85ffd.execute-api.eu-west-3.amazonaws.com/Stage/candidates/getAll';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'text/plain',
    "Access-Control-Allow-Origin": "*",

  })
};

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl2);
  }

  get(id: any): Observable<Candidate> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    console.log(data)
    return this.http.post(baseUrl, data,httpOptions);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(fullName: any): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${baseUrl}?fullName=${fullName}`);
  }
}
