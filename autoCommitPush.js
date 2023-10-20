const fs = require('fs');
const { exec } = require('child_process');

// Função para salvar todos os arquivos no diretório
const saveFiles = () => {
  fs.readdirSync('./').forEach(file => {
    if (fs.lstatSync(file).isFile()) {
      // Você pode personalizar isso para incluir ou excluir tipos de arquivo específicos, se necessário.
      exec(`git add ${file}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Erro ao adicionar ${file}: ${err}`);
        }
      });
    }
  });
};

// Função para automatizar o commit e push
const commitAndPush = () => {
  saveFiles();
  exec('git commit -m "commit e push automático"', (err, stdout, stderr) => {
    if (err) {
      console.error(`Erro ao fazer o commit: ${err}`);
      return;
    }
    exec('git push', (err, stdout, stderr) => {
      if (err) {
        console.error(`Erro ao fazer o push: ${err}`);
        return;
      }
      console.log('Commit e push realizados com sucesso!');
    });
  });
};

module.exports = commitAndPush;

commitAndPush();