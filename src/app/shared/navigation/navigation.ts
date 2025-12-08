import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faGear, faWarehouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'konbini-navigation',
  imports: [TranslatePipe, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  icons = {
    warehouse: faWarehouse,
    settings: faGear,
  };
}
