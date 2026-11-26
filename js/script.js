// Menu responsivo: o ícone mostra o estado atual e os links fecham o menu.
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu-principal');

botaoMenu?.addEventListener('click', () => {
  const aberto = botaoMenu.getAttribute('aria-expanded') !== 'true';
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  botaoMenu.textContent = aberto ? '✕' : '☰';
  menu?.classList.toggle('aberto', aberto);
});

menu?.addEventListener('click', evento => {
  if (!evento.target.closest('a')) return;
  menu.classList.remove('aberto');
  botaoMenu?.setAttribute('aria-expanded', 'false');
  botaoMenu?.setAttribute('aria-label', 'Abrir menu');
  if (botaoMenu) botaoMenu.textContent = '☰';
});

// Leitura e gravação seguras: o site continua se o navegador bloquear o armazenamento.
const storage = {
  get(chave, padrao = '') {
    try { return localStorage.getItem(chave) ?? padrao; } catch { return padrao; }
  },
  set(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch { /* O site continua funcional sem persistência. */ }
  }
};

// Tema escolhido fica salvo no navegador.
const botaoTema = document.querySelector('#alternar-tema');
const aplicarTema = claro => {
  document.body.classList.toggle('tema-claro', claro);
  document.querySelectorAll('img[data-imagem-clara]').forEach(imagem => {
    imagem.src = claro ? imagem.dataset.imagemClara : imagem.dataset.imagemEscura;
    imagem.closest('.item-imagem')?.style.setProperty('--arte-item', `url("${imagem.src}")`);
  });
  botaoTema?.setAttribute('aria-pressed', claro);
  if (botaoTema) botaoTema.textContent = claro ? '☾ Tema escuro' : '☼ Tema claro';
};
aplicarTema(storage.get('tema-andromeda') === 'claro');
botaoTema?.addEventListener('click', () => {
  const claro = !document.body.classList.contains('tema-claro');
  aplicarTema(claro);
  storage.set('tema-andromeda', claro ? 'claro' : 'escuro');
});

// Saudação muda conforme o horário local do visitante.
const saudacao = document.querySelector('#saudacao-heroi');
if (saudacao) {
  const hora = new Date().getHours();
  saudacao.textContent = hora < 12 ? 'Bom dia, viajante.' : hora < 18 ? 'Boa tarde, viajante.' : 'Boa noite, viajante.';
}

// História pode ser expandida e recolhida sem recarregar a página.
const botaoHistoria = document.querySelector('#ver-historia');
const historia = document.querySelector('#historia-extra');
botaoHistoria?.addEventListener('click', () => {
  const expandida = botaoHistoria.getAttribute('aria-expanded') !== 'true';
  botaoHistoria.setAttribute('aria-expanded', expandida);
  historia.hidden = !expandida;
  historia.classList.toggle('revelado', expandida);
  botaoHistoria.textContent = expandida ? 'Ver menos' : 'Ver história completa';
});

// Treino aumenta um atributo por clique, respeitando o limite de 20 pontos.
const atributos = [...document.querySelectorAll('.lista-atributos .status')];
const botaoTreino = document.querySelector('#treinar-atributo');
let indiceTreino = 0;
botaoTreino?.addEventListener('click', () => {
  const disponivel = atributos.findIndex((_, i) => {
    const status = atributos[(indiceTreino + i) % atributos.length];
    return Number(status.querySelector('.status-topo strong').textContent.split('/')[0]) < 20;
  });
  if (disponivel < 0) {
    document.querySelector('#aviso-atributo').textContent = 'Todos os atributos chegaram ao máximo.';
    return;
  }
  const status = atributos[(indiceTreino + disponivel) % atributos.length];
  const nome = status.querySelector('.status-topo span').textContent;
  const valorEl = status.querySelector('.status-topo strong');
  const valor = Number(valorEl.textContent.split('/')[0]) + 1;
  valorEl.textContent = `${valor}/20`;
  status.querySelector('.barra-preenchida').style.width = `${valor * 5}%`;
  document.querySelector('#aviso-atributo').textContent = `${nome} aumentou para ${valor} de 20.`;
  indiceTreino = (indiceTreino + disponivel + 1) % atributos.length;
});

