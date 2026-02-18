export enum FuelType {
	petrol = 'petrol',
	diesel = 'diesel',
	electric = 'electric',
	hybrid = 'hybrid',
}
export interface Car {
	make: string;
	model: string;
	year: number;
	fuelType: FuelType;
}
