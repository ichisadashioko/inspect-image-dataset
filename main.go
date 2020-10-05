package main

import "net/http"
import "fmt"

func main(){
	http.Handle("/", http.FileServer(http.Dir(".")))

	fmt.Println("Starting server...")

	if err:= http.ListenAndServe("127.0.0.1:8080", nil); err != nil {
		panic(err)
	}

}
