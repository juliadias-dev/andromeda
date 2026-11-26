# Andrômeda — Herdeira das Sombras

Projeto acadêmico de front-end que apresenta a ficha de uma personagem fictícia em formato de página interativa. A interface combina uma identidade visual de fantasia sombria com recursos de navegação, atributos, inventário e conquistas.

## Objetivo

Aplicar HTML semântico, CSS responsivo e JavaScript no desenvolvimento de um site temático. A página foi organizada para apresentar a personagem e permitir que o visitante interaja com algumas informações da ficha.

## Tecnologias

- **HTML5:** estrutura e conteúdo das páginas.
- **CSS3:** cores, tipografia, cartões, animações e adaptação para celular.
- **JavaScript:** menu móvel, troca de tema, atributos, inventário, XP, conquistas e validação dos formulários.
- **Google Fonts:** fontes Cinzel e EB Garamond.
- **Local Storage:** guarda o tema escolhido e os itens favoritos neste navegador.

## Páginas e conteúdo

- **Início (`index.html`):** apresentação, ficha, atributos, habilidades, inventário, feitos memoráveis, galeria e contato.
- **Guilda (`guilda.html`):** formulário temático de entrada na guilda.
- **Mensagem (`mensagem.html`):** formulário de contato.

## Funcionalidades interativas

- O menu se adapta a telas pequenas e pode ser aberto pelo botão sanduíche.
- O botão do cabeçalho alterna entre os temas escuro e claro. A escolha fica salva no navegador.
- O treino aumenta os atributos até o limite indicado na página.
- Os filtros organizam o inventário por tipo e raridade; cada item pode ser marcado como favorito.
- Cada clique no botão de XP concede 25 pontos. Ao completar 100 XP, o nível aumenta e uma missão bloqueada é liberada como concluída.
- Os formulários verificam campos obrigatórios e o formato do e-mail. Eles demonstram validação no navegador, mas não enviam dados para um servidor.

## Organização dos arquivos

```text
ficha-heroi-parte2/
├── index.html              # Página principal
├── guilda.html             # Formulário da guilda
├── mensagem.html           # Formulário de contato
├── css/
│   ├── style.css           # Layout e tema da página principal
│   └── formulario.css      # Estilos dos formulários
├── js/
│   └── script.js           # Interações da página
└── imagens/
    ├── habilidades/        # Ícones das habilidades
    └── itens/              # Imagens do inventário
```

## Como abrir

1. Baixe ou extraia a pasta do projeto.
2. Abra `index.html` em um navegador atualizado.
3. Para testar os formulários, abra `guilda.html` e `mensagem.html`.

O site também pode ser publicado em hospedagem estática, como GitHub Pages. As fontes do Google Fonts precisam de conexão com a internet; sem ela, o navegador usa fontes alternativas.

## Decisões de UI/UX

- **Visibilidade do estado:** o menu troca o ícone e atualiza `aria-expanded`; o botão de tema informa qual tema será ativado; filtros e favoritos indicam seleção com `aria-pressed`.
- **Feedback imediato:** ações de XP, treino, filtros, favoritos e formulários atualizam mensagens ou estados visuais na própria página.
- **Prevenção de erros:** campos obrigatórios e e-mail são validados antes de aceitar o formulário; o campo inválido recebe foco e uma mensagem orienta a correção.
- **Controle do usuário:** menu, história expandida e filtros podem ser fechados, recolhidos ou redefinidos sem recarregar a página.
- **Consistência visual:** os novos estados reutilizam as cores e transições da ficha; o tema escolhido é aplicado à página e às imagens correspondentes.

## Funcionalidade complementar

O projeto usa `localStorage` para lembrar o tema selecionado e os itens favoritos entre visitas no mesmo navegador. Esse recurso complementa os requisitos básicos do edital.

## Como explicar o código

- No HTML, cada `section` representa uma parte da ficha e usa identificadores para a navegação do menu.
- No CSS, as regras definem a aparência dos elementos; media queries ajustam o layout para telas menores.
- No JavaScript, ouvintes de eventos reagem a cliques e mudanças nos formulários, atualizando a página sem recarregá-la.
- O tema é aplicado pela classe `tema-claro` no `body`; as regras CSS dessa classe alteram as cores da interface.

## Referências do projeto

- [Protótipo no Figma](https://www.figma.com/proto/PniRbYbXVgz3ilxScx6Ln7/Sem-t%C3%ADtulo?node-id=0-1&t=SKAVttSR346JGSTN-1)
- [Projeto publicado no GitHub Pages](https://juliadias-dev.github.io/andromeda/)
- [Repositório no GitHub](https://github.com/juliadias-dev/andromeda)

## Autoria

**Julia Ribeiro Dias** — RA 266518  
Engenharia da Computação — 2º semestre  
E-mail: jd266518@alunos.unisanta.br

Projeto desenvolvido para fins educacionais na disciplina de Tecnologia Web.
