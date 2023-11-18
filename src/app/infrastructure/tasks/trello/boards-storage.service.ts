import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Boards } from "src/app/core/trello/entities/boards";
import { BoardsRepository } from "src/app/core/trello/interfaces/boards.repository";

@Injectable({providedIn: 'root'})

export class BoardsStorageService implements BoardsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(public http: HttpClient){}

    createBoard(boards: Boards): Promise<boolean> {
        
        const httpParams = new HttpParams()
            .set("name", boards.name)
            .set("key", boards.key)
            .set("token", boards.token)
    
        return this.http.post(this.urlTrello, httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        
    }

    getBoard(): Promise<string> {
        const httpParams = new HttpParams()
            .set("key", "f8661f67ca5ef6f0f8f9a1d13e819d0c")
            .set("token", "ATTA1b6d1e884daf5d43eae4604137eab41548f6fb749c580a1730fa3cc77075bdeaE0A65584")
    
        return this.http.get<any>(this.urlTrello + "UNTcmYSl", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const idBoard = response.id
                return idBoard
            })
            .catch((error) => {
                return error
            });
    }
    

    updateBoard(id: string, updatedBoards: Boards): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteBoard(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}