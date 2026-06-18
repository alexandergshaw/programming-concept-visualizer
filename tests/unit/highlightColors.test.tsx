import React from 'react';
import { render } from '@testing-library/react';

import StepThroughCodeAnimation from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import CodePartsExplanation from '@/components/common/CodePartsExplanation';

/**
 * Regression guard for the token + hex-alpha highlighting bug.
 *
 * These components build translucent highlight backgrounds from theme tokens.
 * They used to do it by concatenating a hex alpha onto the color string
 * (`var(--info)33`), which is invalid CSS — the browser drops the declaration
 * and the highlight disappears in every theme. The fix routes those colors
 * through `withAlpha` / color-mix. See components/common/colorUtils.ts.
 */

// A `var(--token)` immediately followed by two hex digits — the invalid form.
const TOKEN_PLUS_HEX = /var\(--[\w-]+\)[0-9a-fA-F]{2}/;

describe('StepThroughCodeAnimation highlighting', () => {
  it('highlights the active line with a valid color-mix background', () => {
    const { container } = render(
      <StepThroughCodeAnimation
        code={['x = 5', 'if x > 0:']}
        steps={[{ label: 'Set', desc: 'set x', highlight: 'x = 5' }]}
      />,
    );

    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    // Default first step color is var(--info), applied at 20% via color-mix.
    expect(pre!.innerHTML).toContain('color-mix(in srgb, var(--info) 20%, transparent)');
    expect(pre!.innerHTML).not.toMatch(TOKEN_PLUS_HEX);
  });

  it('highlights array-of-words and substring matches with color-mix too', () => {
    const { container } = render(
      <StepThroughCodeAnimation
        code={['total = a + b']}
        steps={[{ label: 'Words', desc: 'ops', highlight: ['a', 'b'] }]}
      />,
    );

    const pre = container.querySelector('pre');
    expect(pre!.innerHTML).toContain('color-mix(');
    expect(pre!.innerHTML).not.toMatch(TOKEN_PLUS_HEX);
  });
});

describe('CodePartsExplanation highlighting', () => {
  it('wraps each highlighted part in a valid color-mix background', () => {
    const { container } = render(
      <CodePartsExplanation
        code={'const x = 1;'}
        parts={[{ label: 'Keyword', part: 'const', color: 'var(--info)', desc: 'declares' }]}
      />,
    );

    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    const partSpan = pre!.querySelector('span[data-label="Keyword"]');
    expect(partSpan).not.toBeNull();
    expect(partSpan!.getAttribute('style')).toContain(
      'color-mix(in srgb, var(--info) 20%, transparent)',
    );
    expect(pre!.innerHTML).not.toMatch(TOKEN_PLUS_HEX);
  });
});
