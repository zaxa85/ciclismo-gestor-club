export class Payment {
    
    id: number;
    id_fk_member_id: string;
    id_fk_period_id: string;
    dateperform: Date;
    datecreated: Date;
    status: number;
    document: string;
    month: number;
    amount: number;
    
    constructor(
    ) { }   
}