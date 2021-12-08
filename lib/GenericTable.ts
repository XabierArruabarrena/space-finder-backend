import * as dynamodb from '@aws-cdk/aws-dynamodb'
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Stack } from '@aws-cdk/core';

export class GenericTable {

    private name: string;
    private primaryKey: string;
    private stack: Stack;
    private table: dynamodb.Table; //or Table habiendo hecho el otro import

    public constructor(name:string, primaryKey: string, stack: Stack){
        this.name = name;
        this.primaryKey = primaryKey;
        this.stack= stack;

        this.initialize();

    }

    private initialize(){
        this.createTable();
    }

    private createTable(){
        this.table = new dynamodb.Table(this.stack, this.name, {
            partitionKey: {
                name: this.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.name,
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
        })
    }
}