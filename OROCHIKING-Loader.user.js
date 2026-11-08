// ==UserScript==
// @name         OROCHIKING - Painel (Loader + Licença)
// @namespace    orochiking.painel
// @version      30.0
// @description  Valida a licença (e-mail da compra + nick) no servidor OROCHIKING e só então recebe e carrega o Painel.
// @match        https://*/game.php*
// @match        http://*/game.php*
// @include      *://*.tribalwars.com.br/*
// @include      *://tribalwars.com.br/*
// @include      *://*.tribalwars.net/*
// @include      *://tribalwars.net/*
// @include      *://*.tribalwars.com.pt/*
// @include      *://tribalwars.com.pt/*
// @include      *://*.tribalwars.co.uk/*
// @include      *://tribalwars.co.uk/*
// @include      *://*.tribalwars.us/*
// @include      *://tribalwars.us/*
// @include      *://*.tribalwars.nl/*
// @include      *://tribalwars.nl/*
// @include      *://*.tribalwars.se/*
// @include      *://tribalwars.se/*
// @include      *://*.tribalwars.no/*
// @include      *://tribalwars.no/*
// @include      *://*.tribalwars.dk/*
// @include      *://tribalwars.dk/*
// @include      *://*.tribalwars.gr/*
// @include      *://tribalwars.gr/*
// @include      *://*.tribalwars.ae/*
// @include      *://tribalwars.ae/*
// @include      *://*.tribalwars.ch/*
// @include      *://tribalwars.ch/*
// @include      *://*.tribalwars.it/*
// @include      *://tribalwars.it/*
// @include      *://*.tribalwars.cz/*
// @include      *://tribalwars.cz/*
// @include      *://*.tribalwars.ro/*
// @include      *://tribalwars.ro/*
// @include      *://*.tribalwars.hu/*
// @include      *://tribalwars.hu/*
// @include      *://*.tribalwars.lt/*
// @include      *://tribalwars.lt/*
// @include      *://*.tribalwars.lv/*
// @include      *://tribalwars.lv/*
// @include      *://*.tribalwars.ee/*
// @include      *://tribalwars.ee/*
// @include      *://*.tribalwars.bg/*
// @include      *://tribalwars.bg/*
// @include      *://*.tribalwars.hr/*
// @include      *://tribalwars.hr/*
// @include      *://*.tribalwars.rs/*
// @include      *://tribalwars.rs/*
// @include      *://*.tribalwars.si/*
// @include      *://tribalwars.si/*
// @include      *://*.tribalwars.com.es/*
// @include      *://tribalwars.com.es/*
// @include      *://*.tribalwars.com.tr/*
// @include      *://tribalwars.com.tr/*
// @include      *://*.tribalwars.co.il/*
// @include      *://tribalwars.co.il/*
// @include      *://*.tribalwars.asia/*
// @include      *://tribalwars.asia/*
// @include      *://*.tribalwars.works/*
// @include      *://tribalwars.works/*
// @include      *://*.die-staemme.de/*
// @include      *://die-staemme.de/*
// @include      *://*.staemme.ch/*
// @include      *://staemme.ch/*
// @include      *://*.plemiona.pl/*
// @include      *://plemiona.pl/*
// @include      *://*.guerretribale.fr/*
// @include      *://guerretribale.fr/*
// @include      *://*.guerrastribales.es/*
// @include      *://guerrastribales.es/*
// @include      *://*.tribals.it/*
// @include      *://tribals.it/*
// @include      *://*.divokekmeny.cz/*
// @include      *://divokekmeny.cz/*
// @include      *://*.divoke-kmene.sk/*
// @include      *://divoke-kmene.sk/*
// @include      *://*.triburile.ro/*
// @include      *://triburile.ro/*
// @include      *://*.klanhaboru.hu/*
// @include      *://klanhaboru.hu/*
// @include      *://*.fyletikesmaxes.gr/*
// @include      *://fyletikesmaxes.gr/*
// @include      *://*.stamkrig.dk/*
// @include      *://stamkrig.dk/*
// @include      *://*.stammekrigen.no/*
// @include      *://stammekrigen.no/*
// @include      *://*.heimot.fi/*
// @include      *://heimot.fi/*
// @include      *://*.gentys.lt/*
// @include      *://gentys.lt/*
// @include      *://*.ciltis.lv/*
// @include      *://ciltis.lv/*
// @include      *://*.vojnaplemen.si/*
// @include      *://vojnaplemen.si/*
// @include      *://*.klanlar.org/*
// @include      *://klanlar.org/*
// @include      *://*.voynaplemyon.com/*
// @include      *://voynaplemyon.com/*
// @include      *://*.tribalwars2.com/*
// @include      *://tribalwars2.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        unsafeWindow
// @connect      xnjawwjjrrxjwpdkprhj.supabase.co
// @connect      supabase.co
// @connect      painelorochikingtw.lovable.app
// @connect      lovable.app
// @updateURL    https://raw.githubusercontent.com/evandrosmagela-tech/orochiking-loader/main/OROCHIKING-Loader.user.js
// @downloadURL  https://raw.githubusercontent.com/evandrosmagela-tech/orochiking-loader/main/OROCHIKING-Loader.user.js
// ==/UserScript==