// INVENTÁRIO: dados, filtros, favoritos e criação dos cards.
const itens = [
  { id: 'lamina', nome: 'Lâmina de Érebo', tipo: 'arma', rotuloTipo: 'Arma mágica', raridade: 'Lendária', descricao: 'Forjada nas profundezas do Submundo e gravada com runas ancestrais. Canaliza energia sombria para fortalecer ataques mágicos.', imagem: 'lamina_erebo.png' },
  { id: 'obolo', nome: 'Óbolo de Caronte', tipo: 'reliquia', rotuloTipo: 'Relíquia espiritual', raridade: 'Raro', descricao: 'Moeda ligada ao barqueiro que conduz as almas. Ajuda a atravessar barreiras espirituais.', imagem: 'obolo_caronte.png' },
  { id: 'roma', nome: 'Romã do Submundo', tipo: 'consumivel', rotuloTipo: 'Consumível mágico', raridade: 'Épica', descricao: 'Fruto carregado de energia do reino dos mortos. Oferece proteção temporária contra maldições.', imagem: 'roma.png' },
  { id: 'olho', nome: 'Olho de Hades', tipo: 'reliquia', rotuloTipo: 'Artefato místico', raridade: 'Raro', descricao: 'Fragmento mágico que ajuda a perceber ilusões e criaturas escondidas.', imagem: 'olho_hades.png' },
  { id: 'vela', nome: 'Vela de Perséfone', tipo: 'ritual', rotuloTipo: 'Item ritualístico', raridade: 'Incomum', descricao: 'Vela consagrada para cerimônias do Submundo. Acalma espíritos hostis por um curto período.', imagem: 'vela_persefone.png' },
  { id: 'pena', nome: 'Pena da Esfinge', tipo: 'ferramenta', rotuloTipo: 'Ferramenta mágica', raridade: 'Comum', descricao: 'Ferramenta para registrar contratos antigos com símbolos rúnicos.', imagem: 'pena_esfinge.png' },
  { id: 'elixir', nome: 'Elixir do Submundo', tipo: 'consumivel', rotuloTipo: 'Consumível mágico', raridade: 'Épica', descricao: 'Preparação alquímica que recupera energia mágica e aguça os sentidos.', imagem: 'elixires.png' },
  { id: 'grimorio', nome: 'Grimório das Sombras', tipo: 'livro', rotuloTipo: 'Livro arcano', raridade: 'Lendária', descricao: 'Reúne conhecimentos proibidos sobre rituais avançados e feitiços do Submundo.', imagem: 'grimorio.png' }
];

const listaItens = document.querySelector('#lista-itens');
const filtrosItens = document.querySelector('#filtros-inventario');
const contadorItens = document.querySelector('#contador-itens');
const filtroRaridade = document.querySelector('#filtro-raridade');
let tipoAtivo = 'todos';
let favoritos = [];
try {
  const salvos = JSON.parse(storage.get('itens-favoritos', '[]'));
  favoritos = Array.isArray(salvos) ? salvos : [];
} catch { favoritos = []; }

// Atualiza os cards do inventário conforme os filtros e favoritos.
// Monta novamente os cards visíveis do inventário.
function renderizarItens() {
  if (!listaItens) return;
  const exibidos = itens.filter(item =>
    (tipoAtivo === 'todos' || item.tipo === tipoAtivo) &&
    (!filtroRaridade || filtroRaridade.value === 'todas' || item.raridade.toLowerCase() === filtroRaridade.value)
  );
  listaItens.replaceChildren();
  exibidos.forEach(item => {
    const card = document.createElement('article');
    card.className = 'item';
    const imagem = document.createElement('img');
    imagem.dataset.imagemEscura = `imagens/itens/${item.imagem}`;
    imagem.src = imagem.dataset.imagemEscura;
    imagem.alt = item.nome;
    imagem.loading = 'lazy';
    const areaImagem = document.createElement('div');
    areaImagem.className = 'item-imagem';
    areaImagem.style.setProperty('--arte-item', `url("${imagem.src}")`);
    areaImagem.append(imagem);
    const info = document.createElement('div');
    info.className = 'info-item';
    const titulo = document.createElement('h4');
    titulo.textContent = item.nome;
    const raridade = document.createElement('span');
    const classeRaridade = { 'Épica': 'epica', 'Lendária': 'lendaria' }[item.raridade] || item.raridade.toLowerCase();
    raridade.className = `raridade ${classeRaridade}`;
    raridade.textContent = item.raridade.toUpperCase();
    const tipo = document.createElement('p');
    tipo.className = 'tipo-item';
    tipo.textContent = `Tipo: ${item.rotuloTipo}`;
    const descricao = document.createElement('p');
    descricao.textContent = item.descricao;
    const favorito = document.createElement('button');
    const marcado = favoritos.includes(item.id);
    favorito.className = 'botao-favorito';
    favorito.type = 'button';
    favorito.dataset.item = item.id;
    favorito.setAttribute('aria-pressed', marcado);
    favorito.textContent = marcado ? '★ Favorito' : '☆ Favoritar';
    info.append(titulo, raridade, tipo, descricao, favorito);
    card.append(areaImagem, info);
    listaItens.append(card);
  });
  contadorItens.textContent = `Exibindo ${exibidos.length} de ${itens.length} itens`;
}

