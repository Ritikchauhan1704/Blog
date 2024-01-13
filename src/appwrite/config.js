import conf from '../conf/conf'
import { Client,ID,Databases,Storage,Query } from 'appwrite'


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwiteUrl)
        .setProject(conf.appwiteProjectId)
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwiteDatabaseId,
                conf.appwiteCollectionId,
                slug,
                {title,content,featuredImage,status,userId}
            );
        } catch (error) {
            console.log("Createpost error",error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwiteDatabaseId,
                conf.appwiteCollectionId,
                slug,
                {title,content,featuredImage,status}
            );
        } catch (error) {
            console.log("UpdatePost error",error);
        }
    }
    async deletePost(slug){
        try {
            await this.deletePost.updateDocument(
                conf.appwiteDatabaseId,
                conf.appwiteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("DeletePost error",error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwiteDatabaseId,
                conf.appwiteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Getpost error",error);
        }
    }
    async getPosts(quries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwiteDatabaseId,
                conf.appwiteCollectionId,
                quries
            )
        } catch (error) {
            console.log("GetpostS error",error);
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwiteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("UploadFile",error);
            return false
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwiteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.log("UploadFile",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwiteBucketId,
            fileId
        )
    }
}


const service=new Service();

export default service;