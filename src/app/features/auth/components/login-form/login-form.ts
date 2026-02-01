import { ChangeDetectionStrategy, Component } from '@angular/core';
import { bootstrapSendArrowDown } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
@Component({
  selector: 'app-login-form',

  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {}
