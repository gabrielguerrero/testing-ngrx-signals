import { provideHttpClient } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

import { DemoComponent } from './demo.component';

describe('DemoComponentTest', () => {
  it('should initially render the list of products', async () => {
    await render(DemoComponent, {
      providers: [provideHttpClient()],
      detectChangesOnRender: true,
    });
    const list = await screen.findAllByRole('listitem');
    expect(list.length).toBe(122);
    expect(list[0].textContent).toEqual('Super Mario World');
  });

  it('should filter the products if typed on the filter box', async () => {
    await render(DemoComponent, {
      providers: [provideHttpClient()],
      detectChangesOnRender: true,
    });
    const searchBox = await screen.getByRole('textbox', {
      name: /search/i,
    });
    userEvent.type(searchBox, 'Zelda');
    const list = await screen.findAllByRole('listitem');
    expect(list.length).toBeGreaterThan(0);
    expect(
      list.map((v) => v.textContent).every((v) => v?.match(/Zelda/i)),
    ).toBeTruthy();
  });
});
