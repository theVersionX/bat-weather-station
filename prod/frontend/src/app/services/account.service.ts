import { Injectable } from '@angular/core';
import { AuthenticationData } from '../shared/interfaces/authentication-data';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  authenticationData:AuthenticationData={nickname:"HB9HSLU",password:"super_secure_pw"}
  constructor() { }
}
