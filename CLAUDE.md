# Página de captação: Realize International Realty (Flórida)

Projeto de marketing e pré-vendas no Brasil para a Realize International Realty LLC (Orlando) e a corretora Mara Brasil. O objetivo desta página é levar brasileiros que veem anúncios no Meta para uma conversa por WhatsApp (consultoria estratégica sem custos).

Este arquivo existe para que qualquer sessão do Claude (ou pessoa) que abrir esta pasta entenda o estado do trabalho e as decisões já tomadas. Leia antes de editar.

Padrão visual (copiado do site da Realize): fundo azul-marinho quase preto (#020914, #04111F, #01060E), dourado #C89B45 nos botões com texto escuro, dourado claro #F2D99B nos detalhes, texto creme #F6F0E6, títulos em Cormorant Garamond (peso 600) e textos em Inter, botões em pílula com texto em maiúsculas.

Regras que não podem ser quebradas:
- Toda peça mostra o nome da imobiliária (Realize International Realty LLC) junto do contato (regra FREC 61J2-10.025 da Flórida).
- Nada de promessa absoluta ("se paga sozinho", "patrimônio blindado", "aprovado"). Aluguel: "pode cobrir boa parte da prestação", sem garantia.
- Evitar marcas da Disney. Usar "15 min dos parques".
- Aviso no rodapé: condições dependem de análise de crédito; aluguel e valorização são estimativas, sem garantia.

## Estado atual da página (handoff)

Página única de captação em `site/index.html` (CSS em `site/css/page.css` e `site/css/style.css`, scripts em `site/js/`). Formato VSL: headline + vídeo grande no topo, botões levam ao WhatsApp. O quiz (`site/quiz.html`) e as versões antigas (`a.html`, `b.html`) não fazem parte do fluxo atual.

### Decisões que não devem ser desfeitas
- **Oferta:** "consultoria estratégica sem custos". Não usar "gratuita/grátis" (soa barato).
- **Headline:** "Pare de perder meses pesquisando. Veja em poucos minutos como um brasileiro compra imóvel na Flórida, com possibilidade de entrada a partir de 25% e sem sair do Brasil."
- **Tom:** direto e agressivo na dor (pesquisar sem decidir, medo de errar, custo de esperar). Sem promessa absoluta ("blindagem", "aprovado", "se paga sozinho"). Usar "proteção patrimonial".
- **Visto:** não precisa de visto americano nem de green card. O visto só influencia o financiamento.
- **Não mostrar número de avaliações** (49 é pouco). Depoimentos: 2 vídeos pequenos + 4 avaliações reais do Google em texto (extraídas de marabrasilimoveis.com).
- **WhatsApp único em toda a página:** +1 (689) 323-1376. Está em `site/js/config.js` (campo `WHATSAPP`). A mensagem pronta é montada em `site/js/track.js` e traz a referência da página e o botão de origem (`[Ref: LP Consultoria Estratégica Flórida | botão: ...]`).
- **Licença única:** BK3596555 (licença de corretora no Estado da Flórida). Não existe um segundo número.
- **Botão de ação sempre visível** (não depende de assistir ao vídeo).
- **Layout:** conteúdo na largura toda (container 1500px), alinhado à esquerda, hero centralizado. Todo ajuste de celular fica dentro de `@media (max-width:759px)` no fim de `page.css`; computador e tablet não devem mudar por causa dele.
- **Rodapé** no estilo do site da Realize, com redes sociais, Política de Privacidade (texto real do site deles), Termos de Uso e Cookies (redigidos por nós, precisam de revisão jurídica) e aviso de cookies (Aceitar/Rejeitar). Se rejeitar, o Meta Pixel não liga.
- A página está com `noindex` enquanto não for publicada de verdade.

### Pendências
- ID do Pixel da Meta (`PIXEL_ID` em `config.js`).
- Webhook do CRM (`CRM_WEBHOOK`) e link de agenda (`AGENDA_URL`), se forem usados.
- Revisão jurídica dos Termos de Uso e do aviso de Cookies.
- Nome do segundo depoimento (hoje "Cliente Realize").
- Novo vídeo da VSL alinhado à headline (roteiro em `roteiro-vsl-pratico.md`). O vídeo atual fala de família e patrimônio e diz "consultoria gratuita" nas legendas.
- Hospedagem de verdade (Netlify, Cloudflare Pages ou GitHub Pages). Existe o repositório `lauroabrahao/funil-florida` no GitHub, criado e público, com o envio possivelmente incompleto.

### Como testar localmente
Abrir um servidor simples dentro de `site/` (por exemplo `python -m http.server 8765`) e acessar `http://localhost:8765/index.html`.

## Ajustes de compliance (20/11/2026)

Aplicados a partir da lista de compliance da Realize. Não desfazer sem revisão.
- **Chamada:** "Atenção: você que mora no Brasil e quer comprar imóvel na Flórida." Não falar de "brasileiro" de forma genérica na chamada.
- **Headline:** "...com possibilidade de entrada a partir de 25% e sem sair do Brasil." Abaixo, em tamanho menor: "Condições de financiamento sujeitas à análise e aprovação da instituição financeira. Custos de fechamento podem ser adicionais."
- **R$ 500 mil:** sempre com a ressalva: "Dependendo do imóvel e das condições de financiamento, é possível iniciar seu investimento com menos de R$ 500 mil" e "Valores sujeitos à variação cambial, custos de aquisição e condições de financiamento." Não usar mais "você não precisa nem de R$ 500 mil".
- **Visto/Green Card:** "Em geral, não é necessário... observadas as restrições legais aplicáveis. A compra de um imóvel não concede automaticamente visto, residência ou benefícios imigratórios."
- **Aluguel:** "A renda de aluguel pode contribuir para o pagamento do financiamento... Não há garantia de rentabilidade." Aviso de locação anual ou por temporada (zoneamento, regras da comunidade ou condomínio).
- **Ecossistema:** a Realize atua na intermediação imobiliária; os parceiros são de livre escolha do cliente.
- **Identificação:** "Uma imobiliária americana, sediada na Flórida, com corretores licenciados e atendimento especializado em português." Nome Realize International Realty LLC no rodapé e junto do contato.
- **Equal Housing Opportunity** no rodapé (selo feito em SVG; trocar pelo arquivo oficial se a Realize tiver).
- **Aviso de contato** ("Ao enviar seus dados, você solicita o contato...") com Política de Privacidade clicável, perto dos botões principais. O quiz tem formulário e ainda precisa receber o mesmo aviso.
- **Política de Privacidade (LGPD):** empresa responsável, dados, finalidades, bases legais (LGPD), contato por telefone/WhatsApp/e-mail, compartilhamento com parceiros, transferência para os EUA, rastreamento e remarketing, retenção, direitos e contato.
- **Cookies:** o aviso tem "Aceitar todos", "Rejeitar cookies não essenciais" e "Gerenciar preferências". O Meta Pixel só liga depois da autorização de marketing (opt-in), e a escolha pode ser mudada em "Preferências de cookies", no rodapé. A escolha fica em `localStorage` (`realize-cookies`).
- **O vídeo principal** ainda traz frases mais fortes do que o texto da página ("você não precisa nem de 500 mil reais", "blindagem", "país seguro", "consultoria gratuita"). Há um aviso legal curto abaixo do vídeo. O ideal é regravar com o roteiro `roteiro-vsl-pratico.md`, adaptado a estas regras.
- **A confirmar com a Realize:** disponibilidade real das condições de financiamento e dos valores anunciados.
- Foto da Mara: `site/images/mara.jpg`.

## Como o projeto está no ar (infraestrutura)

- **Página:** https://realizehome.com.br, publicada pelo GitHub Pages a partir deste repositório (`lauroabrahao/funil-florida`, ramo `main`, raiz). Cada `git push` publica em cerca de 1 minuto. O arquivo `CNAME` contém o domínio; não apagar.
- **Quiz:** https://quiz.realizehome.com.br, outro repositório (`lauroabrahao/quiz-florida`), também no GitHub Pages. O GitHub Pages só serve um domínio por repositório, por isso são dois.
- **Domínio:** comprado na Hostinger (`realizehome.com.br`). A Hostinger só cuida do DNS: 4 registros A em `@` (185.199.108.153, .109.153, .110.153, .111.153) e CNAME `www` e `quiz` apontando para `lauroabrahao.github.io`. Não há hospedagem na Hostinger.
- **HTTPS:** certificado emitido pelo GitHub e "Forçar HTTPS" ligado nos dois repositórios. Se algum dia o certificado sumir, tirar e recolocar o domínio em Settings > Pages força nova emissão.
- **Cache:** o GitHub Pages manda o navegador guardar a página por 10 minutos. Para ver uma mudança na hora, Ctrl+Shift+R ou janela anônima.
- **O GitHub às vezes cria commits sozinho no `CNAME`** quando o domínio é alterado. Se o `git push` for recusado, rodar `git pull --rebase origin main` e enviar de novo.
- Os vídeos originais ficam em `videos/` (o principal tem 61 MB, perto do limite recomendado do GitHub de 50 MB).

## Como trabalhar junto (git)

1. Antes de começar: `git pull`.
2. Depois de editar: `git add -A`, `git commit -m "o que mudou"`, `git push`.
3. Testar local antes de enviar: dentro desta pasta, `python -m http.server 8765` e abrir `http://localhost:8765/index.html`.
4. Não deixar a pasta do projeto dentro do OneDrive (já causou "branch quebrada" em outro projeto).

## Pendências atuais (20/11/2026)

- ID do Pixel da Meta (`PIXEL_ID` em `js/config.js`). O Pixel só liga depois da autorização de cookies de marketing.
- Regravar o vídeo principal, alinhado às regras de compliance (o atual fala "consultoria gratuita", "blindagem", "país seguro" e "nem de 500 mil reais"). Roteiro-base no computador da Lauro (`roteiro-vsl-pratico.md`).
- Confirmar com a Realize a disponibilidade real das condições de financiamento e dos valores anunciados.
- Selo Equal Housing Opportunity: hoje é um desenho em SVG; trocar pelo arquivo oficial se existir.
- Revisão jurídica dos Termos de Uso e do aviso de Cookies (redigidos por nós).
- Destino dos leads do quiz que não enviam a mensagem no WhatsApp: a conta do Google da Lauro está sem armazenamento (não cria planilha). Opções: Chatwoot (API pública da caixa de entrada), Supabase, outra conta do Google ou automação (n8n/Make).
- Levar para o quiz o mesmo aviso de envio de dados, a política e o banner de cookies novos.
- "São Luis" nas legendas dos depoimentos está sem acento, como a Lauro escreveu ("São Luís" é o correto).
