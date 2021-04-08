import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { QcItem } from '../classes/qc-item';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  status_list: QcItem
  header: any;
  sorting: string;
  group: string = "";
  input_data = {
    'sorting':'',
    'group':'',
  };
  constructor(private data: DataService) { setInterval(()=> {this.update_table()},5000) }
  home_route: any = 'http://10.10.4.61:8083/status';
  route: any;
  ngOnInit(): void {
    this.sorting = "sequence";
    this.group = "ongoing";
    this.update_table();
  }
  update_table(){
    // this.part_parameter = 'part_number';
    console.log("Calling getAllData")
    // this.sorting = sorting;
    // this.grouping = grouping;
    this.input_data['sorting']=this.sorting;
    this.input_data['group']=this.group;
    this.data.getData(this.home_route,"",this.input_data)
    .subscribe(data=> 
      {
        this.status_list=data;
        console.log(this.status_list);
      }
    )
  }
  getColor(status){
    switch(status){
      case 'In progress':
        return '#0399C1';
      case 'Completed':
        return 'green';
      case "Not complete":
        return "red";
      case "Requested":
        return "grey";
      default:
        return "black";
    }
  }

  sort_by_seq_num(){
    this.sorting = "sequence";
    console.log("Sorting by sequence number");
    this.update_table();
  }
  sort_by_priority(){
    this.sorting = "priority";
    console.log("Sorting by priority");
    this.update_table();
  }
  sort_by_status(){
    this.sorting = "final_stat";
    console.log("Sorting by status");
    this.update_table();
  }
  grouping(group_param){
    switch(group_param){
      case 'complete':
        console.log("Complete grouping")
        this.group = "completed";
        this.update_table();
        break;
      case 'pending':
        console.log("Pending grouping")
        this.group = "pending";
        this.update_table();
        break;
      case 'all':
        console.log("All grouping")
        this.group = "all";
        this.update_table();
        break;
      case 'ongoing':
        console.log("Ongoing grouping")
        this.group = "ongoing";
        this.update_table();
        break;
      default:
        console.log("Default grouping")
        this.group = "ongoing";
        this.update_table();
        break;
    }
  }

}
