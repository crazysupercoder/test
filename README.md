3) task
In terminal,  
>curl https://fx-json.functionx.io -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"validators\",\"params\":{\"page\":\"1\", \"per_page\":\"20\"}}" -o genesis_validators.json