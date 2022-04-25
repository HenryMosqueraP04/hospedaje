import { TestBed,  waitForAsync } from '@angular/core/testing';

import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {

  let securityGuard: SecurityGuard;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SecurityGuard]
    });    
  }));

  beforeEach(()=>{
    securityGuard = TestBed.inject(SecurityGuard);
  })

  it('deberia crear el guardian de seguridad', () => {
    expect(securityGuard).toBeTruthy();
  });

  it('deberia permitir el acceso', () => {
    expect(securityGuard.canActivate()).toBe(true);
  });


});
