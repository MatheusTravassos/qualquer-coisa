# Regras do app Ivaiporã Turismo

Este app é uma experiência leve criada para ajudar pessoas interessadas em Ivaiporã. As regras abaixo definem o propósito, o comportamento e os conteúdos que o aplicativo deve oferecer.

## Objetivo

- Ajudar moradores e visitantes a conhecerem melhor a cidade de Ivaiporã.
- Oferecer informações sobre atrações locais, pontos turísticos, rotas, gastronomia e cultura ivaiporaense.
- Ser útil e fácil de usar, com conteúdo claro, acessível e navegação interativa com mapas modernos.

## O que o app deve fazer

1. Mostrar conteúdos sobre Ivaiporã que sejam relevantes e verdadeiros.
2. Apresentar atrações, pontos de interesse e mapas de localização.
3. Priorizar informações úteis para o público da cidade e turistas.
4. Usar linguagem simples e direta.

## Regras de conteúdo

- Sempre valorizar a cidade de Ivaiporã e suas características distintas (como a Capital das Flores).
- Evitar informações falsas ou desatualizadas.
- Respeitar a diversidade cultural e regional da comunidade local.
- Incluir exemplos reais de lugares e atividades locais (e.g., Lago de Santana, Casa da Memória).

## Regras de uso

- O app deve ser fácil de navegar.
- Deve carregar rapidamente e ser acessível em qualquer dispositivo.
- Deve servir como um ponto de partida para pessoas que desejam explorar Ivaiporã.
- Deve integrar mapas interativos (Google Maps e Google Earth/Satélite) para facilitar a localização geográfica das atrações.

## Banco de dados e autenticação

- O app usará Firebase como backend para armazenar dados e gerenciar autenticação se necessário.
- O Firebase deve ser configurado para garantir segurança, escalabilidade e controle de acesso.
- Usuários devem poder fazer login e acessar conteúdos personalizados quando necessário.
- Os dados de Ivaiporã, como atrações e pontos de interesse, devem ser recuperados do banco de dados/localStorage em vez de estarem hardcoded no layout.
- A autenticação deve ser usada para proteger recursos privados e manter a experiência do usuário segura.

## Administração e divisão de responsabilidades

- O app deve ter uma tela de administração para gerenciar conteúdos e dados de Ivaiporã.
- O frontend deve ser separado do backend para facilitar manutenção e evolução.
- O backend deverá expor APIs seguras que o painel admin pode consumir.
- O painel do admin deve ser mobile-first, mas preparado para uso em desktop também.

