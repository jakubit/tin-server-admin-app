/*
* Gramatyka dla przesylanych komunikatow
*/

statement := '{' {attribute} '}'
attribute := [type, action, request, response, data]

type      := "type"   ':' ["request" | "response"]
action    := "action" ':' ["create" | "read" | "update" | "delete"]
request   := ? Co chcemy konkretnie zrobic np: "user" wtedy mamy w polaczeniu z action: "create" "user" ?
response  := ? info o tym co zawiera atrybut data w odpowiedzi, np: "users-list" ?
data      := ? dane do wstawienia, pobrania, zaktualizowania, usuniecia. To też bedzie jakiś JSON prawdopodobnie ?

/*
* Przyklady
*/

// Dej mi wszystkich uzytkownikow (jakis JSON)
{
  "type": "request",
  "action": "read",
  "request": "users"
}

// Odpowiedz
{
  "type": "response",
  "response": "users",
  "data": [
    {
      "username": "jakub",
      "password": "dupa123"
    },
    {
      "username": "twojStary",
      "password": "pijany"
    }]
}
