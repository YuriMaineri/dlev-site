/* =====================================================================
   D'LEV — Alimentos Artesanais  |  script.js
   =====================================================================
   >>> AQUI VOCÊ EDITA OS DADOS DE CONTATO DA EMPRESA <<<
   Basta alterar os valores abaixo. Eles são aplicados automaticamente
   em TODO o site (botões de WhatsApp, telefone, e-mail e Instagram).
   ===================================================================== */

const CONFIG = {
  // Nome da empresa (usado em mensagens)
  nomeEmpresa: "D'Lev",

  // Telefone / WhatsApp (contato geral e pedidos de CALDOS).
  // Formato internacional, SÓ NÚMEROS: 55 (Brasil) + DDD + número.
  // Ex.: (51) 99981-4666  ->  "5551999814666"
  whatsapp: "5551995266286",

  // WhatsApp que recebe os PEDIDOS DE MARMITAS (combo).
  // >>> CONFIRA ESTE NÚMERO <<< (veio do flyer "Como pedir": 519995266286).
  // Formato: 55 + DDD + número, só números.
  whatsappPedidos: "5551995266286",

  // Telefone exibido na tela (pode formatar como quiser)
  telefoneExibicao: "(51) 99526-6286",

  // E-mail de contato
  email: "contato@dlev.com.br",

  // Instagram (só o usuário, sem @ e sem link)
  instagram: "dlev.caldos",
};

