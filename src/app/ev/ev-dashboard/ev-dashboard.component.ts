import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-ev-dashboard',
  templateUrl: './ev-dashboard.component.html',
  styleUrls: ['./ev-dashboard.component.css']
})
export class evDashboardComponent implements OnInit {
  // Chart Options and Data
  makesModelsChartOptions: any;
  yearlyAdoptionChartOptions: any;
  electricRangeChartOptions: any;
  electricRangeVsYearChartOptions: any;

  makesModelsChartData: any[] = [];
  yearlyAdoptionChartData: any[] = [];
  electricRangeChartData: any[] = [];
  electricRangeVsYearChartData: any[] = [];

  // Categories
  makesModelsCategories: string[] = [];
  sortedYears: string[] = [];
  
  // Range Distribution Data
  rangeDistribution: { [key: string]: number } = {
    '0-100 miles': 0,
    '101-200 miles': 0,
    '201-300 miles': 0,
    '301+ miles': 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initializeChartOptions(); // Initialize options before data fetching
    this.fetchCSV();
  }

  fetchCSV(): void {
    const fileUrl = 'assets/Electric_Vehicle_Population_Data.csv'; // Path to your CSV
    this.http.get(fileUrl, { responseType: 'text' }).subscribe({
      next: (data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            this.processData(result.data);
          },
          error: (err: any) => console.error('Error parsing CSV:', err),
        });
      },
      error: (err) => console.error('Error fetching CSV:', err),
    });
  }

  processData(data: any[]): void {
    if (!data || !Array.isArray(data)) {
      console.error('Invalid or empty data received');
      return;
    }
  
    const makeModelCount: { [key: string]: number } = {};
    const yearlyCount: { [key: string]: number } = {}; // Ensure it's initialized as an object
    const electricRangeVsYear: { x: string; y: number }[] = [];
  
    // Process the data to populate the required charts
    data.forEach((item) => {
      const makeModel = `${item.Make} ${item.Model}`;
      const electricRange = parseInt(item['Electric Range'], 10) || 0;
      const year = item['Model Year'] || 'Unknown';
  
      // Update Make/Model Counts
      makeModelCount[makeModel] = (makeModelCount[makeModel] || 0) + 1;
  
      // Update Yearly Counts
      yearlyCount[year] = (yearlyCount[year] || 0) + 1;
  
      // Range Distribution
      if (electricRange <= 100) this.rangeDistribution['0-100 miles']++;
      else if (electricRange <= 200) this.rangeDistribution['101-200 miles']++;
      else if (electricRange <= 300) this.rangeDistribution['201-300 miles']++;
      else this.rangeDistribution['301+ miles']++;
  
      // Electric Range vs Year
      if (year !== 'Unknown' && electricRange > 0) {
        electricRangeVsYear.push({ x: year, y: electricRange });
      }
    });
  
    // Sort and Assign Chart Data
    this.makesModelsCategories = Object.keys(makeModelCount).slice(0, 10); // Top 10 categories
    this.makesModelsChartData = [
      { name: 'Vehicle Count', data: Object.values(makeModelCount).slice(0, 10) }
    ];
  
    this.sortedYears = Object.keys(yearlyCount).sort();
    this.yearlyAdoptionChartData = [
      { name: 'Adoption Trend', data: this.sortedYears.map((year) => yearlyCount[year] || 0) }
    ];
  
    this.electricRangeChartData = [
      { name: 'Range Distribution', data: Object.values(this.rangeDistribution) }
    ];
  
    this.electricRangeVsYearChartData = electricRangeVsYear; // Scatter plot data
  
    // Now, call initializeChartOptions again to update the chart with new data
    this.initializeChartOptions();
  }
  

  initializeChartOptions(): void {
    // Initialize options for each chart

    this.makesModelsChartOptions = {
      chart: { type: 'bar', height: 350 },
      title: { text: 'Top 10 EV Makes and Models', align: 'center' },
      xaxis: {
        categories: this.makesModelsCategories, // Ensure categories are populated with valid makes/models
        labels: { style: { fontSize: '12px' } },
      },
      yaxis: { labels: { style: { fontSize: '12px' } } },
      legend: { position: 'top', labels: { fontSize: '12px' } }
    };

    this.yearlyAdoptionChartOptions = {
      chart: { type: 'line', height: 350 },
      title: { text: 'EV Adoption Trend Over Years', align: 'center' },
      xaxis: {
        categories: this.sortedYears, // Ensure categories are populated with valid years
      },
      yaxis: {
        labels: { style: { fontSize: '12px' } },
      },
      legend: { position: 'top', labels: { fontSize: '12px' } }
    };

    // Electric Range Distribution as a Donut Chart
    this.electricRangeChartOptions = {
      chart: { type: 'donut', height: 350 },
      title: { text: 'Electric Range Distribution', align: 'center' },
      labels: ['0-100 miles', '101-200 miles', '201-300 miles', '301+ miles'],
      series: Object.values(this.rangeDistribution), // This binds the distribution values to the donut chart
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: { fontSize: '12px' },
      },
    };

    // Electric Range vs Model Year as a Line Chart
    this.electricRangeVsYearChartOptions = {
      chart: { type: 'line', height: 350 },
      title: { text: 'Electric Range vs Model Year', align: 'center' },
      xaxis: {
        categories: this.sortedYears,  // Ensure categories are populated with valid years
        labels: { style: { fontSize: '12px' } },
      },
      yaxis: {
        title: { text: 'Electric Range (miles)' },
        labels: { style: { fontSize: '12px' } },
      },
      series: [
        {
          name: 'Electric Range',
          data: this.electricRangeVsYearChartData,
        },
      ],
      markers: {
        size: 5,
        colors: ['#FF4560'],
        strokeColor: '#fff',
        strokeWidth: 2,
      },
      legend: {
        position: 'top',
        labels: { fontSize: '12px' },
      },
    };
  }
}
