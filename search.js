const apiKey = 'wiHOzKIb/sbe8C1/TJ+qCg==GXH7FlibWG8qr5NA';
const cityName = 'San Francisco';

fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
  headers: {
    'X-Api-Key': apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