/* ---------------------------------------------------------------------
   Daqui para baixo normalmente não é preciso mexer.
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {

  /* ===== 1. Monta o link do WhatsApp (wa.me) ===== */
  function linkWhats(mensagem) {
    const texto = encodeURIComponent(mensagem || "Olá! Vim pelo site da D'Lev.");
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + texto;
  }

  // Preenche todos os botões/links marcados com data-wa
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    let msg = el.getAttribute("data-wa-msg");
    const produto = el.getAttribute("data-wa-produto");
    if (produto) {
      // Mensagem automática para pedido de um produto específico
      msg = "Olá! Tenho interesse no *" + produto + "* da " + CONFIG.nomeEmpresa +
            ". Poderia me passar mais informações?";
    }
    el.setAttribute("href", linkWhats(msg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ===== 2. Telefone (tel:) ===== */
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.setAttribute("href", "tel:+" + CONFIG.whatsapp);
    if (el.textContent.trim() === "—" || el.textContent.trim() === "") {
      el.textContent = CONFIG.telefoneExibicao;
    }
  });

  /* ===== 3. E-mail (mailto:) ===== */
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + CONFIG.email);
    if (el.textContent.trim() === "—" || el.textContent.trim() === "") {
      el.textContent = CONFIG.email;
    }
  });

  /* ===== 4. Instagram ===== */
  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    el.setAttribute("href", "https://instagram.com/" + CONFIG.instagram);
    if (el.textContent.trim() === "—" || el.textContent.trim() === "") {
      el.textContent = "@" + CONFIG.instagram;
    }
  });

  /* ===== 5. Menu responsivo (abrir/fechar no celular) ===== */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const aberto = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
      toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    // Fecha o menu ao clicar em um link
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ===== 6. Ano atual automático no rodapé ===== */
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ===== 7. Montador de combo de marmitas =====
     Lê os dados de cardapio.js e monta o seletor de combos + sabores.
     O cliente escolhe um combo (5, 10 ou 15) e seleciona os sabores até
     completar as unidades; o botão gera o pedido pronto no WhatsApp. */
  (function montarMarmitas() {
    const app = document.getElementById("marmitasApp");
    if (!app || typeof CARDAPIO === "undefined") return;

    // Período da semana no topo
    const per = document.getElementById("mPeriodo");
    if (per) per.textContent = CARDAPIO.periodo || "";

    const combos = CARDAPIO.combos || [];
    const fmt = (n) => "R$ " + Number(n).toFixed(2).replace(".", ",");

    // Lista única de sabores, marcando a categoria
    const itens = []
      .concat((CARDAPIO.fit || []).map((nome, i) => ({ id: "fit" + i, nome, cat: "Fit" })))
      .concat((CARDAPIO.porcoes || []).map((nome, i) => ({ id: "por" + i, nome, cat: "Porções" })));

    // Estado
    let comboIdx = 0;
    const qtd = {};
    itens.forEach((it) => (qtd[it.id] = 0));

    const alvo = () => (combos[comboIdx] ? combos[comboIdx].unidades : 0);
    const preco = () => (combos[comboIdx] ? combos[comboIdx].preco : 0);
    const total = () => itens.reduce((s, it) => s + qtd[it.id], 0);

    function grupoHTML(titulo, arr) {
      if (!arr.length) return "";
      return (
        '<div class="menu-group"><h4 class="menu-group__title">' + titulo + "</h4>" +
        arr.map((it) =>
          '<div class="mrow" data-id="' + it.id + '">' +
            '<span class="mrow__name">' + it.nome + "</span>" +
            '<span class="stepper">' +
              '<button type="button" class="stepper__btn" data-act="dec" aria-label="Diminuir">−</button>' +
              '<span class="stepper__val" data-val>0</span>' +
              '<button type="button" class="stepper__btn" data-act="inc" aria-label="Aumentar">+</button>' +
            "</span>" +
          "</div>"
        ).join("") +
        "</div>"
      );
    }

    // HTML base do montador
    app.innerHTML =
      '<div class="builder__combos" role="group" aria-label="Escolha o combo">' +
        combos.map((c, i) =>
          '<button type="button" class="combo' + (i === 0 ? " is-active" : "") + '" data-combo="' + i + '">' +
            '<span class="combo__un">' + c.unidades + " marmitas</span>" +
            '<span class="combo__preco">' + fmt(c.preco) + "</span>" +
          "</button>"
        ).join("") +
      "</div>" +
      '<p class="builder__hint">Escolha um combo e selecione os sabores até completar as unidades.</p>' +
      '<div class="builder__menu">' +
        grupoHTML("Fit", itens.filter((i) => i.cat === "Fit")) +
        grupoHTML("Porções", itens.filter((i) => i.cat === "Porções")) +
      "</div>" +
      (CARDAPIO.volume ? '<p class="builder__obs">' + CARDAPIO.volume + "</p>" : "") +
      '<div class="summary" id="mSummary">' +
        '<div class="summary__info">' +
          '<strong id="mCount">0 de ' + alvo() + " marmitas</strong>" +
          '<span id="mPrice">' + fmt(preco()) + "</span>" +
        "</div>" +
        '<a href="#" class="btn btn--primary btn--lg summary__btn" id="mSend" aria-disabled="true">' +
          '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-whats"></use></svg>' +
          "Enviar pedido no WhatsApp</a>" +
      "</div>";

    const elCount = app.querySelector("#mCount");
    const elPrice = app.querySelector("#mPrice");
    const elSend = app.querySelector("#mSend");

    function atualizar() {
      const t = total(), a = alvo();
      elCount.textContent = t + " de " + a + " marmitas";
      elPrice.textContent = fmt(preco());
      const completo = t === a && a > 0;
      elSend.classList.toggle("is-ready", completo);
      elSend.setAttribute("aria-disabled", completo ? "false" : "true");
      app.querySelectorAll(".mrow").forEach((row) => {
        const id = row.getAttribute("data-id");
        row.querySelector("[data-val]").textContent = qtd[id];
        row.querySelector('[data-act="inc"]').disabled = t >= a;
        row.querySelector('[data-act="dec"]').disabled = qtd[id] === 0;
      });
    }

    // Troca de combo
    app.querySelectorAll(".combo").forEach((btn) => {
      btn.addEventListener("click", () => {
        comboIdx = parseInt(btn.dataset.combo, 10);
        app.querySelectorAll(".combo").forEach((b) => b.classList.toggle("is-active", b === btn));
        if (total() > alvo()) itens.forEach((it) => (qtd[it.id] = 0)); // recomeça se passou do novo alvo
        atualizar();
      });
    });

    // Botões + / −
    app.querySelectorAll(".mrow").forEach((row) => {
      const id = row.getAttribute("data-id");
      row.querySelector('[data-act="inc"]').addEventListener("click", () => {
        if (total() < alvo()) { qtd[id]++; atualizar(); }
      });
      row.querySelector('[data-act="dec"]').addEventListener("click", () => {
        if (qtd[id] > 0) { qtd[id]--; atualizar(); }
      });
    });

    // Enviar pedido pelo WhatsApp
    elSend.addEventListener("click", (e) => {
      e.preventDefault();
      if (elSend.getAttribute("aria-disabled") === "true") return;
      const linhas = itens
        .filter((it) => qtd[it.id] > 0)
        .map((it) => "• " + qtd[it.id] + "x " + it.nome);
      const msg =
        "Olá, D'Lev! \u{1F33F} Quero montar meu combo de marmitas (cardápio " + CARDAPIO.periodo + "):\n\n" +
        "\u{1F371} Combo: " + alvo() + " marmitas — " + fmt(preco()) + "\n\n" +
        linhas.join("\n") + "\n\n" +
        "Total: " + total() + " marmitas — " + fmt(preco());
      window.open("https://wa.me/" + CONFIG.whatsappPedidos + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });

    atualizar();

    // Esconde o botão flutuante de WhatsApp enquanto o montador está visível
    const float = document.querySelector(".wa-float");
    if (float && "IntersectionObserver" in window) {
      const secao = document.getElementById("marmitas");
      new IntersectionObserver(function (entries) {
        float.classList.toggle("is-hidden", entries[0].isIntersecting);
      }, { threshold: 0.02 }).observe(secao);
    }
  })();

  /* ===== 7b. Caldos: seletor de tamanho (individual / 5 potes / 10 potes) =====
     Cada card guarda os 3 preços em data-preco. Ao trocar o tamanho, o link do
     WhatsApp é atualizado com a quantidade, o sabor e o preço escolhidos. */
  document.querySelectorAll(".card.caldo").forEach(function (card) {
    const nome = card.getAttribute("data-caldo");
    const tiers = card.querySelectorAll(".tier");
    const btn = card.querySelector("[data-caldo-pedir]");
    if (!tiers.length || !btn) return;
    let sel = card.querySelector(".tier.is-active") || tiers[0];

    function montar() {
      const qtd = sel.getAttribute("data-qtd");
      const preco = sel.getAttribute("data-preco");
      const rotulo = qtd === "1" ? "1 pote (500ml)" : qtd + " potes (500ml)";
      const msg =
        "Olá, D'Lev! \u{1F33F} Quero pedir: " + rotulo + " de " + nome + " — R$ " + preco + ".";
      btn.setAttribute("href", "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg));
    }

    tiers.forEach(function (t) {
      t.addEventListener("click", function () {
        sel = t;
        tiers.forEach(function (x) { x.classList.toggle("is-active", x === t); });
        montar();
      });
    });
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
    montar();
  });

  /* ===== 8. Animações discretas ao rolar a página ===== */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    // Navegadores antigos: mostra tudo
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

});