// Cria filtros e trata cliques em categorias e favoritos.
// Configura os filtros por categoria, raridade e favoritos.
if (filtrosItens) {
  const categorias = [['todos', 'Todos'], ['arma', 'Armas'], ['reliquia', 'Relíquias'], ['consumivel', 'Consumíveis'], ['ritual', 'Rituais'], ['ferramenta', 'Ferramentas'], ['livro', 'Livros']];
  categorias.forEach(([tipo, rotulo]) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'botao-filtro';
    botao.textContent = rotulo;
    botao.dataset.tipo = tipo;
    botao.setAttribute('aria-pressed', tipo === tipoAtivo);
    filtrosItens.append(botao);
  });
  filtrosItens.addEventListener('click', evento => {
    const botao = evento.target.closest('[data-tipo]');
    if (!botao) return;
    tipoAtivo = botao.dataset.tipo;
    filtrosItens.querySelectorAll('[data-tipo]').forEach(filtro => filtro.setAttribute('aria-pressed', filtro === botao));
    renderizarItens();
  });
  filtroRaridade?.addEventListener('change', renderizarItens);
  listaItens.addEventListener('click', evento => {
    const botao = evento.target.closest('.botao-favorito');
    if (!botao) return;
    const id = botao.dataset.item;
    favoritos = favoritos.includes(id) ? favoritos.filter(favorito => favorito !== id) : [...favoritos, id];
    storage.set('itens-favoritos', JSON.stringify(favoritos));
    renderizarItens();
    document.querySelector('#contador-itens').textContent += ` · ${favoritos.length} favoritos`;
  });
  renderizarItens();
}

// XP E MISSÕES: cada 100 XP sobe um nível e conclui uma missão.
const botaoXp = document.querySelector('#avancar-missao');
// Controla o XP, o nível atual e a liberação das missões.
if (botaoXp) {
  let xpTotal = 0;
  const barraXp = document.querySelector('#barra-xp');
  const trilhoXp = barraXp.parentElement;
  const rotuloXp = document.querySelector('#progresso-missao');
  const avisoXp = document.querySelector('#aviso-missao');
  const missoes = [...document.querySelectorAll('.lista-conquistas .conquista')];

  botaoXp.addEventListener('click', () => {
    xpTotal += 25;
    const nivel = Math.floor(xpTotal / 100) + 25;
    const progresso = xpTotal % 100;
    const completouNivel = progresso === 0;
    barraXp.style.width = `${completouNivel ? 100 : progresso}%`;
    trilhoXp.setAttribute('aria-valuenow', completouNivel ? 100 : progresso);
    rotuloXp.textContent = completouNivel
      ? `${xpTotal} XP · Nível ${nivel - 1} · 100/100`
      : `${xpTotal} XP · Nível ${nivel} · ${progresso}/100`;
    if (progresso !== 0) {
      avisoXp.textContent = `Você ganhou 25 XP. ${100 - progresso} XP para o próximo nível.`;
      return;
    }

    document.querySelector('#nivel-heroi').textContent = nivel;
    document.querySelector('#nivel-ficha').textContent = nivel;
    const proxima = missoes.find(missao => missao.classList.contains('bloqueada'));
    if (proxima) {
      proxima.classList.replace('bloqueada', 'concluida');
      proxima.querySelector('.estado-conquista').textContent = 'CONCLUÍDO';
      avisoXp.textContent = `Nível up! Nível ${nivel} alcançado. Missão concluída: ${proxima.querySelector('h4').textContent}.`;
    } else {
      avisoXp.textContent = `Nível up! Andrômeda alcançou o nível ${nivel}. Todas as missões já foram liberadas.`;
    }

    // Mantém a barra cheia tempo suficiente para o jogador ver o nível concluído.
    botaoXp.disabled = true;
    window.setTimeout(() => {
      barraXp.style.width = '0%';
      trilhoXp.setAttribute('aria-valuenow', 0);
      rotuloXp.textContent = `${xpTotal} XP · Nível ${nivel} · 0/100`;
      botaoXp.disabled = false;
    }, 900);
  });
}

// Formulários do site validam os campos e mostram o resultado na própria página.
document.querySelectorAll('.formulario-contato').forEach(formulario => {
  formulario.noValidate = true;
  const status = formulario.querySelector('[aria-live="polite"]');
  formulario.addEventListener('input', evento => {
    evento.target.removeAttribute('aria-invalid');
    status.textContent = '';
    status.classList.remove('sucesso');
  });
  // Valida os campos e exibe o resultado do envio.
formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    const obrigatorios = [...formulario.querySelectorAll('[required]')];
    const vazio = obrigatorios.find(campo => !campo.value.trim());
    const email = formulario.querySelector('input[type="email"]');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value.trim() || '');
    const invalido = vazio || (!emailValido ? email : null);
    if (invalido) {
      invalido.setAttribute('aria-invalid', 'true');
      status.textContent = vazio ? `Preencha o campo ${vazio.labels[0]?.textContent || 'obrigatório'}.` : 'Digite um e-mail válido, como nome@exemplo.com.';
      invalido.focus();
      return;
    }
    status.textContent = 'Formulário validado! Este protótipo ainda não envia mensagens para um servidor.';
    status.classList.add('sucesso');
  });
});
