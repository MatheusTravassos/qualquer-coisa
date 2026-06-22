# Regras do app Paraná

Este app é uma experiência leve criada para ajudar pessoas interessadas no Paraná. As regras abaixo definem o propósito, o comportamento e os conteúdos que o aplicativo deve oferecer.

## Objetivo

- Ajudar moradores e visitantes a conhecerem melhor o estado do Paraná.
- Oferecer informações sobre cidades, pontos turísticos, cultura e curiosidades locais.
- Ser útil e fácil de usar, com conteúdo claro e acessível.

## O que o app deve fazer

1. Mostrar conteúdos sobre o Paraná que sejam relevantes e verdadeiros.
2. Apresentar cidades, atrações e dicas de viagem.
3. Priorizar informações úteis para o público do estado.
4. Usar linguagem simples e direta.

## Regras de conteúdo

- Sempre valorizar o Paraná e suas características distintas.
- Evitar informações falsas ou desatualizadas.
- Respeitar a diversidade cultural e regional do estado.
- Incluir exemplos reais de lugares e atividades.

## Regras de uso

- O app deve ser fácil de navegar.
- Deve carregar rapidamente e ser acessível em qualquer dispositivo.
- Deve servir como um ponto de partida para pessoas que desejam explorar o Paraná.
- Deve ser claro que é um projeto simples, mas útil.

## Banco de dados e autenticação

- O app usará Firebase como backend para armazenar dados e gerenciar autenticação.
- O Firebase deve ser configurado para garantir segurança, escalabilidade e controle de acesso.
- Usuários devem poder fazer login e acessar conteúdos personalizados quando necessário.
- Os dados do Paraná, como cidades e atrações, devem ser recuperados do banco de dados em vez de estarem hardcoded.
- A autenticação deve ser usada para proteger recursos privados e manter a experiência do usuário segura.

## Administração e divisão de responsabilidades

- O app deve ter uma tela de administração para gerenciar conteúdos e dados do Paraná.
- O frontend deve ser separado do backend para facilitar manutenção e evolução.
- O backend deverá expor APIs seguras que o painel admin pode consumir.
- O painel do admin deve ser mobile-first, mas preparado para uso em desktop também.
