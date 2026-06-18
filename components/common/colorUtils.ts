// Color helpers that are safe to use with theme tokens (CSS custom properties).
//
// Older code built translucent backgrounds by concatenating a two-digit hex
// alpha onto a color string, e.g. `${color}33`. That only works when `color`
// is a hex literal. Once the palette moved to theme tokens, `color` became a
// `var(--info)` reference and `var(--info)33` is invalid CSS — the browser
// drops the declaration, so highlights silently stopped rendering.
//
// `color-mix` keeps the token reference intact and applies the alpha at paint
// time, so it resolves correctly in every theme (and still works for hex).

/**
 * Return `color` at the given opacity (0–100%), mixing the remainder with
 * `transparent`. Works for theme tokens (`var(--info)`) and hex literals alike.
 *
 * Rough hex-alpha equivalents, to match the values this replaced:
 * `22` ≈ 13, `33` ≈ 20, `44` ≈ 27.
 */
export function withAlpha(color: string, percent: number): string {
    return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}
