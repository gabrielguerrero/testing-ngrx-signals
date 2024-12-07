import '@analogjs/vitest-angular/setup-zone';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { server } from './app/services/mock-backend/node';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  server.listen();
  TestBed.overrideProvider(MATERIAL_SANITY_CHECKS, {
    useValue: false,
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
