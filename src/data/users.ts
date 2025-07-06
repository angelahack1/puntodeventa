import { Timestamp } from 'mongodb';

export interface User {
    qr: string;
    id: string;
    alias: string;
    tipos: string[];
    estados: string[];
    cuentas: string[];
    negocios: string[];
    compras: string[];
    nombres: string[];
    apellidos: string[];
    edad: number;
    emails: string[];
    rfcs: string[];
    fecha_alta: Timestamp;
    fecha_cambio: Timestamp;
}
