# projeto-full-stack


Existem ao todo 10 endpoints para a API 
Pode ser rodada em localhost:3000 ou pela BASE URL: 
https://fullstack-kgtc.onrender.com/


POST user/  - Cria um usuário - STATUS 201
Corpo da Requisição
```
{
	"name" : "teste",
	"email": "teste@email.com",
	"password": "1234",
	"phone": "40028922"
}
```

Resposta da API
`{
	"id": "8e930d6f-aa36-4236-b621-049cfee5ceb3",
	"name": "teste",
	"email": "teste@email.com",
	"isActive": true,
	"phone": "40028922",
	"createdAt": "2023-03-31T04:07:02.300Z",
	"updatedAt": "2023-03-31T04:07:02.300Z",
	"contacts": []
}
`


POST login/ - Loga na Api - STATUS 200 
Corpo da Requisição
{
	"email": "tawan@mail.com",
	"password": "Tawan123@"
}

Resposta da API
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidGF3YW5AbWFpbC5jb20iLCJpYXQiOjE2ODAyMzM2MjksImV4cCI6MTY4MDMyMDAyOSwic3ViIjoiZGZmODY5M2UtZTA5Ni00OTIxLTgxYWUtNTkxY2U4NzI4ZThlIn0.X7hCXb-4Dh_Axei28Xvt66U1IMUSInnOtHtkkBagStw"
}



GET user/ - Lista todos os Usuários    {Authorization Bearer Token} - STATUS 200

Resposta da API
{
		"id": "607968f6-d789-4269-8f09-7392c580aae7",
		"name": "Tawan Alecar",
		"email": "a.l.encartawan405@gmail.com",
		"phone": "9999999999",
		"createdAt": "2023-03-28T05:01:45.126Z",
		"updatedAt": "2023-03-28T05:01:45.126Z",
		"contacts": []
	},
	{
		"id": "5af4cf8f-eeb1-40ee-a686-deaa5a1f4169",
		"name": "Tawan",
		"email": "alencartawan405@gmail.com",
		"phone": "+5586981799923",
		"createdAt": "2023-03-28T23:31:49.188Z",
		"updatedAt": "2023-03-28T23:31:49.188Z",
		"contacts": []
	},
	{
		"id": "ce01e993-0281-41d0-b9db-2d74cb5b668a",
		"name": "Tawan",
		"email": "josetawan300@gmail.com",
		"phone": "+5586998306067",
		"createdAt": "2023-03-29T00:22:40.628Z",
		"updatedAt": "2023-03-29T00:22:40.628Z",
		"contacts": []
	}

GET user/profile - Lista o usuário logado {Authorization Bearer Token} - STATUS 200

Resposta da API
[
	{
		"id": "dff8693e-e096-4921-81ae-591ce8728e8e",
		"name": "Tawan",
		"email": "tawan@mail.com",
		"phone": "(86) 99936-8548",
		"createdAt": "2023-03-29T21:22:23.584Z",
		"updatedAt": "2023-03-29T21:22:23.584Z",
		"contacts": [
			{
				"id": "3ce595d3-b03b-4bad-b7f9-9f5c207556f1",
				"name": "Tawan Alencar",
				"email": "abraao22@mail.com",
				"isActive": true,
				"phone": "(86) 99936-8548",
				"createdAt": "2023-03-30T00:06:26.153Z",
				"updatedAt": "2023-03-30T00:06:26.153Z"
			},
		]
	}
]

DELETE user/:id - Delete um usuário específico {Authorization Bearer Token} - STATUS 204

PATCH user:id - Atualiza um usuário específico {Authorization Bearer Token} - STATUS 200

Corpo da requisição 
{
	"name": "narutinho",
	"email": "uzumaki@email.com",
	"phone": "4002-8922",
	"password": "2222222"
	
}

Resposta da API
{
	"id": "607968f6-d789-4269-8f09-7392c580aae7",
	"name": "narutinho",
	"email": "uzumaki@email.com",
	"password": "2222222",
	"isActive": true,
	"phone": "4002-8922",
	"createdAt": "2023-03-28T05:01:45.126Z",
	"updatedAt": "2023-03-31T04:26:08.926Z"
}


POST contact/ - Cria um contato {Authorization Bearer Token} - STATUS 201

Corpo da Requisição
{
	"name" : "contato",
	"email": "contato@email.com",
	"phone": "400219222"
}

Resposta da API
{
	"id": "aa791c20-239f-4eb5-a2af-0677dde225b9",
	"name": "contato",
	"email": "contato@email.com",
	"isActive": true,
	"phone": "400219222",
	"createdAt": "2023-03-31T04:36:49.427Z",
	"updatedAt": "2023-03-31T04:36:49.427Z",
	"user": {
		"id": "dff8693e-e096-4921-81ae-591ce8728e8e",
		"name": "Tawan",
		"email": "tawan@mail.com",
		"isActive": true,
		"phone": "(86) 99936-8548",
		"createdAt": "2023-03-29T21:22:23.584Z",
		"updatedAt": "2023-03-29T21:22:23.584Z"
	}
}

GET contact/ - Lista Todos os contatos {Authorization Bearer Token} - STATUS 200

Resposta da API

	{
		"id": "7e679404-8511-4195-b83f-254e64e9772a",
		"name": "Tawan",
		"email": "alencartawa@gmail.com",
		"phone": "(86) 99936-8548",
		"createdAt": "2023-03-31T03:55:13.619Z",
		"updatedAt": "2023-03-31T03:55:13.619Z",
		"user": {
			"id": "dff8693e-e096-4921-81ae-591ce8728e8e",
			"name": "Tawan",
			"email": "tawan@mail.com",
			"isActive": true,
			"phone": "(86) 99936-8548",
			"createdAt": "2023-03-29T21:22:23.584Z",
			"updatedAt": "2023-03-29T21:22:23.584Z"
		}
	},
	{
		"id": "aa791c20-239f-4eb5-a2af-0677dde225b9",
		"name": "contato",
		"email": "contato@email.com",
		"phone": "400219222",
		"createdAt": "2023-03-31T04:36:49.427Z",
		"updatedAt": "2023-03-31T04:36:49.427Z",
		"user": {
			"id": "dff8693e-e096-4921-81ae-591ce8728e8e",
			"name": "Tawan",
			"email": "tawan@mail.com",
			"isActive": true,
			"phone": "(86) 99936-8548",
			"createdAt": "2023-03-29T21:22:23.584Z",
			"updatedAt": "2023-03-29T21:22:23.584Z"
		}
    }

PATCH contact/:id Atualiza um contato específico {Authorization Bearer Token} - STATUS 200

Corpo da requisição 
{
	"name" : "luffy",
	"email": "monkey@email.com",
	"phone": "400219222"
}

Resposta da API
{
	"id": "fddbb04b-90a4-439e-b9a4-f13873ccd1ab",
	"name": "luffy",
	"email": "monkey@email.com",
	"isActive": true,
	"phone": "400219222",
	"createdAt": "2023-03-29T20:57:29.665Z",
	"updatedAt": "2023-03-31T03:35:00.426Z"
}

DELETE contact/id Deleta contato específico  {Authorization Bearer Token} - STATUS 204
