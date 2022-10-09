import app from './app';

const port = app.get('port');

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});