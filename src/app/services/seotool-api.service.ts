import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeotoolApiService {

  constructor(private http : HttpClient) { }

  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  requestOption:any = {headers:this.headers};

  url = 'https://graylinemedia.com/seo_analyzer/analyze_url_with_keyword.php';
  crm_url = 'https://theprajinshee.com/glm_crm/api/insert_lead_data';

  get_seo_data (site_url){
    var slug_url = site_url;

    return this.http.post<any>(this.url,{slug_url:slug_url,slug_name:'retirementtaxservices'},{'headers':this.headers});
  }

  insert_user_details(data){
    return this.http.post<any>(this.crm_url,data)
  }


}
