import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Services/patient.service';
import { patientCountByClinic } from '../Interface/patientsCountByClinic';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  patientCount: patientCountByClinic[] = [];
  totalPatientsCount: number = 0;
  previousClinicVisits: patientCountByClinic[] = [];
  maxValue: number = 0;
  lastWeekVisits:number=0;
  lastMonthVisits:number=0;
  fromDate:string="";
  toDate:string="";
  barChartHeading:string="Last 7 days visits history";

  todayDate:string = new Date().toISOString().split('T')[0];

  // Data for the pie chart
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];

  //Data for bar chart
  barChartLabels: string[] = [];
  barChartData: number[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
    this.getPreviuosVisits(1);
    this.getLastMonthVisits();
    this.getLast7DaysVisits();
  }

  async getPatients() {
    this.patientService.getPatientsByClinicwise().subscribe(data => {
      this.patientCount = data;

      this.pieChartLabels = this.patientCount.map(data => data.clinicName);
      this.pieChartData = this.patientCount.map(data => data.patientCount);

      console.log(data);

      this.totalPatientsCount = this.patientCount.reduce((acc, current) => {
        return acc + current.patientCount;
      }, 0)
      this.RenderCharts();

    }, error => {
      console.log("Error occured when fetching data", error);
    });
  }

  //getting last 7 days visits
  async getLast7DaysVisits(){
    this.patientService.getPreviousVisits(1).subscribe(data=>{
      this.lastWeekVisits = data.reduce((acc,current)=>{
          return acc+current.patientCount;
      },0)
    })
  }

  //getting last month visits
  async getLastMonthVisits(){
    this.patientService.getPreviousVisits(2).subscribe(data=>{
      this.lastMonthVisits = data.reduce((acc,current)=>{
          return acc+current.patientCount;
      },0)
    })
  }

  async getPreviuosVisits(range: number,startDate?:string,endDate?:string) {
    this.patientService.getPreviousVisits(range).subscribe(data => {
      this.previousClinicVisits = data;
      console.log(data);

      this.barChartLabels = this.previousClinicVisits.map(data => data.clinicName);
      this.barChartData = this.previousClinicVisits.map(data => data.patientCount);

      console.log(this.barChartLabels);

      this.maxValue = Math.max(...this.barChartData) + 1;

      this.RenderBarCharts();
    })
  }



  lastseven(){
    this.barChartHeading="Last 7 days visits history";
    this.getPreviuosVisits(1);
  }

  lastmonth(){
    this.barChartHeading="Last 1 month visits history";
    this.getPreviuosVisits(2);
  }

  last3month(){
    this.barChartHeading="Last 3 month visits history";
    this.getPreviuosVisits(3);
  }

  customDate(){
    if(this.fromDate.length>0&&this.toDate.length>0){
      this.getPreviuosVisits(4,this.fromDate,this.toDate);
    }
  }

  RenderCharts() {
    const myChart = new Chart("pie-chart", {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [{
          data: this.pieChartData,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40',
            '#9966FF', '#FF66B2', '#FF9933', '#66FF66'
          ],
          hoverBackgroundColor: [
            '#FF2A3D', '#2C88D5', '#FFB931', '#29B0B6', '#FF6726',
            '#6A3DFF', '#FF3377', '#FF6600', '#33CC33'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value, context) => {
              const data = context?.chart?.data?.datasets?.[0]?.data;

              if (Array.isArray(data)) {
                const numericData = data.filter((item): item is number => typeof item === 'number');
                const total = numericData.reduce((a, b) => a + b, 0);

                if (total > 0) {
                  const percentage = ((value / total) * 100).toFixed(2) + "%";
                  return percentage;
                }
              }

              return null;
            },
            color: '#fff',
            font: {
              weight: 'bold'
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' patients';
              }
            }
          }
        }
      }
    },
    )
  }

  RenderBarCharts() {
    const myChart = new Chart("bar-chart", {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: [{
          label: this.barChartHeading,
          data: this.barChartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',  // Red
            'rgba(255, 159, 64, 0.5)',   // Orange
            'rgba(255, 205, 86, 0.5)',   // Yellow
            'rgba(75, 192, 192, 0.5)',   // Teal
            'rgba(54, 162, 235, 0.5)',   // Blue
            'rgba(153, 102, 255, 0.5)',  // Purple
            'rgba(201, 203, 207, 0.5)',  // Gray
            'rgba(255, 99, 71, 0.5)',    // Tomato
            'rgba(123, 104, 238, 0.5)'   // Medium Slate Blue
        ],
        borderColor: [
            '#4e73df', // Blue
            '#1cc88a', // Green
            '#36b9cc', // Light Blue
            '#ff5733', // Red
            '#ff8c00', // Orange
            '#9b59b6', // Purple
            '#2c3e50', // Dark Blue
            '#e74c3c', // Light Red
            '#f39c12'  // Yellow
        ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            // Y-axis (patient count)
            beginAtZero: true,  // Start the y-axis from 0
            max: this.maxValue  // Set the maximum value for the y-axis
          }
        }
      }
    });
  }
}
