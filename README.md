# :computer: Trybe-13-Project-TrybeWallet :computer:

Nesse projeto foi desenvolvida uma carteira de controle de gastos com conversor de moedas utilizando React e Redux. A pessoa usuária pode:
 - Adicionar, remover e editar um gasto;
 - Visualizar uma tabelas com seus gastos;
 - Visualizar o total de gastos convertidos para uma moeda;

# Acesse o projeto clicando [aqui](https://fredericotp.github.io/trybe-project-13-trybewallet/)! :green_heart:

<br />

<details>
<summary>
  
## 1- Requisitos
  
</summary>
 
### Página de Login

Crie uma página para que a pessoa usuária se identifique, com email e senha. Esta página deve ser a página inicial de seu aplicativo.

### 1. Crie uma página inicial de login com os seguintes campos e características

* A rota para esta página deve ser `/`;

* <details><summary> Você deve criar um local para que a pessoa usuária insira seu e-mail e senha:</summary>

  - O campo para o e-mail precisa ter o atributo `data-testid="email-input"`;
  - O email precisa estar em um formato válido, como 'alguem@alguem.com';
  - O campo para a senha precisa ter o atributo `data-testid="password-input"`;
  - A senha precisa possuir 6 ou mais caracteres.
  </details>

* <details><summary> Crie um botão com o texto <code>Entrar</code>:</summary>

  - O botão precisa estar **desabilitado** caso o e-mail não tenha um formato válido ou a senha possua um tamanho menor que 6 caracteres;

  - Salve o email no estado global da aplicação, com a chave **_email_**, assim que a pessoa usuária _logar_;

  - A rota deve ser mudada para `/carteira` após o clique no botão '**Entrar**'.
  </details>

---

### Página da Carteira

Crie uma página para gerenciar a carteira de gastos em diversas moedas e que traga a despesa total em real que é representado pelo código 'BRL'. Esta página deve ser renderizada por um componente chamado **_Wallet_**.

- A rota para esta página deve ser `/carteira`;

---

### Header

