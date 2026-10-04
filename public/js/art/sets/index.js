// Every location a script can `@set`. To add one: create a file here exporting
// { rain, indoor, draw(vars) } and register it below. `rain` is off|window|light|heavy;
// `indoor` muffles the rain audio. draw() returns a 1600x900 SVG string (see ../svg.js).
import office from './office.js';
import street from './street.js';
import bar from './bar.js';
import precinct from './precinct.js';
import alley from './alley.js';
import rooftop from './rooftop.js';
import apartment from './apartment.js';
import phonebooth from './phonebooth.js';
import station from './station.js';
import docks from './docks.js';
import voidSet from './void.js';

export const SETS = { office, street, bar, precinct, alley, rooftop, apartment, phonebooth, station, docks, void: voidSet };

// Unknown names fall back to the empty void stage.
export const getSet = name => SETS[name] || SETS.void;
