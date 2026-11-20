// ==UserScript==
// @name         OROCHIKING - Painel (Loader + Licença)
// @namespace    orochiking.painel
// @version      34.0
// @description  Valida a licença (e-mail da compra + nick) no servidor OROCHIKING e só então abre o Painel (baixado do Cloudflare, criptografado).
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
// @connect      raw.githubusercontent.com
// @connect      orochiking-painel.evandrosmagela.workers.dev
// @connect      workers.dev
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
     OROCHIKING — LOADER v32 (painel no Cloudflare, licença leve no Supabase)
       • O painel fica CRIPTOGRAFADO no Cloudflare (grátis, sem limite de banda)
         e só é baixado quando sai versão nova.
       • O servidor de licenças (Supabase) responde só "ok + chave" (poucos bytes),
         no máximo 1 vez por hora por conta — vale pra todas as abas e recargas.
       • Servidor de licenças fora do ar/bloqueado não derruba ninguém: usa a última
         licença confirmada por até 7 dias (nunca além do vencimento).
  ============================================================ */
  var CONFIG = {
    // servidor de licenças (Cloudflare Worker: confere a lista e entrega a chave só pra quem tem licença)
    urlPainel: 'https://orochiking-painel.evandrosmagela.workers.dev/licenca',
    // onde fica o painel criptografado (Cloudflare)
    urlArquivos: 'https://orochiking-painel.evandrosmagela.workers.dev/',
    versaoLoader: '34.0',
    // confere a licença no servidor no máximo a cada X minutos (por conta, todas as abas juntas)
    licencaMinutos: 60,
    // confere se saiu versão nova do painel a cada X minutos (arquivo de poucos bytes, grátis)
    versaoMinutos: 20,
    // servidor fora/bloqueado: usa a última licença confirmada por até X horas (nunca além do vencimento)
    folgaOfflineHoras: 168,
    // MODO EMERGÊNCIA — só quando o servidor de licenças está fora e não há licença guardada:
    // abre o painel aberto do GitHub (se ele existir lá). Depois que o servidor voltar e você
    // apagar o arquivo do GitHub, pode trocar pra false.
    emergenciaGithub: false,
    urlPainelGithub: 'https://raw.githubusercontent.com/evandrosmagela-tech/orochiking-loader/main/planejadororochiking.js'
  };

  var W = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;

  function nickAtual() {
    try { var gd = W.game_data; return (gd && gd.player && gd.player.name) ? String(gd.player.name).trim() : ''; } catch (e) { return ''; }
  }
  function mundoAtual() { try { return String((W.game_data && W.game_data.world) || ''); } catch (e) { return ''; } }
  function emailSalvo() { try { return String(GM_getValue('ork_email', '') || '').trim(); } catch (e) { return ''; } }
  function lerGM(k) { try { return JSON.parse(GM_getValue(k, 'null')); } catch (e) { return null; } }
  function gravarGM(k, v) { try { GM_setValue(k, JSON.stringify(v)); } catch (e) {} }
  function apagarGM(k) { try { GM_deleteValue(k); } catch (e) {} }

  /* ---------- chamada ao servidor de licenças ---------- */
  function chamar(corpo, cb) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: CONFIG.urlPainel + '?email=' + encodeURIComponent(String(corpo.email || '')) + '&nick=' + encodeURIComponent(nickAtual()) + '&mundo=' + encodeURIComponent(mundoAtual()),
      timeout: 20000,
      onload: function (res) {
        var j = null; try { j = JSON.parse(res.responseText); } catch (e) {}
        if (!j) { cb(null, 'resposta inválida do servidor (HTTP ' + res.status + ')'); return; }
        // servidor fora (5xx) NÃO é licença negada
        if (typeof j.ok !== 'boolean' || res.status >= 500) { cb(null, 'servidor de licenças indisponível (HTTP ' + res.status + ')'); return; }
        if (!j.ok && (j.motivo === 'limite' || j.motivo === 'erro')) { cb(null, j.mensagem || j.motivo); return; }
        cb(j, null);
      },
      onerror: function () { cb(null, 'sem conexão com o servidor de licenças'); },
      ontimeout: function () { cb(null, 'o servidor de licenças demorou demais'); }
    });
  }
  function pedido() {
    return { email: emailSalvo(), nick: nickAtual(), mundo: mundoAtual(), host: location.host, loader: CONFIG.versaoLoader, checar: true };
  }
  function baixar(url, cb) {
    GM_xmlhttpRequest({
      method: 'GET', url: url, timeout: 60000,
      onload: function (res) { cb(res.status === 200 ? String(res.responseText || '') : null, res.status); },
      onerror: function () { cb(null, 0); }, ontimeout: function () { cb(null, 0); }
    });
  }

  /* ---------- licença guardada (1 por e-mail + nick, compartilhada entre abas) ---------- */
  function licGuardada() {
    var l = lerGM('ork_lic'), nick = nickAtual().toLowerCase();
    if (!l || !l.chave || l.email !== emailSalvo() || String(l.nick || '').toLowerCase() !== nick) { return null; }
    if (l.expiraMs && Date.now() >= l.expiraMs) { return null; }
    return l;
  }
  function guardarLic(j) {
    var l = { email: emailSalvo(), nick: nickAtual(), chave: j.chave, expira: j.expira, expiraMs: j.expira_ms || 0, conferida: Date.now() };
    gravarGM('ork_lic', l); return l;
  }
  function licencaCaiu() { apagarGM('ork_lic'); apagarGM('ork_copia'); }
  // confere a licença: usa a guardada se tiver menos de X min; senão pergunta ao servidor
  // cb(lic, negado, erro)
  function conferirLicenca(forcar, cb) {
    var l = licGuardada();
    if (!forcar && l && Date.now() - l.conferida < CONFIG.licencaMinutos * 60000) { cb(l, null, null); return; }
    chamar(pedido(), function (j, erro) {
      if (erro || !j) {
        if (l && Date.now() - l.conferida < CONFIG.folgaOfflineHoras * 3600000) { console.warn('[OROCHIKING] servidor de licenças indisponível (' + erro + ') — usando a última licença confirmada.'); cb(l, null, null); return; }
        cb(null, null, erro || 'erro'); return;
      }
      if (!j.ok) { licencaCaiu(); cb(null, j, null); return; }
      if (!j.chave) { cb(null, null, 'servidor de licenças desatualizado (sem chave)'); return; }
      cb(guardarLic(j), null, null);
    });
  }

  /* ---------- painel criptografado (Cloudflare) ---------- */
  function b64bytes(s) { var bin = atob(s), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) { u[i] = bin.charCodeAt(i); } return u; }
  function decifrar(dadosB64, chaveB64) {
    return Promise.resolve().then(function () {
      var tudo = b64bytes(dadosB64), iv = tudo.slice(0, 12), corpo = tudo.slice(12);
      var sub = (window.crypto && window.crypto.subtle) || (W.crypto && W.crypto.subtle);
      if (!sub || typeof DecompressionStream === 'undefined') { throw new Error('navegador sem suporte a criptografia — atualize o Chrome/Firefox'); }
      return sub.importKey('raw', b64bytes(chaveB64), { name: 'AES-GCM' }, false, ['decrypt'])
      .then(function (k) { return sub.decrypt({ name: 'AES-GCM', iv: iv }, k, corpo); })
      .then(function (gz) {
        var ds = new DecompressionStream('gzip');
        return new Response(new Blob([gz]).stream().pipeThrough(ds)).text();
      });
    });
  }
  // devolve (via cb) o painel criptografado da versão mais nova, baixando só se mudou
  function painelCifrado(cb) {
    var cache = lerGM('ork_painel_enc'), chk = lerGM('ork_painel_chk') || {};
    if (cache && cache.dados && Date.now() - (chk.quando || 0) < CONFIG.versaoMinutos * 60000) { cb(cache, null); return; }
    baixar(CONFIG.urlArquivos + 'versao.json?t=' + Math.floor(Date.now() / 60000), function (txt, st) {
      var v = null; try { v = JSON.parse(txt); } catch (e) {}
      if (!v || !v.arquivo) { if (cache && cache.dados) { cb(cache, null); } else { cb(null, 'não consegui ver a versão do painel (HTTP ' + st + ')'); } return; }
      gravarGM('ork_painel_chk', { quando: Date.now(), versao: v.versao });
      if (cache && cache.dados && cache.versao === v.versao) { cb(cache, null); return; }
      baixar(CONFIG.urlArquivos + v.arquivo, function (dados, st2) {
        if (!dados) { if (cache && cache.dados) { cb(cache, null); } else { cb(null, 'não consegui baixar o painel (HTTP ' + st2 + ')'); } return; }
        var novo = { versao: v.versao, dados: dados.trim(), quando: Date.now() };
        gravarGM('ork_painel_enc', novo);
        cb(novo, null);
      });
    });
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
  function tirarCaixa() { var v = document.getElementById('ork-ld'); if (v) { v.remove(); } }
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
  function mostrarNegado(j) {
    var nick = nickAtual();
    if (j.motivo === 'email') { pedirEmail(j.mensagem || 'Não achamos uma compra com esse e-mail para o nick "' + nick + '".'); return; }
    avisoNegado(j.mensagem || 'Licença não liberada para o nick "' + nick + '".');
  }

  /* ---------- injeção ---------- */
  function injetar(codigo, info, liberado) {
    W.__ORK_LICENCA_OK__ = liberado !== false;
    W.__ORK_LICENCA_INFO__ = 'Licenciado: ' + (info.nick || nickAtual()) + ' — válido até ' + (info.expira || 'sem prazo');
    // o painel reconfere a cada 10–15 min: aqui só vai ao servidor se passou o intervalo (1 vez por hora por conta)
    W.__ORK_REVALIDAR_LICENCA__ = function (cb) {
      conferirLicenca(false, function (lic, negado) {
        if (negado) { cb(false); return; }
        cb(true); // licença ok OU servidor fora (falha de rede NÃO derruba ninguém)
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
  // abre o painel com a chave da licença (rebusca a licença 1 vez se a chave mudou)
  function abrirPainel(lic, jaTentou) {
    painelCifrado(function (pc, erro) {
      if (!pc) { if (!usarCopiaAntiga(erro) && !usarEmergencia(erro)) { caixa('Não foi possível baixar o painel agora (' + erro + '). Recarregue a página em instantes.'); } return; }
      decifrar(pc.dados, lic.chave).then(function (codigo) {
        tirarCaixa();
        aguardarTela(function () { injetar(codigo, lic); });
      }).catch(function (e) {
        if (!jaTentou) {
          // chave trocada ou arquivo corrompido: confere a licença de novo e baixa o painel de novo
          apagarGM('ork_painel_enc'); apagarGM('ork_painel_chk');
          conferirLicenca(true, function (l2, negado, err2) {
            if (negado) { mostrarNegado(negado); return; }
            if (l2) { abrirPainel(l2, true); return; }
            caixa('Não foi possível abrir o painel agora (' + err2 + '). Recarregue a página em instantes.');
          });
          return;
        }
        console.error('[OROCHIKING] falha ao abrir o painel:', e);
        caixa('Não foi possível abrir o painel (arquivo inválido). Recarregue a página em instantes.');
      });
    });
  }

  /* ---------- servidor fora: cópia antiga (loader v31) e modo emergência ---------- */
  function usarCopiaAntiga(motivo) {
    var c = lerGM('ork_copia'), nick = nickAtual();
    if (c && c.codigo && c.codigo.indexOf('__ORK_VERSAO__') !== -1 && c.nick && c.nick.toLowerCase() === nick.toLowerCase() &&
        Date.now() - (c.conferida || c.quando) < CONFIG.folgaOfflineHoras * 3600000 && (!c.expiraMs || Date.now() < c.expiraMs)) {
      console.warn('[OROCHIKING] usando a cópia antiga do painel (' + motivo + ').');
      tirarCaixa();
      aguardarTela(function () { injetar(c.codigo, { nick: c.nick, expira: c.expira }); });
      return true;
    }
    return false;
  }
  function usarEmergencia(motivo) {
    if (!CONFIG.emergenciaGithub || !emailSalvo()) { return false; }
    caixa('Servidor de licenças fora do ar — abrindo o painel pelo modo emergência...');
    baixar(CONFIG.urlPainelGithub + '?t=' + Math.floor(Date.now() / 600000), function (cod, st) {
      if (!cod || cod.indexOf('__ORK_VERSAO__') === -1) { caixa('Não foi possível checar sua licença agora (' + motivo + '). Recarregue a página em instantes.'); return; }
      tirarCaixa();
      console.warn('[OROCHIKING] servidor de licenças indisponível (' + motivo + ') — painel aberto pelo modo emergência.');
      gravarGM('ork_copia', { quando: Date.now(), conferida: Date.now(), nick: nickAtual(), email: emailSalvo(), expiraMs: 0, expira: 'modo emergência', codigo: cod });
      aguardarTela(function () { injetar(cod, { nick: nickAtual(), expira: 'modo emergência' }); });
    });
    return true;
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
      // sessão caída (sem game_data): injeta o painel SEM licença liberada — o painel trava sozinho,
      // mas o relogin automático dele (que roda antes da trava) continua funcionando
      var l = lerGM('ork_lic'), pc = lerGM('ork_painel_enc');
      if (l && l.chave && pc && pc.dados && Date.now() - (l.conferida || 0) < CONFIG.folgaOfflineHoras * 3600000) {
        decifrar(pc.dados, l.chave).then(function (codigo) { injetar(codigo, l, false); }).catch(function () {});
        return;
      }
      var c = lerGM('ork_copia');
      if (c && c.codigo && Date.now() - (c.conferida || c.quando) < CONFIG.folgaOfflineHoras * 3600000) { injetar(c.codigo, c, false); }
      return;
    }
    if (!emailSalvo()) { pedirEmail(''); return; }
    conferirLicenca(false, function (lic, negado, erro) {
      if (negado) { mostrarNegado(negado); return; }
      if (lic) { abrirPainel(lic); return; }
      // servidor fora e sem licença guardada: cópia antiga (v31) ou modo emergência
      if (!usarCopiaAntiga(erro) && !usarEmergencia(erro)) { caixa('Não foi possível checar sua licença agora (' + erro + '). Recarregue a página em instantes.'); }
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
