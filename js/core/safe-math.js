'use strict';
/* Kapanadze AI–Socrates · restricted arithmetic-expression compiler.
 *
 * Replaces `new Function(...)` for evaluating students' formulas. It accepts only the
 * JavaScript subset that the original code could pass to `new Function` after its own
 * character whitelist: numbers, parameter names, + − * / **, brackets, unary + −,
 * ++/−− on a parameter, block comments, and calls of a parameter that holds a function
 * (√ → S). Anything else is rejected, so no student input is ever executed as code.
 *
 * The grammar mirrors JavaScript exactly where it matters for equal results:
 *  - `**` is right-associative and its left operand may not be a unary expression
 *    (`-x**2` is a syntax error in JavaScript, so it is rejected here too);
 *  - legacy octal literals (`012` → 10) and literal/identifier adjacency rules;
 *  - left-to-right evaluation, so ++/−− side effects happen in the same order.
 * compile() throws on anything JavaScript would reject or fail on at the first call.
 */
const SafeExpr = (() => {
  const isDigit = c => c >= '0' && c <= '9';
  const isIdStart = c => !!c && /[A-Za-z_$]/.test(c);
  const isIdPart = c => !!c && /[A-Za-z0-9_$]/.test(c);
  const fail = m => { throw new SyntaxError(m); };

  function tokenize(s) {
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '/' && s[i + 1] === '/') fail('line comment');               // would swallow the closing bracket
      if (c === '/' && s[i + 1] === '*') {                                  // block comment = whitespace
        const j = s.indexOf('*/', i + 2);
        if (j < 0) fail('unterminated comment');
        i = j + 2; continue;
      }
      if (isDigit(c) || (c === '.' && isDigit(s[i + 1] || ''))) {
        let j = i, v;
        if (c === '.') { j++; while (isDigit(s[j])) j++; v = Number('0' + s.slice(i, j)); }
        else {
          while (isDigit(s[j])) j++;
          const int = s.slice(i, j);
          if (/^0[0-7]+$/.test(int)) v = parseInt(int, 8);                   // legacy octal (sloppy mode)
          else {
            if (s[j] === '.') { j++; while (isDigit(s[j])) j++; }
            if ((s[j] === 'e' || s[j] === 'E') && (isDigit(s[j + 1] || '') || (/[+-]/.test(s[j + 1] || '') && isDigit(s[j + 2] || '')))) {
              j += /[+-]/.test(s[j + 1]) ? 2 : 1; while (isDigit(s[j])) j++;
            }
            v = Number(s.slice(i, j));
          }
        }
        if (isIdStart(s[j]) || isDigit(s[j] || '')) fail('identifier directly after number');
        out.push({ t: 'num', v }); i = j; continue;
      }
      if (isIdStart(c)) {
        let j = i + 1; while (isIdPart(s[j])) j++;
        out.push({ t: 'id', v: s.slice(i, j) }); i = j; continue;
      }
      const two = s.slice(i, i + 2);
      if (two === '**' || two === '++' || two === '--') { out.push({ t: 'op', v: two }); i += 2; continue; }
      if ('+-*/()'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
      fail('unexpected character ' + c);
    }
    return out;
  }

  function parse(tokens, params) {
    let p = 0;
    const at = v => p < tokens.length && tokens[p].t === 'op' && tokens[p].v === v;
    const expect = v => { if (!at(v)) fail('expected ' + v); p++; };
    const simpleTarget = n => n.k === 'id';

    function expression() { return additive(); }
    function additive() {
      let l = multiplicative();
      while (at('+') || at('-')) { const op = tokens[p++].v; l = { k: 'bin', op, l, r: multiplicative() }; }
      return l;
    }
    function multiplicative() {
      let l = exponent();
      while (at('*') || at('/')) { const op = tokens[p++].v; l = { k: 'bin', op, l, r: exponent() }; }
      return l;
    }
    function exponent() {
      if (at('-') || at('+')) {
        const u = unary();
        if (at('**')) fail('unary operand of **');
        return u;
      }
      const base = update();
      if (at('**')) { p++; return { k: 'bin', op: '**', l: base, r: exponent() }; }
      return base;
    }
    function unary() {
      if (at('-') || at('+')) { const op = tokens[p++].v; return { k: 'un', op, e: unary() }; }
      return update();
    }
    function update() {
      if (at('++') || at('--')) {
        const op = tokens[p++].v, e = unary();
        if (!simpleTarget(e)) fail('invalid update target');
        return { k: 'pre', op, name: e.name };
      }
      const e = callExpr();
      if (at('++') || at('--')) {
        const op = tokens[p++].v;
        if (!simpleTarget(e)) fail('invalid update target');
        return { k: 'post', op, name: e.name };
      }
      return e;
    }
    function callExpr() {
      let e = primary();
      while (at('(')) {
        p++;
        const arg = at(')') ? null : expression();
        expect(')');
        e = { k: 'call', callee: e, arg };
      }
      return e;
    }
    function primary() {
      const t = tokens[p];
      if (!t) fail('unexpected end');
      if (t.t === 'num') { p++; return { k: 'num', v: t.v }; }
      if (t.t === 'id') {
        if (!params.includes(t.v)) fail('unknown identifier ' + t.v);   // JavaScript: ReferenceError at the first call
        p++; return { k: 'id', name: t.v };
      }
      if (at('(')) { p++; const e = expression(); expect(')'); return e; }
      fail('unexpected token ' + t.v);
    }

    const ast = expression();
    if (p !== tokens.length) fail('unexpected token ' + tokens[p].v);
    return ast;
  }

  function evaluate(n, env) {
    switch (n.k) {
      case 'num': return n.v;
      case 'id': return env[n.name];
      case 'un': { const v = evaluate(n.e, env); return n.op === '-' ? -v : +v; }
      case 'bin': {
        const a = evaluate(n.l, env), b = evaluate(n.r, env);
        switch (n.op) { case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': return a / b; default: return a ** b; }
      }
      case 'pre': { const v = +env[n.name] + (n.op === '++' ? 1 : -1); env[n.name] = v; return v; }
      case 'post': { const old = +env[n.name]; env[n.name] = old + (n.op === '++' ? 1 : -1); return old; }
      case 'call': {
        const f = evaluate(n.callee, env);
        const arg = n.arg ? evaluate(n.arg, env) : undefined;
        if (typeof f !== 'function') throw new TypeError('not a function');
        return n.arg ? f(arg) : f();
      }
    }
    throw new Error('bad node');
  }

  /** Compiles `source` like `new Function(...params, 'return (' + source + ');')`, without executing code. */
  function compile(source, params) {
    const ast = parse(tokenize('(' + source + ')'), params);
    return (...args) => {
      const env = Object.create(null);
      params.forEach((name, i) => { env[name] = args[i]; });
      return evaluate(ast, env);
    };
  }

  return { compile };
})();
