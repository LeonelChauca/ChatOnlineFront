import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapSendArrowDown } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm, NgIcon],
  viewProviders: [provideIcons({ bootstrapSendArrowDown })],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