(function () {
  'use strict';

  /* ============================================================
     v29: MODO VÍDEO (privacidade) — esconde a página IMEDIATAMENTE
     (document-start), ANTES de pintar o nick, se o Modo Vídeo do painel
     estiver ligado. O painel revela a página já mascarada. Isso mata o
     "flash" do nick ao recarregar. Se o Modo Vídeo estiver desligado,
     NADA muda — este bloco nem roda.
  ============================================================ */
  try {
    var _LS = (typeof unsafeWindow !== 'undefined' && unsafeWindow.localStorage) ? unsafeWindow.localStorage : window.localStorage;
    var _pc = JSON.parse(_LS.getItem('ork_priv_cfg') || 'null');
    if (_pc && _pc.ativo) {
      var _hs = document.createElement('style'); _hs.id = 'ork-priv-hide';
      _hs.textContent = 'body > *:not(#ork-painel):not(#ork-painel-bolinha):not(#ork-modal-priv):not(#ork-ld){visibility:hidden!important}';
      (document.head || document.documentElement).appendChild(_hs);
      // trava de segurança: revela em no máximo 6s mesmo se o painel não carregar
      setTimeout(function () { try { var s = document.getElementById('ork-priv-hide'); if (s) { s.remove(); } } catch (e) {} }, 6000);
    }
  } catch (e) {}

  /* ============================================================
     OROCHIKING — LOADER v28 (licença no SERVIDOR — Supabase)

     O que mudou em relação ao v27:
       • Servidor de licenças migrado do Lovable para o Supabase (grátis).
         Agora a função "painel" roda em
         https://xnjawwjjrrxjwpdkprhj.supabase.co/functions/v1/painel
       • Resto igual: valida e-mail da compra + nick, entrega o painel só
         pra quem tem licença válida, e-mail pedido uma vez, cópia offline.
  ============================================================ */
  var CONFIG = {
    // endereço do servidor de licenças (Edge Function "painel" no Supabase)
    urlPainel: 'https://xnjawwjjrrxjwpdkprhj.supabase.co/functions/v1/painel',
    // chave pública (anon/publishable) do projeto Supabase
    anonKey: 'sb_publishable_eRRHxPp8zL-7bS8rF1FWWg_g6R3JrJZ',
    versaoLoader: '30.0',
    // reaproveita o painel já recebido por até X minutos (não baixa 1 MB a cada F5; a licença continua sendo
    // reconferida pelo próprio painel a cada 10–15 min). Atualização nova do painel chega em até X minutos.
    cacheMinutos: 20,
    // se o servidor cair, usa a última cópia válida por até X horas (nunca além do vencimento)
    folgaOfflineHoras: 12
  };

  var W = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

  function nickAtual() {
    try { var gd = W.game_data; return (gd && gd.player && gd.player.name) ? String(gd.player.name).trim() : ''; } catch (e) { return ''; }
  }
  function mundoAtual() { try { return String((W.game_data && W.game_data.world) || ''); } catch (e) { return ''; } }
  function emailSalvo() { try { return String(GM_getValue('ork_email', '') || '').trim(); } catch (e) { return ''; } }

  /* ---------- chamada ao servidor ---------- */
  function chamar(corpo, cb) {
    GM_xmlhttpRequest({
      method: 'POST',
      url: CONFIG.urlPainel,
      headers: CONFIG.anonKey ? { 'Content-Type': 'application/json', 'apikey': CONFIG.anonKey, 'Authorization': 'Bearer ' + CONFIG.anonKey } : { 'Content-Type': 'application/json' },
      data: JSON.stringify(corpo),
      timeout: 20000,
      onload: function (res) {
        var j = null; try { j = JSON.parse(res.responseText); } catch (e) {}
        if (!j) { cb(null, 'resposta inválida do servidor (HTTP ' + res.status + ')'); return; }
        cb(j, null);
      },
      onerror: function () { cb(null, 'sem conexão com o servidor de licenças'); },
      ontimeout: function () { cb(null, 'o servidor de licenças demorou demais'); }
    });
  }
  function pedido(soChecar) {
    return { email: emailSalvo(), nick: nickAtual(), mundo: mundoAtual(), host: location.host, loader: CONFIG.versaoLoader, checar: !!soChecar };
  }

  /* ---------- avisos e pedido do e-mail ---------- */
  function estilo() {
    if (document.getElementById('ork-ld-estilo')) { return; }
    var s = document.createElement('style'); s.id = 'ork-ld-estilo';
    s.textContent = '#ork-ld{position:fixed;bottom:16px;right:16px;width:320px;background:linear-gradient(160deg,#181818,#050505);border:1px solid #f0b90b;border-radius:12px;' +
      'box-shadow:0 10px 28px rgba(0,0,0,.7);color:#eee;font:12px/1.5 "Segoe UI",Verdana,Arial,sans-serif;padding:14px;z-index:2147483600}' +
      '#ork-ld b{color:#ffd84d}#ork-ld input{width:100%;box-sizing:border-box;margin:8px 0 6px;padding:7px 8px;border-radius:7px;border:1px solid #3a3a3a;background:#111;color:#eee;font:inherit}' +
      '#ork-ld button{border:none;border-radius:7px;padding:7px 12px;font-weight:800;cursor:pointer;font:inherit;font-weight:800}' +
      '#ork-ld .ok{background:linear-gradient(100deg,#FFB800,#FFDD55);color:#141200}#ork-ld .sec{background:#232323;color:#FFC400;border:1px solid #3a3a3a;margin-left:6px}' +
      '#ork-ld .x{float:right;cursor:pointer;color:#888;font-weight:800;margin-left:8px}';
    document.head.appendChild(s);
  }
  function caixa(html) {
    estilo();
    var v = document.getElementById('ork-ld'); if (v) { v.remove(); }
    var b = document.createElement('div'); b.id = 'ork-ld'; b.innerHTML = '<span class="x">&times;</span><b>🔒 OROCHIKING</b><br>' + html;
    document.body.appendChild(b);
    b.querySelector('.x').addEventListener('click', function () { b.remove(); });
    return b;
  }
  function pedirEmail(motivo) {
    var b = caixa((motivo ? motivo + '<br><br>' : '') + 'Digite o <b>e-mail usado na compra</b> (só uma vez — fica salvo neste navegador):' +
      '<input type="email" id="ork-ld-email" placeholder="seu@email.com" value="' + emailSalvo().replace(/"/g, '') + '">' +
      '<button class="ok" id="ork-ld-salvar">Liberar painel</button>');
    var inp = b.querySelector('#ork-ld-email');
    function salvar() {
      var e = String(inp.value || '').trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) { inp.style.borderColor = '#ff6b6b'; return; }
      try { GM_setValue('ork_email', e); } catch (er) {}
      b.innerHTML = '<b>🔒 OROCHIKING</b><br>Conferindo sua licença...';
      iniciar();
    }
    b.querySelector('#ork-ld-salvar').addEventListener('click', salvar);
    inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { salvar(); } });
    setTimeout(function () { try { inp.focus(); } catch (e) {} }, 50);
  }
  function avisoNegado(motivo) {
    var b = caixa(motivo + '<br><br><button class="ok" id="ork-ld-troca">Trocar e-mail</button>');
    b.querySelector('#ork-ld-troca').addEventListener('click', function () { pedirEmail(''); });
  }

  /* ---------- injeção ---------- */
  function injetar(codigo, info) {
    W.__ORK_LICENCA_OK__ = true;
    W.__ORK_LICENCA_INFO__ = 'Licenciado: ' + info.nick + ' — válido até ' + (info.expira || 'sem prazo');
    W.__ORK_REVALIDAR_LICENCA__ = function (cb) {
      chamar(pedido(true), function (j, erro) {
        if (erro || !j) { cb(true); return; } // falha de rede NÃO derruba ninguém
        if (!j.ok && (j.motivo === 'limite' || j.motivo === 'erro')) { cb(true); return; } // servidor ocupado também não
        if (!j.ok) { try { GM_deleteValue('ork_copia'); } catch (e) {} } // licença caiu: não reaproveita mais a cópia
        cb(!!j.ok);
      });
    };
    try {
      var el = document.createElement('script'); el.id = 'ork-painel-script'; el.textContent = codigo;
      document.documentElement.appendChild(el);
    } catch (e) { console.error('[OROCHIKING] Erro ao injetar o painel:', e); }
  }
  function aguardarTela(cb, n) {
    n = n || 0;
    try { if (W.game_data && W.game_data.screen) { cb(); return; } } catch (e) {}
    if (n > 100) { cb(); return; }
    setTimeout(function () { aguardarTela(cb, n + 1); }, 100);
  }

  /* ---------- cópia de segurança (servidor fora do ar) ---------- */
  function guardarCopia(codigo, j) {
    try { GM_setValue('ork_copia', JSON.stringify({ quando: Date.now(), nick: j.nick || nickAtual(), email: emailSalvo(), expiraMs: j.expira_ms || 0, expira: j.expira, codigo: codigo })); } catch (e) {}
  }
  function usarCopia(motivo) {
    var c = null; try { c = JSON.parse(GM_getValue('ork_copia', 'null')); } catch (e) {}
    var nick = nickAtual();
    if (c && c.codigo && c.nick && c.nick.toLowerCase() === nick.toLowerCase() &&
        Date.now() - c.quando < CONFIG.folgaOfflineHoras * 3600000 && (!c.expiraMs || Date.now() < c.expiraMs)) {
      console.warn('[OROCHIKING] servidor de licenças indisponível (' + motivo + ') — usando a última cópia válida.');
      aguardarTela(function () { injetar(c.codigo, { nick: c.nick, expira: c.expira }); });
      return true;
    }
    return false;
  }

  /* ============================================================
     v30: MASCARADOR LEVE (Modo Vídeo) — roda no DOMContentLoaded, bem
     antes do painel grande carregar. Mascara o nick/tribo e REVELA a
     página na hora, pra não ficar escondida 2-3s esperando o painel.
     O painel depois mantém a máscara (navegação/ajax). Desligado = no-op.
  ============================================================ */
  function _privMascararLoader() {
    try {
      var LS = (typeof unsafeWindow !== 'undefined' && unsafeWindow.localStorage) ? unsafeWindow.localStorage : window.localStorage;
      var cfg = null; try { cfg = JSON.parse(LS.getItem('ork_priv_cfg') || 'null'); } catch (e) {}
      if (!cfg || !cfg.ativo) { var s0 = document.getElementById('ork-priv-hide'); if (s0) { s0.remove(); } return; }
      var alias = cfg.alias || 'OROCHIKING';
      var alvos = [];
      if (cfg.meuNick) { var n = nickAtual(); if (n) { alvos.push(n); } }
      if (cfg.minhaTribo) {
        try {
          var a = document.querySelector('#menu_row2 a[href*="screen=info_ally"], #menu_row a[href*="screen=info_ally"]');
          if (a && a.textContent && a.textContent.trim()) { var t = a.textContent.trim().replace(/[\[\]]/g, ''); alvos.push(t); alvos.push('[' + t + ']'); }
        } catch (e) {}
      }
      alvos = alvos.filter(function (s) { return s && s.length >= 2; });
      var esc = function (s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
      if (alvos.length && document.body) {
        var regs = alvos.map(function (a) { return new RegExp(esc(a), 'gi'); });
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
          acceptNode: function (node) {
            var p = node.parentNode; if (!p) { return NodeFilter.FILTER_REJECT; }
            var tag = p.nodeName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'OPTION') { return NodeFilter.FILTER_REJECT; }
            try { if (p.closest && p.closest('#ork-painel, #ork-painel-bolinha, #ork-modal-priv, #ork-ld')) { return NodeFilter.FILTER_REJECT; } } catch (e) {}
            if (!node.nodeValue || !node.nodeValue.trim()) { return NodeFilter.FILTER_REJECT; }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        var node, mudar = [];
        while ((node = walker.nextNode())) { var v = node.nodeValue, nv = v; for (var i = 0; i < regs.length; i++) { nv = nv.replace(regs[i], alias); } if (nv !== v) { mudar.push([node, nv]); } }
        mudar.forEach(function (x) { x[0].nodeValue = x[1]; });
      }
      if ((cfg.outros || cfg.aldeias) && document.body) {
        if (!document.getElementById('ork-priv-css')) { var sc = document.createElement('style'); sc.id = 'ork-priv-css'; sc.textContent = '.ork-priv-blur{filter:blur(5px)!important}'; (document.head || document.documentElement).appendChild(sc); }
      }
      if (cfg.outros && document.body) {
        var meu = (nickAtual() || '').toLowerCase(), al = (alias || '').toLowerCase();
        document.querySelectorAll('a[href*="screen=info_player"]').forEach(function (a) { var t = (a.textContent || '').trim().toLowerCase(); if (t && t !== meu && t !== al) { a.classList.add('ork-priv-blur'); } });
        document.querySelectorAll('a[href*="screen=info_ally"]').forEach(function (a) { var t = (a.textContent || '').trim().toLowerCase(); if (t !== al && t !== ('[' + al + ']')) { a.classList.add('ork-priv-blur'); } });
      }
      if (cfg.aldeias && document.body) {
        document.querySelectorAll('a[href*="screen=info_village"]').forEach(function (a) { if (a.getAttribute('data-ork-aldeia')) { return; } var txt = a.textContent || ''; var m = txt.match(/\(\s*\d{1,3}\s*\|\s*\d{1,3}\s*\)/); var novo = 'Aldeia' + (m ? ' ' + m[0] : ''); if (novo !== txt) { a.textContent = novo; a.setAttribute('data-ork-aldeia', '1'); } });
      }
    } catch (e) {}
    try { var s = document.getElementById('ork-priv-hide'); if (s) { s.remove(); } } catch (e) {}
  }

  /* ---------- início ---------- */
  function iniciar() {
    var nick = nickAtual();
    if (!nick) {
      // sessão caída (sem game_data): injeta a última cópia SEM licença liberada — o painel trava sozinho,
      // mas o trecho de relogin automático dele (que roda antes da trava) continua funcionando, como no v26
      var c = null; try { c = JSON.parse(GM_getValue('ork_copia', 'null')); } catch (e) {}
      if (c && c.codigo && Date.now() - c.quando < CONFIG.folgaOfflineHoras * 3600000) {
        W.__ORK_LICENCA_OK__ = false;
        try { var el = document.createElement('script'); el.id = 'ork-painel-script'; el.textContent = c.codigo; document.documentElement.appendChild(el); } catch (e) {}
      }
      return;
    }
    if (!emailSalvo()) { pedirEmail(''); return; }
    // v27.1: cópia recente deste nick + e-mail → abre na hora, sem pedir de novo ao servidor
    var cp = null; try { cp = JSON.parse(GM_getValue('ork_copia', 'null')); } catch (e) {}
    if (cp && cp.codigo && cp.nick && cp.nick.toLowerCase() === nick.toLowerCase() && cp.email === emailSalvo() &&
        Date.now() - cp.quando < CONFIG.cacheMinutos * 60000 && (!cp.expiraMs || Date.now() < cp.expiraMs)) {
      aguardarTela(function () { injetar(cp.codigo, { nick: cp.nick, expira: cp.expira }); });
      return;
    }
    chamar(pedido(false), function (j, erro) {
      // limite de tentativas ou erro do servidor NÃO é licença negada: usa a última cópia válida
      if (j && !j.ok && (j.motivo === 'limite' || j.motivo === 'erro')) { erro = j.mensagem || j.motivo; j = null; }
      if (erro || !j) {
        if (!usarCopia(erro)) { caixa('Não foi possível checar sua licença agora (' + (erro || 'erro') + '). Recarregue a página em instantes.'); }
        return;
      }
      if (!j.ok) {
        try { GM_deleteValue('ork_copia'); } catch (e) {}
        if (j.motivo === 'email') { pedirEmail(j.mensagem || 'Não achamos uma compra com esse e-mail para o nick "' + nick + '".'); return; }
        avisoNegado(j.mensagem || 'Licença não liberada para o nick "' + nick + '".');
        return;
      }
      var v = document.getElementById('ork-ld'); if (v) { v.remove(); }
      guardarCopia(j.codigo, j);
      aguardarTela(function () { injetar(j.codigo, j); });
    });
  }

  // v29/30: rodamos em document-start, então o DOM pode não existir ainda.
  // Assim que o DOM fica pronto: PRIMEIRO mascara+revela (rápido, sem esperar o painel),
  // DEPOIS inicia a licença/injeção do painel. iniciar() usa body/head, por isso espera o DOM.
  function _arrancar() { try { _privMascararLoader(); } catch (e) {} iniciar(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _arrancar);
  } else {
    _arrancar();
  }
})();
