/*! tmihold | (c) LiviaMedeiros */
"use strict";
let to = null;
const dur = 1500;
const efid = 'tmihold';

const cln = ef => {
	clearTimeout(to);
	ef.remove();
	to = null;
	return true;
};

const cancel = e =>
	to ? cln(document.getElementById(efid)) : true;

const hold = (ef, cb, ...args) =>
	(cln(ef), cb(...args));

const tap = (e, cb, ...args) =>
	to ?? (to = setTimeout(hold, dur, ((ef, {x,y}) => {
		ef.id = efid;
		Object.assign(ef.style, {
			left: x+'px',
			top: y+'px'
		});
		return document.body.appendChild(ef);
	})(document.createElement('div'), e), cb, ...args));

const listen = (el, cb, ...args) => el ?
	(a => (a.forEach(e => el.   addEventListener(...e)),
	 e =>  a.forEach(e => el.removeEventListener(...e))))
	([
		['pointerdown', e => tap(e, cb, ...args)],
		['pointerup', cancel],
		['pointerleave', cancel]
	]) : null;

export default (el = document, cb = null, ...args) =>
	cb ? listen(el, cb, ...args) : new Promise((res, rej) => {
		const rem = listen(el, () => rem ? (rem(), res(el)) : rej());
	});
