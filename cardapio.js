/* =====================================================================
   D'LEV — CARDÁPIO DA SEMANA (marmitas)
   =====================================================================
   >>> ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR TODA SEMANA <<<

   Basta trocar:
     • "periodo"  → o texto do período da semana;
     • as listas "fit" e "porcoes" → os sabores da semana;
     • (se mudar de valor) os preços em "combos".

   Dicas:
     - Cada sabor é um texto entre aspas, terminando com vírgula.
     - Use o símbolo • para separar os itens do prato (opcional).
     - Para adicionar um sabor, copie uma linha e cole abaixo.
     - Para remover, apague a linha inteira.
   ===================================================================== */

const CARDAPIO = {

  // Período exibido no site (ex.: "15/08 a 19/08")
  periodo: "15/08 a 19/08",

  // Volume de cada marmita (aparece como observação)
  volume: "Marmitas de 350ml cada",

  // Combos disponíveis (quantidade de unidades e preço em reais).
  // Pedido mínimo: 5 unidades. Não vendemos marmitas avulsas.
  combos: [
    { unidades: 5,  preco: 150 },
    { unidades: 10, preco: 280 },
    { unidades: 15, preco: 390 },
  ],

  // ---------- MARMITAS FIT ----------
  fit: [
    "Iscas de coração aceboladas • purê de moranga • vagem e milho refogadas",
    "Almôndegas de frango • arroz integral verde • repolho refogado",
    "Cubos de frango ao curry • purê de batata doce roxa • cenoura e abobrinha refogadas",
    "Iscas de carne aceboladas • penne integral ao sugo • berinjela refogada",
    "Tilápia • arroz com açafrão • mix de legumes",
  ],

  // ---------- MARMITAS PORÇÕES ----------
  porcoes: [
    "Escondidinho de moranga com carne moída",
    "Escondidinho de batata doce roxa com carne moída de frango",
    "Panqueca de cenoura com carne moída e ricota",
    "Nhoque de beterraba com molho de queijo",
    "Lasanha de berinjela com frango desfiado",
  ],

};
