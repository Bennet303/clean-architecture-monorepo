import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  PreloadAllModules,
  Route,
  Router,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Navigate } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import {} from 'module';
import { AppRoutingModule, routes } from '../../app-routing.module';
import { AuthState } from '../../presentation/states/auth/auth.state';
import {
  AuthStateModel,
  defaultAuthStateModel,
} from '../../presentation/states/auth/auth.state.model';
import { RolesEnum } from '../enums/roles.enum';
import { AuthRouteGuard } from './auth.route.guard';
import { RoleRouteGuard } from './role.route.guard';
import { RouteGuardsModule } from './route.guards.module';

describe('router', () => {
  let router: Router;
  let location: Location;
  let authRouteGuard: AuthRouteGuard;
  let roleRouteGuard: RoleRouteGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        RouteGuardsModule,
        NgxsModule.forRoot([AuthState]),
        RouterTestingModule.withRoutes(routes, {
          preloadingStrategy: PreloadAllModules,
        }),
      ],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    authRouteGuard = TestBed.inject(AuthRouteGuard);
    roleRouteGuard = TestBed.inject(RoleRouteGuard);
    router.initialNavigation();
  });
  describe('success', () => {
    it('should redirect to "login" when navigating to ""', async () => {
      await router.navigate(['']);

      expect(location.path()).toBe('/login');
    });
    it('should redirect to "login" when navigating to "**" (any non existing route)', async () => {
      await router.navigate(['/some/path']);

      expect(location.path()).toBe('/login');
    });
    it('should allow the navigation to "login"', async () => {
      await router.navigate(['/login']);

      expect(location.path()).toBe('/login');
    });
    it.each(['/home'])(
      'should navigate to the desired page if the AuthRouteGuard and RoleRouteGuard returns true',
      async (path) => {
        jest.spyOn(authRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(authRouteGuard, 'canActivate').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canActivate').mockReturnValue(true);

        await router.navigate([path]);

        expect(location.path()).toBe(path);
        expect(authRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(authRouteGuard.canActivate).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canActivate).toHaveBeenCalledTimes(1);
      }
    );
  });
  describe('failure', () => {
    it.each(['/home'])(
      'should navigate to "/login" if AuthRouteGuard.canLoad returns false',
      async (path) => {
        jest.spyOn(authRouteGuard, 'canLoad').mockReturnValue(false);
        jest.spyOn(roleRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(authRouteGuard, 'canActivate').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canActivate').mockReturnValue(true);

        await router.navigate([path]);

        expect(location.path()).toBe('/login');
        expect(authRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(authRouteGuard.canActivate).toHaveBeenCalledTimes(0);
        expect(roleRouteGuard.canActivate).toHaveBeenCalledTimes(0);
      }
    );
    it.each(['/home'])(
      'should navigate to "/login" if AuthRouteGuard.canActivate returns false',
      async (path) => {
        jest.spyOn(authRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(authRouteGuard, 'canActivate').mockReturnValue(false);
        jest.spyOn(roleRouteGuard, 'canActivate').mockReturnValue(true);

        await router.navigate([path]);

        expect(location.path()).toBe('/login');
        expect(authRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(authRouteGuard.canActivate).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canActivate).toHaveBeenCalledTimes(0);
      }
    );
    it.each(['/home'])(
      'should navigate to "/login" if RoleRouteGuard.canLoad returns false',
      async (path) => {
        jest.spyOn(authRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canLoad').mockReturnValue(false);
        jest.spyOn(authRouteGuard, 'canActivate').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canActivate').mockReturnValue(true);

        await router.navigate([path]);

        expect(location.path()).toBe('/login');
        expect(authRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(authRouteGuard.canActivate).toHaveBeenCalledTimes(0);
        expect(roleRouteGuard.canActivate).toHaveBeenCalledTimes(0);
      }
    );
    it.each(['/home'])(
      'should navigate to "/login" if RoleRouteGuard.canActivate returns false',
      async (path) => {
        jest.spyOn(authRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canLoad').mockReturnValue(true);
        jest.spyOn(authRouteGuard, 'canActivate').mockReturnValue(true);
        jest.spyOn(roleRouteGuard, 'canActivate').mockReturnValue(false);

        await router.navigate([path]);

        expect(location.path()).toBe('/login');
        expect(authRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canLoad).toHaveBeenCalledTimes(1);
        expect(authRouteGuard.canActivate).toHaveBeenCalledTimes(1);
        expect(roleRouteGuard.canActivate).toHaveBeenCalledTimes(1);
      }
    );
  });
  describe('route guards', () => {
    let store: Store;
    beforeEach(() => {
      store = TestBed.inject(Store);
    });
    describe('auth route guard', () => {
      describe('canLoad', () => {
        it('should return true if the token is valid', () => {
          store.reset({
            ...store.snapshot(),
            auth: { ...defaultAuthStateModel, token: '123' } as AuthStateModel,
          });

          const res = authRouteGuard.canLoad();

          expect(res).toBe(true);
        });
        it.each(['', undefined])(
          'should navigate to "/login" and return false if the token is invalid',
          (mockToken) => {
            store.reset({
              ...store.snapshot(),
              auth: {
                ...defaultAuthStateModel,
                token: mockToken,
              } as AuthStateModel,
            });

            jest.spyOn(store, 'dispatch');

            const res = authRouteGuard.canLoad();

            expect(res).toBe(false);
            expect(store.dispatch).toHaveBeenCalledWith(
              new Navigate(['/login'])
            );
            expect(store.dispatch).toHaveBeenCalledTimes(1);
          }
        );
      });
      describe('canActivate', () => {
        it('should return true if the token is valid', () => {
          store.reset({
            ...store.snapshot(),
            auth: { ...defaultAuthStateModel, token: '123' } as AuthStateModel,
          });

          const res = authRouteGuard.canActivate();

          expect(res).toBe(true);
        });
        it.each(['', undefined])(
          'should navigate to "/login" and return false if the token is invalid',
          (mockToken) => {
            store.reset({
              ...store.snapshot(),
              auth: {
                ...defaultAuthStateModel,
                token: mockToken,
              } as AuthStateModel,
            });

            jest.spyOn(store, 'dispatch');

            const res = authRouteGuard.canActivate();

            expect(res).toBe(false);
            expect(store.dispatch).toHaveBeenCalledWith(
              new Navigate(['/login'])
            );
            expect(store.dispatch).toHaveBeenCalledTimes(1);
          }
        );
      });
    });
    describe('role route guard', () => {
      describe('canLoad', () => {
        it('should return true if the role is allowed', () => {
          store.reset({
            ...store.snapshot(),
            auth: {
              ...defaultAuthStateModel,
              role: RolesEnum.User,
            } as AuthStateModel,
          });
          const mockRoute: Route = {
            data: { acceptedRoles: [RolesEnum.User] },
          };

          const res = roleRouteGuard.canLoad(mockRoute);

          expect(res).toBe(true);
        });
        it.each(['', undefined, {}, RolesEnum.Admin])(
          'should return false if the role is not allowed',
          (mockRole) => {
            store.reset({
              ...store.snapshot(),
              auth: {
                ...defaultAuthStateModel,
                role: mockRole,
              } as AuthStateModel,
            });
            const mockRoute: Route = {
              data: { acceptedRoles: [RolesEnum.User] },
            };

            const res = roleRouteGuard.canLoad(mockRoute);

            expect(res).toBe(false);
          }
        );
        it('should return false if the acceptedRoles are empty', () => {
          const mockRole = RolesEnum.User;
          store.reset({
            ...store.snapshot(),
            auth: {
              ...defaultAuthStateModel,
              role: mockRole,
            } as AuthStateModel,
          });
          const mockRoute: Route = {};

          const res = roleRouteGuard.canLoad(mockRoute);

          expect(res).toBe(false);
        });
      });
      describe('canActivate', () => {
        it('should return true if the role is allowed', () => {
          store.reset({
            ...store.snapshot(),
            auth: {
              ...defaultAuthStateModel,
              role: RolesEnum.User,
            } as AuthStateModel,
          });
          const mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
          mockActivatedRouteSnapshot.data = { acceptedRoles: [RolesEnum.User] };

          const res = roleRouteGuard.canActivate(mockActivatedRouteSnapshot);

          expect(res).toBe(true);
        });
        it.each(['', undefined, {}, RolesEnum.Admin])(
          'should return false if the role is not allowed',
          (mockRole) => {
            store.reset({
              ...store.snapshot(),
              auth: {
                ...defaultAuthStateModel,
                role: mockRole,
              } as AuthStateModel,
            });
            const mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
            mockActivatedRouteSnapshot.data = {
              acceptedRoles: [RolesEnum.User],
            };

            const res = roleRouteGuard.canActivate(mockActivatedRouteSnapshot);

            expect(res).toBe(false);
          }
        );
        it('should return false if the acceptedRoles are empty', () => {
          const mockRole = RolesEnum.User;
          store.reset({
            ...store.snapshot(),
            auth: {
              ...defaultAuthStateModel,
              role: mockRole,
            } as AuthStateModel,
          });
          const mockActivatedRouteSnapshot = new ActivatedRouteSnapshot();
          mockActivatedRouteSnapshot.data = {};

          const res = roleRouteGuard.canActivate(mockActivatedRouteSnapshot);

          expect(res).toBe(false);
        });
      });
    });
  });
});
