import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { 
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill 
} from '@ant-design/icons-angular/icons';

const icons = [
  MessageOutline, 
  DollarOutline, 
  ClockCircleOutline, 
  CommentOutline, 
  EditFill, 
  DeleteFill
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideNzIcons(icons) // Added to providers
  ]
}).catch(err => console.error(err));