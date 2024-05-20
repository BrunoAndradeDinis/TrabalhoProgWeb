// Puxando os dados da API para tratar 
async function fetchDados() {
  try {
    const url = 'https://countries-states-and-cities.p.rapidapi.com/countries';
    const headers = new Headers();
    headers.append('X-RapidAPI-Key', 'ea3d1b6b24mshf3e08ce8d49f482p121c42jsnc3467d00cd0a');
    headers.append('X-RapidAPI-Host', 'countries-states-and-cities.p.rapidapi.com');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    // Atualizando os dados ocm .map para tratar com o DataTable
    const paises = await response.json();
      return paises.list.map(pais => ({
        id: `${pais.id ? pais.id : 'Sem informação'}`,
        pais: `${pais.name ? pais.name : 'Sem informação'}`,
        capital: `${pais.capital ? pais.capital : 'Sem informação'}`,
        bandeira:`${pais.emoji ? pais.emoji : 'Sem informação'}` ,
        region: `${pais.region ? pais.region : 'Sem informação'}`,
        moeda: `${pais.currency_symbol ? pais.currency_symbol : 'Sem informação'}`,
        codigoTelefone: `${pais.phone_code ? pais.phone_code : 'Sem informação'}` ,
        nativo: `${pais.native ? pais.native : 'Sem informação'}`
      }));
  } catch (error) {
    console.error('Ocorreu o seguinte erro:', error);
    return [];
  }
}

export async function tabela() {
  const paises = await fetchDados(); // Salvando os dados puxados na const
  
  // Utilizando os dados tratados para incrementar na nas tr td da tbody
  $('#tabela').DataTable( {
    data: paises,
    columns: [
        { data: 'id' },
        { data: 'pais' },
        { data: 'capital' },
        { data: 'bandeira' },
        { data: 'nativo'},
        { data: 'region' },
        { data: 'moeda' },
        { data: 'codigoTelefone'}
    ]
})
}

// Utilizando estilização e animação para um visual menos estático no carregamento dos dados na página
export function loading(){
  $('.loader').toggleClass('oculto')
  $('.tabela__principal').toggleClass('oculto')
  $('#tabela').toggleClass('oculto')
  $('tbody tr').ready(()=>{
    $('thead').toggleClass('oculto')
  })
}
