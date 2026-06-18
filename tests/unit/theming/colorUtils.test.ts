import { withAlpha } from '@/components/common/colorUtils';

// Matches the bug this helper exists to prevent: a CSS custom property with a
// hex alpha concatenated straight onto it (e.g. `var(--info)33`), which is
// invalid CSS and silently renders nothing.
const TOKEN_PLUS_HEX = /var\(--[\w-]+\)[0-9a-fA-F]{2}/;

describe('withAlpha', () => {
  it('wraps a theme token in a color-mix with transparent', () => {
    expect(withAlpha('var(--info)', 20)).toBe(
      'color-mix(in srgb, var(--info) 20%, transparent)',
    );
  });

  it('works for hex literals too', () => {
    expect(withAlpha('#2563eb', 27)).toBe(
      'color-mix(in srgb, #2563eb 27%, transparent)',
    );
  });

  it('embeds the requested percentage', () => {
    expect(withAlpha('var(--success)', 13)).toContain(' 13%,');
    expect(withAlpha('var(--success)', 100)).toContain(' 100%,');
  });

  it('always mixes toward transparent so the result is translucent', () => {
    expect(withAlpha('var(--danger)', 50)).toContain(', transparent)');
  });

  it.each(['var(--info)', 'var(--success)', 'var(--warning)', 'var(--danger)', 'var(--feature)'])(
    'never produces the invalid token+hex-alpha form for %s',
    (token) => {
      for (const pct of [13, 20, 27]) {
        expect(withAlpha(token, pct)).not.toMatch(TOKEN_PLUS_HEX);
      }
    },
  );
});
