import { json } from '@remix-run/node';

import CarsService from '../../services/cars';

export async function loader({ request }) {
	const cars = new CarsService({ request });

	return json({
		data: await cars.getAll(),
	});
}
