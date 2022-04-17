import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Axe } from '../models/Axe';
import { Commune } from '../models/Communes';
import { MO } from '../models/MO';
import { Projet } from '../models/Projet';
import { Province } from '../models/Province';
import { Secteur } from '../models/Secteur';
import { Statut } from '../models/Statut';

@Injectable({
  providedIn: 'root'
})
export class PdiService {

  
  host= 'http://localhost:8081'
  constructor(private http: HttpClient) { }

  getResourceAll(resource: String):Observable<Province[]>{
    return this.http.get<Province[]>(`${this.host}/${resource}`);
}
  getResource(resource: String,page:number,size:number):Observable<Province[]>{
      return this.http.get<Province[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
  }

  getResourceMO(resource: String,page:number,size:number):Observable<MO[]>{
    return this.http.get<MO[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
}
getResourceProjet(resource: String,page:number,size:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
}
getResourceAxe(resource: String,page:number,size:number):Observable<Axe[]>{
  return this.http.get<Axe[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
}
getResourceStatut(resource: String,page:number,size:number):Observable<Statut[]>{
  return this.http.get<Statut[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
}
getResourceCommune(resource: String,page:number,size:number):Observable<Commune[]>{
  return this.http.get<Commune[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
}
getResourceSecteur(resource: String,page:number,size:number):Observable<Secteur[]>{
  return this.http.get<Secteur[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
}
getResourceCommuneAll(resource: String):Observable<Commune[]>{
  return this.http.get<Commune[]>(`${this.host}/${resource}`);
}
getResourceStatutAll(resource: String):Observable<Statut[]>{
  return this.http.get<Statut[]>(`${this.host}/${resource}`);
}
getResourceAxeAll(resource: String):Observable<Axe[]>{
  return this.http.get<Axe[]>(`${this.host}/${resource}`);
}
getResourceSecteurAll(resource: String):Observable<Secteur[]>{
  return this.http.get<Secteur[]>(`${this.host}/${resource}`);
}
getResourceMOAll(resource: String):Observable<MO[]>{
  return this.http.get<MO[]>(`${this.host}/${resource}`);
}
  addResource(resource: string,value:any):Observable<Province>{
    return this.http.post<Province>(`${this.host}/${resource}`,value);
}
addResourceMO(resource: string,value:any):Observable<MO>{
  return this.http.post<MO>(`${this.host}/${resource}`,value);
}
addResourceCommune(resource: string,value:any):Observable<Commune>{
  return this.http.post<Commune>(`${this.host}/${resource}`,value);
}
addResourceCommune2(resource: string,value:any):Observable<Commune>{
  return this.http.post<Commune>(`${this.host}/${resource}`,value);
}
addResourceStatut(resource: string,value:any):Observable<Statut>{
  return this.http.post<Statut>(`${this.host}/${resource}`,value);
}
addResourceSecteur(resource: string,value:any):Observable<Secteur>{
  return this.http.post<Secteur>(`${this.host}/${resource}`,value);
}
  getResourceByKeyword(resource: String,page:number,size:number,mc:string):Observable<Province[]>{
    return this.http.get<Province[]>(`${this.host}/${resource}/search/byProvincePage?mc=${mc}&page=${page}&size=${size}`);
}
getResourceByKeywordSecteur(resource: String,page:number,size:number,mc:string):Observable<Secteur[]>{
  return this.http.get<Secteur[]>(`${this.host}/${resource}/search/bySecteurPage?mc=${mc}&page=${page}&size=${size}`);
}
getResourceByKeywordMO(resource: String,page:number,size:number,mc:string):Observable<MO[]>{
  console.log(`${this.host}/${resource}/search/byMaitreOuvragePage?mc=${mc}&page=${page}&size=${size}`)
  return this.http.get<MO[]>(`${this.host}/${resource}/search/byMaitreOuvragePage?mc=${mc}&page=${page}&size=${size}`);
}
getResourceByKeywordProjet(resource: String,page:number,size:number,mc:string):Observable<Projet[]>{

  return this.http.get<Projet[]>(`${this.host}/${resource}/search/byProjetPage?mc=${mc}&page=${page}&size=${size}`);
}
getResourceByKeywordCommune(resource: String,page:number,size:number,mc:string):Observable<Commune[]>{
  return this.http.get<Commune[]>(`${this.host}/${resource}/search/byCommunePage?mc=${mc}&page=${page}&size=${size}`);
}
getResourceByKeywordAxe(resource: String,page:number,size:number,mc:string):Observable<Axe[]>{
  return this.http.get<Axe[]>(`${this.host}/${resource}/search/byAxePage?mc=${mc}&page=${page}&size=${size}`);
}
getResourceByKeywordStatut(resource: String,page:number,size:number,mc:string):Observable<Statut[]>{
  return this.http.get<Statut[]>(`${this.host}/${resource}/search/byStatutPage?mc=${mc}&page=${page}&size=${size}`);
}
deleteResource(resource:string,url:string){
 return this.http.delete(url);
}
getOneResource(url:string):Observable<Province>{
 return this.http.get<Province>(url)
}
getOneResourceById(resource:string,id:number):Observable<Province>{
  return this.http.get<Province>(`${this.host}/${resource}/${id}`)
 }

getOneResourceMO(url:string):Observable<MO>{
  return this.http.get<MO>(url)
 }
 getOneResourceCommune(url:string):Observable<Commune>{
  return this.http.get<Commune>(url)
 }
 getOneResourceStatut(url:string):Observable<Statut>{
  return this.http.get<Statut>(url)
 }
updateResource(url:string,data:any){
  console.log(url)
  return this.http.patch(url,data)
 }

}