### 2. Crie um header para a página de carteira contendo as seguintes características

  - O componente `Header` deve ser renderizado dentro do componente [`Wallet`](#página-da-carteira);

* <details><summary> Um elemento que exiba o e-mail da pessoa usuária que fez login:</summary>

  - Adicione o atributo `data-testid="email-field"`.

  </details>

* <details><summary> Um elemento com a despesa total gerada pela lista de gastos:</summary>

  - Adicione o atributo `data-testid="total-field"` neste elemento;

  - Inicialmente esse elemento deve exibir o valor `0`;
  </details>

* <details><summary> Um elemento que mostre qual câmbio está sendo utilizado, que neste caso será 'BRL':</summary>

  - Adicione o atributo `data-testid="header-currency-field"` neste elemento
  </details>

---

### 3. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:

* O componente `WalletForm` deve ser renderizado dentro do componente [`Wallet`](#página-da-carteira);

* <details><summary> Um campo para adicionar valor da despesa:</summary>

  - Adicione o atributo `data-testid="value-input"`.
  </details>

* <details><summary> Um campo para adicionar a descrição da despesa:</summary>

  - Adicione o atributo `data-testid="description-input"`.
  </details>

* <details><summary> Um campo para selecionar em qual moeda será registrada a despesa.</summary>

  - O campo deve ser um `<select>`.
  - Adicione o atributo `data-testid="currency-input"`.
  - As options devem ser preenchidas pelo valor da chave `currencies` do estado global.
    - Os valores da chave <code>currencies</code> no estado global devem ser puxados através de uma requisição à API no endpoint `https://economia.awesomeapi.com.br/json/all`;
    - Remova, das informações trazidas pela API, a opção 'USDT';
    - A chave `currencies` do estado global deve ser um array.

  </details>

* <details><summary> Um campo para adicionar qual método de pagamento será utilizado.</summary>

  - Este campo deve ser um `<select>`.
  - Adicione o atributo `data-testid="method-input"`.
  - A pessoa usuária deve poder escolher entre os campos: 'Dinheiro', 'Cartão de crédito' e 'Cartão de débito'.
  </details>

* <details><summary> Um campo para selecionar uma categoria (tag) para a despesa.</summary>

  - O campo deve ser um `<select>`.
  - Adicione o atributo `data-testid="tag-input"`.
  - Este campo deve ser um dropdown. a pessoa usuária deve poder escolher entre os campos: 'Alimentação', 'Lazer', 'Trabalho', 'Transporte' e 'Saúde'.

  </details>

<details>
  <summary><strong>Observações Importantes:</strong></summary><br />

  Note que os campos `<select>` já iniciam com um valor selecionado no seu navegador. Você também pode verificar por meio do `React Developer Tools` que o estado do seu componente inicializa sincronizado com o que é exibido no navegador.

  Para ilustrar, imagine que o estado inicial seja uma string vazia. Neste caso a pessoa usuária poderá facilmente causar um problema onde ele acredita que a opção já está selecionada (uma vez que o select mostra um valor), quando na verdade ela ainda não está (o estado foi inicalizado com uma string vazia). Por esse motivo é importante sincronizar o mesmo valor inicial do `<select>` em seu estado no react, ao invés de inicializar com uma string vazia.
</details>

---

### 4. Salve todas as informações do formulário no estado global

* Crie um botão com o texto \'Adicionar despesa\'. Ele servirá para salvar as informações da despesa no estado global e atualizar a soma de despesas no header.

* <details><summary> Desenvolva a funcionalidade do botão "Adicionar despesa" de modo que, ao clicar no botão, as seguintes ações sejam executadas:</summary>

  - <details><summary> Os valores dos campos devem ser salvos no estado da aplicação, na chave <b><i>expenses</i></b>, dentro de um array contendo todos gastos que serão adicionados:</summary>

    - O `id` da despesa **deve** ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.
    - :bulb: **Atenção nesse ponto**: você deverá fazer uma requisição para a API e buscar a cotação no momento que o botão de `Adicionar despesa` for apertado. Para isso você poderá utilizar um thunk.
      - **Você deverá salvar a cotação do câmbio feita no momento da adição** que será necessária para efetuar a edição do gasto (requisito 8). Caso você não tenha essa informação salva, o valor da cotação trazida poderá ser diferente do obtido anteriormente.

    </details>

  - <details><summary> Após adicionar a despesa:</summary>

    - Atualize a soma total das despesas (utilize a chave `ask` para realizar essa soma). Essa informação deve ficar no [`header`](#2-crie-uma-página-para-sua-carteira-com-as-seguintes-características) dentro do elemento com `data-testid="total-field"`;
      - O elemento com o testid deve conter apenas a soma total das despesas.
      - O valor total deverá ser exibido com 2 casas decimais. Exemplo: (valor - ponto - duas casas decimais) `100.00` `23.50`

    - Limpe os inputs de valor e descrição.
    </details>

  - <details><summary> As despesas salvas no Redux ficarão com um formato semelhante ao seguinte:</summary>

      ```javascript
      expenses: [{
        "id": 0,
        "value": "3",
        "description": "Hot Dog",
        "currency": "USD",
        "method": "Dinheiro",
        "tag": "Alimentação",
        "exchangeRates": {
          "USD": {
            "code": "USD",
            "name": "Dólar Comercial",
            "ask": "5.6208",
            ...
          },
          "CAD": {
            "code": "CAD",
            "name": "Dólar Canadense",
            "ask": "4.2313",
            ...
          },
          "EUR": {
            "code": "EUR",
            "name": "Euro",
            "ask": "6.6112",
            ...
          },
          "GBP": {
            "code": "GBP",
            "name": "Libra Esterlina",
            "ask": "7.2498",
            ...
          },
          "ARS": {
            "code": "ARS",
            "name": "Peso Argentino",
            "ask": "0.0729",
            ...
          },
          "BTC": {
            "code": "BTC",
            "name": "Bitcoin",
            "ask": "60299",
            ...
          },
          "LTC": {
            "code": "LTC",
            "name": "Litecoin",
            "ask": "261.69",
            ...
          },
          "JPY": {
            "code": "JPY",
            "name": "Iene Japonês",
            "ask": "0.05301",
            ...
          },
          "CHF": {
            "code": "CHF",
            "name": "Franco Suíço",
            "ask": "6.1297",
            ...
          },
          "AUD": {
            "code": "AUD",
            "name": "Dólar Australiano",
            "ask": "4.0124",
            ...
          },
          "CNY": {
            "code": "CNY",
            "name": "Yuan Chinês",
            "ask": "0.8278",
            ...
          },
          "ILS": {
            "code": "ILS",
            "name": "Novo Shekel Israelense",
            "ask": "1.6514",
            ...
          },
          "ETH": {
            "code": "ETH",
            "name": "Ethereum",
            "ask": "5184",
            ...
          },
          "XRP": {
            "code": "XRP",
            "name": "Ripple",
            "ask": "1.4",
            ...
          }
        }
      }]
      ```
    </details>
  </details>

---

### 5. Desenvolva testes para atingir 60% de cobertura total da aplicação

<details>
<summary><strong>Observações técnicas</strong></summary><br />

  * Os testes criados por você não irão influenciar os outros requisitos no avaliador. Você deverá desenvolver seus testes unitários/integração usando a biblioteca React Testing Library, enquanto o avaliador usará a biblioteca [Cypress](https://docs.cypress.io/) para avaliar os requisitos, inclusive os de cobertura.
  * Em caso de dúvidas leia a seção <a href="#testes">Testes > Execução de teste de cobertura</a>.

</details>

---

### Tabela de Gastos

### 6. Desenvolva uma tabela com os gastos contendo as seguintes características:

  - O componente `Table` deve ser renderizado dentro do componente [`Wallet`](#página-da-carteira);

* <details><summary> A tabela deve possuir um cabeçalho com os seguintes valores:</summary>

    - Descrição;
    - Tag;
    - Método de pagamento;
    - Valor;
    - Moeda;
    - Câmbio utilizado;
    - Valor convertido;
    - Moeda de conversão;
    - Editar/Excluir.
  </details>

---

### 7. Implemente a lógica para que a tabela seja alimentada pelo estado da aplicação

* <details><summary> A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave <b><i>expenses</i></b> que vem do <i>reducer</i> <code>wallet</code>:</summary>

  - O campo de `Moeda` deverá conter o nome da moeda. Portanto, ao invés de 'USD' ou 'EUR', deve conter "Dólar Americano/Real Brasileiro" e "Euro/Real Brasileiro", respectivamente;

  - O elemento que exibe a `Moeda de conversão` deverá ser sempre 'Real';

  - Atenção também às casas decimais dos campos. Como são valores contábeis, eles devem apresentar duas casas após o ponto. Arredonde sua resposta somente na hora de renderizar o resultado e, para os cálculos, utilize sempre os valores vindos da API (utilize o campo `ask` que vem da API).

  - Utilize sempre o formato `0.00` (número - ponto - duas casas decimais).
  </details>

---

### 8. Crie um botão para deletar uma despesa da tabela contendo as seguintes características:

* O botão deve ser o último item da linha da tabela e deve possuir o atributo `data-testid="delete-btn"`.

* Após o botão ser clicado, a seguintes ações deverão ocorrer:
  * A despesa deverá ser deletada do estado global
  * A despesa deixará de ser exibida na tabela
  * O valor total exibido no header será alterado.

---

### 9. Crie um botão para editar uma despesa da tabela contendo as seguintes características:

* O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="edit-btn"`

* <details><summary> Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" ela é atualizada, alterando o estado global.</summary>

  - O formulário deverá ter os mesmos `data-testid` do formulário de adicionar despesa. Você pode reaproveitá-lo.

  - O botão para submeter a despesa para edição deverá conter **exatamente** o texto "Editar despesa"

  - Após a edição da despesa, a ordem das despesas na tabela precisa ser mantida.

  - :bulb: **Obs**: para esse requisito, não é necessário popular os inputs com os valores prévios da despesa. A imagem do gif é apenas uma sugestão. 

  - :bulb: Lembre-se de utilizar o formato do estado global da aplicação informado na seção <a href="#como-desenvolver">Desenvolvimento</a>

  - **Atenção**: o câmbio utilizado na edição deve ser o mesmo do cálculo feito na adição do gasto.
  </details>

---

### 10. Desenvolva testes para atingir 90% de cobertura total da aplicação

<details>
<summary><strong>Observações técnicas</strong></summary><br />

  * Os testes criados por você não irão influenciar os outros requisitos no avaliador. Você deverá desenvolver seus testes unitários/integração usando a biblioteca React Testing Library, enquanto o avaliador usará a biblioteca [Cypress](https://docs.cypress.io/) para avaliar os requisitos, inclusive os de cobertura.
  * Em caso de dúvidas leia a seção <a href="#testes">Testes > Execução de teste de cobertura</a>.

</details>

<details>
<summary><strong>O que será avaliado</strong></summary><br />

  * Será validado se ao executar `npm run test-coverage` são obtidos os seguintes resultados:
    * `% Stmts` da linha `All files` é maior ou igual a 90.
    * `% Branch` da linha `All files` é maior ou igual a 90.
    * `% Funcs` da linha `All files` é maior ou igual a 90.
    * `% Lines` da linha `All files` é maior ou igual a 90.
</details>

</details>
<br />

## 2- Nota do Projeto

## 100% :heavy_check_mark:

![Project-TrybeWallet-Grade](https://github.com/FredericoTP/trybe-project-13-trybewallet/blob/main/images/trybewallet-grade.png?raw=true)
 
<br />

## 3- Preview

![Project-TrybeWallet-Preview1](https://github.com/FredericoTP/trybe-project-13-trybewallet/blob/main/images/trybewallet-preview1.png?raw=true)
 
![Project-TrybeWallet-Preview2](https://github.com/FredericoTP/trybe-project-13-trybewallet/blob/main/images/trybewallet-preview2.png?raw=true)
 
