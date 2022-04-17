import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commune } from '../models/Communes';
import { Province } from '../models/Province';
import { PdiService } from '../services/pdi.service';

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.css']
})
export class CommunesComponent implements OnInit {

  size:number = 4;
  currentPage:number = 0;
  totalPages: number;
  communes :Commune[]
  provinces: Province[]
  pages : Array<number>;
  selectedProvince: Province
  d="eee"
  currentKeyword: string = "";
  selected: boolean
  constructor(private pdiService:PdiService, private router: Router) { }

  ngOnInit(): void {
    this.onGetProvinces()
this.onGetCommunes()

  }
  onRowClick(){
    this.pdiService.getResourceCommuneAll("provinces/"+this.selectedProvince+"/communes").subscribe(data=>{
      this.communes = data;
      this.selected = true
     console.log(data) 
    })
  }

  ajouter(){
    this.router.navigateByUrl('/new-commune');
  }
  onGetCommunes(){
    this.pdiService.getResourceCommune("communes",this.currentPage,this.size).subscribe(data=>{
      console.log(data,"******************")
     
     this.communes = data;
    this.totalPages = data['page'].totalPages
    this.pages = new Array<number>(this.totalPages);
    console.log(this.pages)
    },err=>{
      console.log(err)
    })

  }
  onGetProvinces(){
    this.pdiService.getResourceAll("provinces").subscribe(data=>{
     this.provinces = data;
     console.log(data)
    this.totalPages = data['page'].totalPages
    this.pages = new Array<number>(this.totalPages);
    },err=>{
      console.log(err)
    })

  }
  onPageCommune(i:number){
    this.currentPage = i;
   this.chercherCommunes()
  }
  onChercher(form :any){
      this.currentPage = 0;
      this.currentKeyword = form.keyword;
      console.log("chrcher")
      this.selected = false
      this.chercherCommunes()
  }

  chercherCommunes(){
  
    this.pdiService.getResourceByKeywordCommune("communes",this.currentPage,this.size,this.currentKeyword).subscribe(data=>{
      this.communes = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  onEditCommune(p:Commune){
    console.log(p)
      let url = p['_links'].self.href;
      this.router.navigateByUrl("/edit-commune/"+btoa(url))
  }
  onDeleteCommune(url:string){
    if(confirm('Etes vous sur de vouloir supprimer cette commune ?')){
    this.pdiService.deleteResource('communes',url).subscribe(data=>{
      this.chercherCommunes();
    },err=>{
      console.log(err)
    })
    }
     
   
  }  


}
