import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImageDetailList();
  }
  showCategory() {
    this.router.navigate(['categories'], {relativeTo: this.route})
  }
  showProductList() {
    this.router.navigate(['product-list'], {relativeTo: this.route})
  }
  addProduct() {
    this.router.navigate(['add-product'], {relativeTo: this.route})
  }
  parameters() {
    this.router.navigate(['parameters'], {relativeTo: this.route})

  }
  media() {
    this.router.navigate(['media'], {relativeTo: this.route})

  }
}
