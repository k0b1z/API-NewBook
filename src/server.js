import MyApp from './app'

const app = MyApp();

app.listen(3000, function() {
  console.log('Rodando na porta 3000');
});