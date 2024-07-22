import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quest-path',
  templateUrl: './quest-path.component.html',
  styleUrl: './quest-path.component.css'
})
export class QuestPathComponent implements OnInit {
  left: String = "left";
  straight: String = "straight";
  right: String = "right";

  location: String = "";
  pathImage: String = "";

  constructor(private router: Router, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.location = params['location'];

      if(this.location === "forest"){
        this.pathImage = "../../../assets/images/forest.jpg";
      } else if (this.location === "dungeon"){
        this.pathImage = "../../../assets/images/door.png";
      }
    })
  }

}
