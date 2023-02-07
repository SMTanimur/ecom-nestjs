import { Document } from 'mongoose';
import { IUsers } from './users.interface';

export interface IUSersModel extends Document, IUsers {}
