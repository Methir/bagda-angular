import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { Rpg, Item, Shop } from '../../shared/interfaces';
import { RpgService } from '../../rpg/rpg.service';
import { HelperService } from '../../shared/helper.service';
  
/*@Component({
  selector: 'eth-item-control',
  templateUrl: './item-control.component.html',
  styleUrls: ['./item-control.component.css']
})*/
export class ItemControlComponent implements OnInit {

  public rpg: Rpg; 
  public shopId: number;
  public rpgId: number; 
  public filter: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'gold_price', 'cash_price', 'require_test', 'max_units', 'action'];
  dataSource;

  private rpgInPainelSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private rpgService: RpgService,
              public helperService: HelperService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rpgInPainelSubscription = this.rpgService.seeRpgInPainel
    .subscribe((rpg: Rpg) => {
      this.rpg = rpg;
      this.dataSourceSync();
    });

    this.routeSubscription = this.route.params
    .subscribe((params: any) => this.rpgId = params['idRpg']);
  }

  applyFilter(filterValue: string) {
    this.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filter;
  }

  dataSourceSync() {
    this.dataSource = new MatTableDataSource<Item>(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filter;
  }

  get items() {
    if (this.rpg && this.rpg.shops && this.rpg.shops[0]) {
      if (!this.shopId) {
        this.shopId = this.rpg.shops[0].id;
      } 
      return this.rpg.shops.find((shop: Shop) => this.shopId === shop.id).items;
    } else {
      return [];
    }
  }

  onDelete() {
    this.rpgService.rpg(this.rpgId);
  }

  ngOnDestroy(): void {
    this.rpgInPainelSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

}
