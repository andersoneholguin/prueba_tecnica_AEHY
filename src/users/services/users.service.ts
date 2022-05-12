import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { userDto, findParamsDto } from '../dto/index'


@Injectable()
export class UsersService {
    

    async getAll(){
        let users

        const dynamo = new AWS.DynamoDB.DocumentClient()
        const result = await dynamo.scan({
            TableName: 'usersTable',            
        }).promise()
        users = result.Items        

        return {
            message: 'Get all users succesfully',
            users: users
        }
    }

    async getOne(id: number){
        let user
        
        const dynamo = new AWS.DynamoDB.DocumentClient()        
        const result =  await dynamo.get({
            TableName: 'usersTable',
            Key: {id},
        }).promise();
                        
        user = result.Item;
        if(!user) throw new NotFoundException('Usuario no existe')

        return {
            message: 'Get user succesfully',
            user
        }
        
    }

    async createOne(body: userDto){

        const dynamo = new AWS.DynamoDB.DocumentClient()        
        const {nombre, edad} = body

        const newUser = {
            id: uuid(),
            nombre: nombre,
            edad: edad,
        };         
        const invalidData = ['', null, undefined]
        if(invalidData.some((res:any) => res === nombre || res === edad)){
            throw new NotFoundException('Debe ingresar nombre y edad')
        }          

        dynamo.put({
            TableName: 'usersTable',
            Item: newUser,
        }).promise();

        return {
            message: 'User created succesfully',
            user: newUser
        }     
        
    }

    async updateOne(id: number, body: userDto){

        const dynamo = new AWS.DynamoDB.DocumentClient()
        const {nombre, edad} = body
        let user

        const result =  await dynamo.get({
            TableName: 'usersTable',
            Key: { id },
        }).promise();
        user = result.Item
        if(!user) throw new NotFoundException('Usuario no existe o no esta autorizado')

        const invalidData = ['', null, undefined]
        if(invalidData.some((res: any) => res === nombre || res === edad)){
            throw new NotFoundException('Debe ingresar nombre y edad')
        }

        await dynamo.update({
            TableName: 'usersTable',
            Key: {id},
            UpdateExpression: "SET nombre = :nombre, edad = :edad",
            ExpressionAttributeValues: {
                ':nombre': nombre,
                ':edad': edad
            },
            ReturnValues: 'ALL_NEW'
        }).promise()

        return {
            message: 'User updated succesfully',
            user: {
                id: id,
                nombre: nombre,
                edad: edad
            }            
        }        
    }

    async deleteOne(id: number){

        let user
        const dynamo = new AWS.DynamoDB.DocumentClient()

        const result =  await dynamo.get({
            TableName: 'usersTable',
            Key: {id},
        }).promise();

        user = result.Item
        if(!user) throw new NotFoundException('Usuario no existe o no esta autorizado')

        await dynamo.delete({
            TableName: 'usersTable',
            Key: {id},
        }).promise();
        
        return {
            message: 'User deleted succesfully',            
        }
    }
}
