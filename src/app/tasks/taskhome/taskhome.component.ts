import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/manager/user';
import { TaskService } from 'src/app/task.service';
import { ITypePercentage } from '../add/task.interface';


@Component({
  selector: 'app-taskhome',
  templateUrl: './taskhome.component.html',
  styleUrls: ['./taskhome.component.css']
})
export class TaskhomeComponent implements OnInit {

  key: string;
  @Output() msgToSibling = new EventEmitter<any>();
 

  public doughnutChartOptions?: ChartOptions= {
    responsive: true,
    legend: {
      display: false,
    },
    cutoutPercentage: 80,
  };
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColor: Color[] = [
    { backgroundColor: ['#071f33', '#1EFFC1', '#0079D3'] },
  ];
  public typeData: Array<ITypePercentage> = [];
  constructor(private taskService: TaskService, private data:DataService) {}

  ngOnInit(): void {
    this.data.getMessage().subscribe(message => {
      this.key = message;
      this.getTypePercentage();
    });
    
   
  }


  updateKey() {
    this.data.updateMessage(this.key);
  }


  msgToSib(){
    this.msgToSibling.emit(this.key);
  }

  getTypePercentage() {
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    if(!this.key){

    
    this.taskService.getTypePercentage().subscribe(
      (d) => {
        this.typeData = d;
        d.forEach((type: ITypePercentage) => {
          this.doughnutChartData.push(type.count);
          this.doughnutChartLabels.push(type.type);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }else{
    this.taskService.getTypePercentageByUsername(this.key).subscribe(
      (d) => {
        this.typeData = d;
        d.forEach((type: ITypePercentage) => {
          this.doughnutChartData.push(type.count);
          this.doughnutChartLabels.push(type.type);
        });
      },
      (error) => {
        console.error(error);
      }
    );

  }
  }
  refreshEmitter() {
    this.getTypePercentage();
  }
}