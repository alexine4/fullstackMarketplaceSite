import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MaterialService } from '../../classes/material.service'

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('actionBtn') actionBtnEl: ElementRef | any

  links = [
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Cart' },
    { url: '/categories', name: 'Categories' }
  ]

  constructor(private auth: AuthService, private router: Router) {
  }

  logout(event: { preventDefault: () => void }) {
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(['/login'])
  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.actionBtnEl)
  }
}