# Site D'Lev — Alimentos Artesanais

Site institucional de página única (marmitas e caldos), feito apenas com
**HTML + CSS + JavaScript puro**. Não usa banco de dados, login, painel
administrativo nem WordPress. Funciona em **qualquer hospedagem compartilhada**.

---

## 1. Como organizar os arquivos

Mantenha os arquivos exatamente nesta estrutura (não renomeie nem mova):

```
dlev/
├── index.html        ← a página do site
├── style.css         ← as cores e o visual
├── script.js         ← os contatos (WhatsApp, telefone, e-mail...) e efeitos
├── cardapio.js       ← ⭐ o CARDÁPIO DE MARMITAS da semana (edite toda semana)
└── assets/
    └── images/       ← logotipo e fotos dos produtos
        ├── logo.jpg
        ├── logo-320.jpg
        ├── favicon.png
        ├── apple-touch-icon.png
        ├── hero-tubs.jpg
        ├── caldo-verde.jpg
        ├── caldo-fit.jpg
        ├── caldo-legumes.jpg
        ├── caldo-moranga.jpg
        ├── caldo-feijao.jpg
        └── caldo-feijao-vermelho.jpg
```

---

## 2. Como abrir o site localmente (no seu computador)

O jeito mais simples: **dê dois cliques no arquivo `index.html`**. Ele abre
direto no seu navegador (Chrome, Edge, Firefox etc.). É só isso — não precisa
instalar nada.

> Todos os menus, botões e o formulário aparecem normalmente. Os efeitos de
> animação e os links de WhatsApp são ativados pelo `script.js` automaticamente.

---

## 3. Como alterar textos, imagens e contatos

### 3.1. Contatos (WhatsApp, telefone, e-mail, Instagram)
Abra o arquivo **`script.js`** com qualquer editor de texto (Bloco de Notas
serve) e edite **apenas o bloco `CONFIG`** no topo:

```js
const CONFIG = {
  nomeEmpresa: "D'Lev",
  whatsapp: "5551999814666",       // 55 + DDD + número (só números!)
  telefoneExibicao: "(51) 99981-4666",
  email: "contato@dlev.com.br",
  instagram: "dlev.caldos",        // sem @ e sem link
};
```

Ao salvar, **todos** os botões de WhatsApp, o telefone, o e-mail e o Instagram
do site são atualizados de uma vez. Você só precisa mexer aqui.

> **Formato do WhatsApp:** sempre `55` (Brasil) + DDD + número, tudo junto e só
> com números. Ex.: `(51) 99981-4666` vira `5551999814666`.

> **Dois números:** o `whatsapp` acima recebe o contato geral e os pedidos de
> **caldos**. Os **pedidos de marmitas** (o montador de combo) usam um número
> separado, o `whatsappPedidos`, logo abaixo no mesmo bloco `CONFIG`. Se quiser
> usar o mesmo número para tudo, basta colocar o mesmo valor nos dois.

### 3.2. Caldos — nomes, descrições e os 3 preços
Abra o arquivo **`index.html`** e procure os comentários `EDITAR CALDO`. Cada
caldo tem **três preços** (individual, 5 potes e 10 potes). O cliente escolhe o
tamanho no card e o pedido vai pronto para o WhatsApp. Para editar, troque o
nome, a descrição e os valores em **dois lugares** de cada botão: o `data-preco`
e o texto `R$ ...` (mantenha os dois iguais):

```html
<h4 class="card__title">Caldo de Feijão</h4>            <!-- nome -->
<p class="card__desc">Feijão, linguiçinha... 500ml.</p> <!-- descrição -->
<!-- os 3 tamanhos e preços: -->
<button ... data-preco="35,00"><span ...>Individual</span><span ...>R$ 35,00</span></button>
<button ... data-preco="135,00"><span ...>5 potes</span><span ...>R$ 135,00</span></button>
<button ... data-preco="170,00"><span ...>10 potes</span><span ...>R$ 170,00</span></button>
```

> As **marmitas** (que ficam acima dos caldos na página) têm o cardápio próprio,
> editado no arquivo `cardapio.js` — veja o item 3.6.

### 3.3. Textos "Sobre", horário e endereço
Ainda no `index.html`, procure a seção **`4. SOBRE A EMPRESA`** e a seção
**`6. CONTATO`**. Os pontos a preencher estão marcados com `EDITAR`
(história, região atendida, horário, endereço etc.).

### 3.4. Trocar as fotos
Coloque a nova foto na pasta `assets/images/` e use **o mesmo nome do arquivo
antigo** (ex.: salve a nova foto do Caldo Verde como `caldo-verde.jpg`). Assim
você não precisa mexer no código. Prefira imagens em formato `.jpg`, com no
máximo ~1000 pixels de largura, para o site continuar leve e rápido.

### 3.5. Trocar as cores (opcional)
No arquivo **`style.css`**, no topo, existe um bloco `:root` com as cores da
marca. Basta trocar os códigos de cor (ex.: `--green-dark: #2e4b2c;`).

### 3.6. ⭐ Atualizar o cardápio de marmitas (toda semana)
As marmitas funcionam por **combo** (mínimo de 5 unidades): o cliente escolhe um
combo, seleciona os sabores da semana e o site monta o pedido pronto no WhatsApp.

Como o cardápio muda toda semana, você edita **apenas um arquivo**: **`cardapio.js`**.
Abra ele no Bloco de Notas e altere:

