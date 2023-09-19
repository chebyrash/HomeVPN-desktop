import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { DestinationComponent } from './components/destination/destination.component';
import { JourneyComponent } from './components/journey/journey.component';
import { DialogModule } from '../dialog';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';
import { ActivePlanComponent } from './components/active-plan/active-plan.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NgLetModule } from 'ng-let';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@NgModule({
    declarations: [
        HomeComponent, 
        ConnectionComponent, 
        DestinationComponent,
        JourneyComponent,
        ActivePlanComponent
    ],
    imports: [ 
        CommonModule, 
        HomeRoutingModule, 
        DialogModule, 
        HeaderComponent,
        CountrySelectorComponent,
        NgLetModule,
        SpinnerComponent
    ],
    exports: [],
    providers: [],
})
export class HomeModule {}