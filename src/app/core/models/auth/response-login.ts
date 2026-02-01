import { UserInterface } from '../user/user.interface,';

export interface ResponseLogin {
  user: UserInterface;
  accessToken: string;
}