```js
const CARDAPIO = {
  periodo: "15/08 a 19/08",              // ← o período da semana

  combos: [                              // ← os combos e preços (mudam pouco)
    { unidades: 5,  preco: 150 },
    { unidades: 10, preco: 280 },
    { unidades: 15, preco: 390 },
  ],

  fit: [                                 // ← sabores "Fit" da semana
    "Iscas de coração aceboladas • purê de moranga • vagem e milho refogadas",
    "Almôndegas de frango • arroz integral verde • repolho refogado",
    // ...
  ],

  porcoes: [                             // ← sabores "Porções" da semana
    "Escondidinho de moranga com carne moída",
    // ...
  ],
};
```

Regras simples:
- Cada sabor é um texto **entre aspas** e termina com **vírgula**.
- Para **adicionar** um sabor, copie uma linha e cole abaixo.
- Para **remover**, apague a linha inteira.
- Os preços são só números (ex.: `150` vira `R$ 150,00` no site).
- Depois de salvar e publicar, o site já mostra o cardápio novo. 🎉

> **Onde vão os pedidos de marmita:** para o número `whatsappPedidos` do
> `script.js` (veja o item 3.1). O contato geral e os caldos continuam no outro
> número.

---

## 4. Como publicar em uma hospedagem compartilhada

1. Contrate um plano de hospedagem simples (qualquer um que aceite "sites
   estáticos" / HTML serve — praticamente todos servem).
2. Acesse o painel da hospedagem e abra o **Gerenciador de Arquivos** ou use um
   programa de **FTP** (ex.: FileZilla), com os dados que a hospedagem enviar.
3. Entre na pasta pública do site — normalmente chamada **`public_html`**
   (às vezes `www` ou `htdocs`).
4. **Envie para lá todo o conteúdo da pasta do site**: `index.html`,
   `style.css`, `script.js`, `cardapio.js` e a pasta `assets` inteira.
   Mantenha a mesma estrutura de pastas.
5. Pronto! Acesse o seu domínio (ex.: `https://dlev.com.br`) e o site estará no ar.

> O arquivo precisa se chamar **`index.html`** para abrir automaticamente ao
> acessar o domínio.

---

## 5. Como configurar o formulário de contato

O formulário já vem pronto para funcionar com o **FormSubmit** — um serviço
**gratuito** que envia as mensagens do formulário direto para o seu e-mail,
**sem precisar de banco de dados**. Passo a passo:

1. No arquivo `index.html`, procure a linha do formulário:
   ```html
   <form ... action="https://formsubmit.co/contato@dlev.com.br" ...>
   ```
2. Troque `contato@dlev.com.br` pelo **e-mail que vai RECEBER as mensagens**.
3. Publique o site (passo 4) e envie **uma mensagem de teste** pelo próprio
   formulário do site.
4. Na primeira vez, o FormSubmit envia um e-mail de **confirmação** para o seu
   endereço. Abra esse e-mail e clique no link para **ativar**. (Isso é feito
   só uma vez.)
5. A partir daí, todas as mensagens chegam no seu e-mail. 🎉

> **Alternativas:** se preferir, o serviço **Formspree** (formspree.io) funciona
> de forma parecida — basta trocar o endereço do `action` pelo que eles fornecem.
> E, de qualquer forma, o site já tem vários botões de **WhatsApp** para contato
> direto, que funcionam sem nenhuma configuração.

---

## 6. Como substituir os dados de exemplo pelos dados reais

Estes valores estão como **exemplo** e devem ser trocados pelos dados reais:

| Onde                          | Valor de exemplo            | Onde trocar                  |
|-------------------------------|-----------------------------|------------------------------|
| WhatsApp geral / caldos       | `(51) 99981-4666`           | `script.js` → `CONFIG` (`whatsapp`) |
| WhatsApp dos pedidos (marmita)| `519995266286` (do flyer)   | `script.js` → `CONFIG` (`whatsappPedidos`) |
| E-mail                        | `contato@dlev.com.br`       | `script.js` → `CONFIG` **e** `index.html` (formulário) |
| Instagram                     | `dlev.caldos`               | `script.js` → `CONFIG`       |
| Endereço / região             | Porto Alegre - RS           | `index.html` → seções Sobre e Contato |
| Horário                       | "das 9h às 20h"             | `index.html` → seções Sobre e Contato |
| Preços dos **caldos**         | 3 preços por caldo          | `index.html` → cada card de caldo (item 3.2) |
| Cardápio/preços das **marmitas** | sabores da semana        | **`cardapio.js`** (veja o item 3.6) |

> **Atenção ao número dos pedidos de marmita:** ele veio do flyer "Como pedir"
> (`519995266286`) e está gravado como `whatsappPedidos` no `script.js`.
> **Confira se está correto** clicando no botão "Enviar pedido no WhatsApp":
> se abrir o número errado, ajuste o valor no `script.js` (formato: 55 + DDD +
> número, só números).

> **Fotos das marmitas:** o cardápio de marmitas é por texto (muda toda semana),
> então não usa foto por prato. Se quiser exibir uma foto real das marmitas no
> lugar, é só avisar que eu adiciono.

---

### Dúvidas rápidas
- **Preciso saber programar?** Não. Para o dia a dia, você só edita textos no
  `index.html` e os contatos no `script.js`.
- **Mexi em algo e quebrou.** Guarde sempre uma cópia dos arquivos antes de
  editar, para poder voltar atrás.
- **O ano do rodapé** se atualiza sozinho, todo dia 1º de janeiro. Não precisa mexer.
