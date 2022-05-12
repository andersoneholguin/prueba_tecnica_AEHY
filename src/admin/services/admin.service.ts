import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AdminService {

    async getAll(){
        let users
        const dynamo = new AWS.DynamoDB.DocumentClient()

        const result = await dynamo.scan({
            TableName: 'administratorsTable'
        }).promise();
        users = result.Items
        const response = users.map((res:any) =>{
            delete res.password
            return res
        })
        
        return {
            message: 'Get all users succesfully',
            users: response
        }
    }

    async getOne(id: number){
        let user
        const dynamo = new AWS.DynamoDB.DocumentClient()

        const result = await dynamo.get({
            TableName: 'administratorsTable',
            Key: {id}
        }).promise()
        user = result.Item
        
        delete user.password
        return {
            message: 'Get user succesfully',
            user
        }

    }

    async createOne(body: any){
        
        const dynamo = new AWS.DynamoDB.DocumentClient()
        const { email, password } = body

        const newAdmin = {
            id: uuid(),
            email: email,
            password: password
        }

        await dynamo.put({
            TableName: 'administratorsTable',
            Item: newAdmin
        }).promise()

        return {
            message: 'Admin created succesfully',
            admin: {
                email,                
            }
        }
    }

    async findByEmail(email: string){
        let users
        const dynamo = new AWS.DynamoDB.DocumentClient()

        const result = await dynamo.scan({
            TableName: 'administratorsTable'
        }).promise()
        users = result.Items
        const userAdmin = users.find((res:any) => res.email === email)        
        return userAdmin
    }

    async updateOne(){}

    async deleteOne(){}
}
