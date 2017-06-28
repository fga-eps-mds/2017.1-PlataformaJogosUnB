# 2017.1-PlataformaJogosUnB
<p align="justify">UnBGames é uma plataforma para vizualização e disponibilização para download dos trabalhos finais resultantes da disciplinas de jogos da Universidade de Brasília, produzidos por meio de uma colaboração entre os estudantes dos cursos de Design, Música e Ciência da Computação/Engenharia de Software.</p>

[UnB Games](http://unbgames.lappis.rocks/)

## Projeto

[![Build Status](https://travis-ci.org/fga-gpp-mds/2017.1-PlataformaJogosUnB.svg?branch=master)](https://travis-ci.org/fga-gpp-mds/2017.1-PlataformaJogosUnB)
[![Coverage Status](https://coveralls.io/repos/github/fga-gpp-mds/2017.1-PlataformaJogosUnB/badge.svg)](https://coveralls.io/github/fga-gpp-mds/2017.1-PlataformaJogosUnB)
[![Code Climate](https://codeclimate.com/github/fga-gpp-mds/2017.1-PlataformaJogosUnB/badges/gpa.svg)](https://codeclimate.com/github/fga-gpp-mds/2017.1-PlataformaJogosUnB)
[![Issue Count](https://codeclimate.com/github/fga-gpp-mds/2017.1-PlataformaJogosUnB/badges/issue_count.svg)](https://codeclimate.com/github/fga-gpp-mds/2017.1-PlataformaJogosUnB)

## Instalação
Configure o ambiente segundo a receita descrita [aqui](https://github.com/PlataformaJogosUnB/chef-devenv)
Para executar a aplicação, algumas dependências devem ser instaladas, como descrito abaixo:

`sudo apt-get update`
</br>
`sudo apt-get install python3-pip`
</br>
`sudo pip3 install -U pip`
</br>
`sudo apt-get install nodejs` 
</br>
`sudo apt-get install npm` 

Em seguida, dentro da máquina virtual, clone o repositório:

`git clone https://github.com/fga-gpp-mds/2017.1-PlataformaJogosUnB`


Dentro do repositório clonado, abra a pasta frontend e execute o comando:

`npm install`

Na pasta backend, execute os comandos:

`pip install -r requirements.txt`
</br> 
`python3 manage.py runserver 0.0.0.0:8000`

Para rodar o projeto, o usuário deve entrar em contato com algum membro da equipe

Vizualize a plataforma:  [http://10.10.10.10:8000/](http://10.10.10.10:8000/)

