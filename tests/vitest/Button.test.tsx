// import utils
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// import constants
// (none)
// import components
import { Button } from '@packages/ui';
// import types
// (none)

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>
    );
    screen.getByText('Click').click();
    expect(clicked).toBe(true);
  });
});
