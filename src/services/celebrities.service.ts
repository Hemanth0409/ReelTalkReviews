import { Injectable } from '@angular/core';
import { FilmIndustryMembers } from 'src/models/filmIndustryMembers'
import { environment } from 'src/environment/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CelebritiesService {
  celebritiesListUrl = environment.getFilmIndustryMembers;
  postCelebritiesUrl = environment.postFilmIndustryMembers;
  constructor(private http: HttpClient) { }

  getFilmIndustyMembers() {
    return this.http.get<FilmIndustryMembers[]>(this.celebritiesListUrl);
  }
  postMemberDetail(form: string) {
   return this.http.post<FilmIndustryMembers>(this.postCelebritiesUrl, form);
  }
}

