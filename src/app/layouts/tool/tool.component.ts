import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {FormGroup, FormControl ,Validators} from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { SeotoolApiService } from 'src/app/services/seotool-api.service';

declare var $:any;

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  constructor(private service : SeotoolApiService, private route : ActivatedRoute ,private router: Router ) { }

  @ViewChild('namebutton',{read:ElementRef,static:false})namebutton:ElementRef;

  api_data:any;
  dashtop_api_data:any;
  somthing_search = false;
  url:any
  regexp:any
  url_error = false

  profileForm = new FormGroup({
    base_url: new FormControl('',Validators.required),
    protocol: new FormControl('https://',Validators.required)
  });

  userDetailsForm = new FormGroup({
    First_Name: new FormControl('',Validators.required),
    Last_Name: new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phone_no:new FormControl('',Validators.required),
    message:new FormControl('',Validators.required)
  })

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log(params);
      if (this.url !=  undefined) {
          this.profileForm.patchValue({base_url:this.url});
          console.log(this.profileForm);
         this.onSubmit();
      }

    })
  }

  changeSuit(e) {
    this.profileForm.get('protocol').setValue(e.target.value, {
       onlySelf: true
    })
  }

  is_url(str)
  {
    this.regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
          if (this.regexp.test(str))
          {
            return true;
          }
          else
          {
            return false;
          }
  }
  loading:any
  currentDate:any;

  onSubmit(){
      this.currentDate = new Date();

      var get_url = this.profileForm.value.base_url;
      var Protocol = get_url.split('//')[0];
      var noProtocol = get_url.split('//')[1];
      if (noProtocol == undefined) {
        this.url = this.profileForm.value.protocol+this.profileForm.value.base_url;
      }else{
        this.url = this.profileForm.value.base_url;
      }

      
      if (this.is_url(this.url) == false) {
        this.url_error = true;
        return;
      } else {
        this.url_error = false;
      }


      this.service.get_seo_data(this.url).subscribe(args => {

        console.log(args);

        this.api_data = args; 
        this.dashtop_api_data = args; 
        this.somthing_search=true;
        //$('#ajax_loader').hide();
        this.namebutton.nativeElement.classList.remove('page_speed_searching_home');

        this.show_data_function();

      })
  }

  modal_hide(){
    this.somthing_search = false;
  }

  bar_per= 0;
  persantage=0;
  persantage_var= '';
  data_title:any;
  data_desc:any;

  show_data_function(){
    console.log(this.api_data);
    var result = Object.keys(this.api_data).map(e=>this.api_data[e]);

    var total_lengeth=result.length;
    this.bar_per = 100/total_lengeth;


    result.forEach((item,i) => {

          setTimeout(() => {
            this.data_title=item.description;
          this.data_desc=item.analysis;

          this.persantage= this.bar_per+ this.persantage;

          this.persantage_var= this.persantage+'%';

          }, i * 8000);
    });
  }


  onSendDetails (){
    console.log(this.userDetailsForm);
    this.service.insert_user_details(this.userDetailsForm.value).subscribe(return_data=>{
      console.log(return_data);

      if (return_data.status == 'success') {
        alert('Inserted Successfully');
      } else {
        alert('Have some error');
      }
      this.somthing_search = false;
      this.userDetailsForm.reset();
    })
  }


}
