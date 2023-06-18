import { Router } from 'express';

import { CreateAddressController } from '@modules/address/useCases/CreateAddress/CreateAddressController';

const AddressRoutes = Router();
const createAddressController = new CreateAddressController();

AddressRoutes.post("/create", createAddressController.handle);

export default AddressRoutes;
