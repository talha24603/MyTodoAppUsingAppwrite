import {Client,Databases,ID, Query} from 'appwrite'
import conf from '../conf'
export class Services{

    client =new Client()
    databases

constructor(){
    this.client
.setEndpoint(conf.appWriteUrl)
.setProject(conf.appWriteProjectId)
 this.databases = new Databases(this.client)
}
async createTodo({todo,isEditable,completed}){
    try {
        return await this.databases.createDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            ID.unique(),{
                todo,isEditable,completed
            }
        )
    } catch (error) {
        console.error(error)
        
    }
}
async updateTodo($id,{todo,isEditable,completed}){
    
     try {
           return await this.databases.updateDocument(
               conf.appWriteDatabaseId,
               conf.appWriteCollectionId,
               $id,
               {
                   todo,isEditable,completed
               }
           )
     } catch (error) {
        console.error(error)
        
     }
}
async deleteTodo($id){
    try {
        return await this.databases.deleteDocument(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
            $id
        )
    } catch (error) {
        console.error(error)
        
    }

}
async listTodos(){
    try {
        return await this.databases.listDocuments(
            conf.appWriteDatabaseId,
            conf.appWriteCollectionId,
           
        )
        } catch (error) {
            console.error(error)

}
}
}
const appWrite=new Services()
export default appWrite