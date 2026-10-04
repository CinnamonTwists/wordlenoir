// Every location a script can `@set`. To add one: create a file here exporting
// { rain, indoor, ambience, draw(vars) } and register it below. `rain` is off|window|light|heavy;
// `indoor` muffles the rain audio; `ambience` names its sound bed in audio/beds.js (null for silence; `npm run check` validates it). draw() returns a 1600x900 SVG string (see ../svg.js).
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
import hearing from './hearing.js';
import pressroom from './pressroom.js';
import hospital from './hospital.js';
import restaurant from './restaurant.js';
import gangway from './gangway.js';
import penitentiary from './penitentiary.js';
import morgue from './morgue.js';
import studio from './studio.js';
import records from './records.js';
import vault from './vault.js';
import ferry from './ferry.js';
import warehouse from './warehouse.js';
import kitchen from './kitchen.js';
import ballpark from './ballpark.js';
import ruins from './ruins.js';
import cemetery from './cemetery.js';
import voidSet from './void.js';

export const SETS = { office, street, bar, precinct, alley, rooftop, apartment, phonebooth, station, docks, hearing, pressroom, hospital, restaurant, gangway,
  penitentiary, morgue, studio, records, vault, ferry, warehouse, kitchen, ballpark, ruins, cemetery, void: voidSet };

// Unknown names fall back to the empty void stage.
export const getSet = name => SETS[name] || SETS.void;
