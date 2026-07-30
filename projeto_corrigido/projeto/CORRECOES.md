# Relatório de correções

## Causa principal das imagens quebradas

O projeto possuía três frontends diferentes:

- `server.py` servia `frontend/`, mas essa pasta tinha somente imagens;
- a Vercel publicava `app/`, que continha uma versão antiga e somente quatro imagens;
- a versão visual mais recente estava na raiz, mas as imagens não estavam ao lado dela.

Além disso, todos os arquivos terminados em `.png` continham dados JPEG. Servidores enviavam `Content-Type: image/png` para bytes JPEG, algo que pode falhar em ambientes com validação estrita ou `nosniff`.

## Correções aplicadas

- `frontend/` passou a ser a fonte canônica completa.
- Vercel e servidor local agora publicam a mesma pasta.
- `app/` foi sincronizada como espelho de compatibilidade.
- O `index.html` da raiz redireciona para o frontend correto.
- Imagens foram convertidas para JPEG real, renomeadas para `.jpg` e otimizadas.
- Referências de imagens no HTML e JavaScript foram atualizadas.
- Imagens locais antes ignoradas passaram a ser usadas nos cards e galerias.
- Foi adicionado fallback para imagens externas indisponíveis.
- A interface v3 recebeu os estilos que estavam faltando para hero, seletor de idioma e banner do Google Earth.
- O seletor PT/EN/ES foi conectado ao JavaScript e as traduções ausentes foram adicionadas.
- O carregamento do Google Maps não tenta mais usar a API sem chave; nesse caso, usa iframe imediatamente.
- Corrigidos aliases de atrações que não encontravam suas coordenadas no mapa.
- Removido `onclick` inline dos cards, evitando quebra com nomes contendo apóstrofos e melhorando teclado/acessibilidade.
- Servidor local ganhou validação de JSON, limite de requisição, gravação atômica e token administrativo por variável de ambiente.
- Cache foi ajustado para não misturar versões antigas e novas dos arquivos.
- Todos os 13 cards agora usam uma imagem local como imagem principal, evitando dependência da internet na listagem.
- O armazenamento ganhou fallback em memória para navegadores ou visualizadores que bloqueiam `localStorage`, impedindo que o JavaScript inteiro pare de iniciar.
