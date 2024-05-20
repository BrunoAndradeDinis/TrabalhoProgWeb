import {tabela, loading} from './dados.js'

// Assim que a página iniciar, utilizando o jquery iremos puxar e atualiza a tabela e a animação
$(document).ready(function() {
  tabela() 
  loading()
});

