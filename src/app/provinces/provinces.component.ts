import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Province } from '../models/Province';
import { PdiService } from '../services/pdi.service';
import { Route, Router } from '@angular/router'; 


@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.css']
})
export class ProvincesComponent implements OnInit {

 
  size:number = 4;
  currentPage:number = 0;
  totalPages: number;
  provinces :Province[]
  pages : Array<number>;
  currentKeyword: string = "";
  constructor(private pdiService:PdiService, private router: Router) { }

  ngOnInit(): void {
this.onGetProvinces()
  }

  ajouter(){
    this.router.navigateByUrl('/new-province');
  }
  
  onGetProvinces(){
    this.pdiService.getResource("provinces",this.currentPage,this.size).subscribe(data=>{
     this.provinces = data;
    this.totalPages = data['page'].totalPages
    this.pages = new Array<number>(this.totalPages);
    },err=>{
      console.log(err)
    })



  }
  onPageProvince(i:number){
    this.currentPage = i;
   this.chercherProvinces()
  }
  onChercher(form :any){
      this.currentPage = 0;
      this.currentKeyword = form.keyword;
      this.chercherProvinces()
  }

  chercherProvinces(){
  
    this.pdiService.getResourceByKeyword("provinces",this.currentPage,this.size,this.currentKeyword).subscribe(data=>{
      this.provinces = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  onEditProvince(p:Province){
    console.log(p)
      let url = p['_links'].self.href;
      this.router.navigateByUrl("/edit-province/"+btoa(url))
  }
  onDeleteProvince(url:string){
    if(confirm('Etes vous sur de vouloir supprimer cette province ?')){
    this.pdiService.deleteResource('provinces',url).subscribe(data=>{
      this.chercherProvinces();
      this.onGetProvinces()
    },err=>{
      console.log(err)
      if(err.status==409){
        alert('Province nest pas supprimée parce quelle est utilisé par autres communes');
      }
    })
    }
     
   
  }  

}
