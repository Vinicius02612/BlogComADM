# Projeto 2 do curso formação  nodeJS .....
## -- Blogs com Restrição de Adm  ...


## Bibliotecas usadas até o momento:<br/>
`express`<br/>
`sequelize`<br/>
`mysql2`<br/>
`body-parser`<br/>
`ejs`<br/>
`bootstrap cdn`<br/>
`slugify`<br>
## Comandos em caso do mysql dar erro de conexão no ubuntu ahaha:<br/>

`Instale o MySQL e inicie o serviço com o comando abaixo:`<br/>
  `-> sudo systemctl start mysql` <br/>

`Configure o MySQL inicialmente com o comando abaixo:`<br/>
  `-> sudo mysql_secure_installation` <br/>

`Logue no MySQL com o comando abaixo:` <br/>
  `-> sudo mysql -u root -p`<br/>
  
`Agora, digite o comando abaixo substituindo a palavra password pela senha que desejar:`  <br/>
  `-> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; flush privileges;`