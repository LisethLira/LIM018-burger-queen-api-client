// eslint-disable-next-line no-unused-vars
export const getProducts = jest.fn((tokens = 'wjbcoevhnovjiovne') => Promise.resolve([{
  id: '4',
  name: 'Jugo de frutas natural',
  price: 7,
  image: 'https://blog.creublanca.es/uploads/ea9297be6d16e543989fca96b7a839c3.jpg',
  type: 'Desayuno',
  dateEntry: '15/09/22',
},
{
  id: '5',
  name: 'Hamburguesa simple',
  price: 10,
  image: 'https://media.istockphoto.com/photos/tasty-fast-food-cheeseburger-on-black-background-picture-id1339463771?k=20&m=1339463771&s=612x612&w=0&h=WgT6Ghgj1S6TwYWcUtJjqKLhnP9bQIkNHjOtDrUyUBw=',
  type: 'Desayuno',
  dateEntry: '15/09/22',
},
{
  id: '6',
  name: 'Hamburguesa doble',
  price: 15,
  image: 'https://img.freepik.com/fotos-premium/hamburguesa-doble-lechuga-tomate-cebolla-queso-derretido_250927-603.jpg?w=826',
  type: 'Desayuno',
  dateEntry: '15/09/22',
}]));

export const postProducts = () => {
};
