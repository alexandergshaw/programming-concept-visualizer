// A tiny, pure "turtle" interpreter used by the Turtle Graphics concept pages.
//
// It mirrors the handful of Python turtle commands a beginner meets first
// (forward / backward / left / right / penup / pendown / pencolor / pensize).
// `simulate` turns a list of commands into a sequence of FRAMES — one snapshot
// per command — so a page can either render the final frame (a live playground)
// or step through frames on a timer (an animated draw).
//
// Coordinates follow the real turtle convention: origin (0, 0) is the centre of
// the canvas, +x points right, +y points UP, and heading is measured in degrees
// counter-clockwise from east (0° = east, 90° = north). Colors are kept as two
// values: `css` is what we actually paint with (a theme token or a CSS color
// name, so it stays visible in every theme) and `value` is the Python string the
// learner would type (e.g. "red").

export type TurtleCommand =
  | { type: 'forward'; value: number }
  | { type: 'backward'; value: number }
  | { type: 'left'; value: number }
  | { type: 'right'; value: number }
  | { type: 'penup' }
  | { type: 'pendown' }
  | { type: 'color'; value: string; css: string }
  | { type: 'width'; value: number }
  | { type: 'goto'; x: number; y: number }
  | { type: 'home' };

export interface TurtleState {
  x: number;
  y: number;
  heading: number; // degrees, 0 = east, counter-clockwise positive
  penDown: boolean;
  color: string; // css color we paint with
  colorName: string; // the Python color string, for display
  width: number;
}

export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}

export interface Frame {
  state: TurtleState;
  segments: Segment[]; // cumulative — every line drawn up to and including this command
  label: string; // short caption describing the command that produced this frame
}

export const DEFAULT_STATE: TurtleState = {
  x: 0,
  y: 0,
  heading: 0,
  penDown: true,
  color: 'var(--ink)',
  colorName: 'black',
  width: 3,
};

/** Normalise a heading into the 0–359 range for display. */
export function normalizeHeading(heading: number): number {
  return ((heading % 360) + 360) % 360;
}

/** Map a heading to a friendly compass word (0° = east, 90° = north …). */
export function headingToCompass(heading: number): string {
  const h = normalizeHeading(heading);
  const names = ['East', 'North-East', 'North', 'North-West', 'West', 'South-West', 'South', 'South-East'];
  return names[Math.round(h / 45) % 8];
}

/** Run a list of commands, returning one frame per command (plus a start frame). */
export function simulate(commands: TurtleCommand[], start: TurtleState = DEFAULT_STATE): Frame[] {
  let state: TurtleState = { ...start };
  const segments: Segment[] = [];
  const frames: Frame[] = [{ state: { ...state }, segments: [], label: 'Start — turtle at home, facing east' }];

  for (const cmd of commands) {
    let label = '';
    switch (cmd.type) {
      case 'forward':
      case 'backward': {
        const distance = cmd.type === 'backward' ? -cmd.value : cmd.value;
        const rad = (state.heading * Math.PI) / 180;
        const nx = state.x + distance * Math.cos(rad);
        const ny = state.y + distance * Math.sin(rad);
        if (state.penDown) {
          segments.push({ x1: state.x, y1: state.y, x2: nx, y2: ny, color: state.color, width: state.width });
        }
        state = { ...state, x: nx, y: ny };
        label = cmd.type === 'forward' ? `Move forward ${cmd.value}` : `Move backward ${cmd.value}`;
        break;
      }
      case 'left':
        state = { ...state, heading: state.heading + cmd.value };
        label = `Turn left ${cmd.value}°`;
        break;
      case 'right':
        state = { ...state, heading: state.heading - cmd.value };
        label = `Turn right ${cmd.value}°`;
        break;
      case 'penup':
        state = { ...state, penDown: false };
        label = 'Lift the pen — moving now leaves no line';
        break;
      case 'pendown':
        state = { ...state, penDown: true };
        label = 'Put the pen down — moving now draws';
        break;
      case 'color':
        state = { ...state, color: cmd.css, colorName: cmd.value };
        label = `Switch pen color to ${cmd.value}`;
        break;
      case 'width':
        state = { ...state, width: cmd.value };
        label = `Set pen size to ${cmd.value}`;
        break;
      case 'goto':
        if (state.penDown) {
          segments.push({ x1: state.x, y1: state.y, x2: cmd.x, y2: cmd.y, color: state.color, width: state.width });
        }
        state = { ...state, x: cmd.x, y: cmd.y };
        label = `Go straight to (${cmd.x}, ${cmd.y})`;
        break;
      case 'home':
        if (state.penDown && (state.x !== 0 || state.y !== 0)) {
          segments.push({ x1: state.x, y1: state.y, x2: 0, y2: 0, color: state.color, width: state.width });
        }
        state = { ...state, x: 0, y: 0, heading: 0 };
        label = 'Return home to (0, 0)';
        break;
    }
    frames.push({ state: { ...state }, segments: segments.slice(), label });
  }

  return frames;
}

/** The Python line a learner would type for a command (turtle variable is `t`). */
export function commandToPython(cmd: TurtleCommand): string {
  switch (cmd.type) {
    case 'forward':
      return `t.forward(${cmd.value})`;
    case 'backward':
      return `t.backward(${cmd.value})`;
    case 'left':
      return `t.left(${cmd.value})`;
    case 'right':
      return `t.right(${cmd.value})`;
    case 'penup':
      return 't.penup()';
    case 'pendown':
      return 't.pendown()';
    case 'color':
      return `t.pencolor("${cmd.value}")`;
    case 'width':
      return `t.pensize(${cmd.value})`;
    case 'goto':
      return `t.goto(${cmd.x}, ${cmd.y})`;
    case 'home':
      return 't.home()';
  }
}
