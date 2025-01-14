import React, { useState, useEffect } from 'react';
import '../App.scss';
import '../PageStyle/Orders.scss';
import '../PageStyle/Menu.scss';
import NavBar from './Navbar';
import { getOrders, updateOrders } from '../Requests/requestApi';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [optionStatus, setOptionStatus] = useState('pending');
  const [styleButton, setStyleButton] = useState('Hidenn-Btn-Order-Deliver');
  // cambiar estilo a los botones de estados con onclick
  const [stylePending, setStylePending] = useState('Btn-pending-activated');
  const [stylePrepared, setStylePrepared] = useState('Btn-delivering');
  const [styleDelivered, setStyleDelivered] = useState('Btn-delivered');
  // const [propStyleMenu, setPropStyleMenu] = useState('Module-inactived');
  // const [propStyleOrden, setPropStyleOrden] = useState('');

  const putStatusOrder = (order) => {
    const orderBodyUpdate = {
      userId: order.userId,
      client: order.client,
      products: order.products,
      status: 'delivered',
      dateEntry: order.dateEntry,
      id: order.id,
    };

    const token = sessionStorage.getItem('token');

    updateOrders(order, token, orderBodyUpdate)
      .then(() => {
        getOrders(token)
          .then((result) => {
            setOrders(result);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getOrders(token)
      .then((result) => {
        setOrders(result);
      })
      .catch((error) => console.log(error));
  }, []);

  const ordersByStatus = orders.filter((e) => e.status === optionStatus);

  // al iniciar cargue con el boton pending activo
  // setStylePending('Btn-pending-activated');

  const onclickStatusDelivering = () => {
    setOptionStatus('delivering');
    setStylePrepared('Btn-delivering-activated');
    setStylePending('Btn-pending');
    setStyleDelivered('Btn-delivered');
    setStyleButton('Btn-Card-Waiter-Deliver');
  };

  const onclickStatusPending = () => {
    setOptionStatus('pending');
    setStylePending('Btn-pending-activated');
    setStylePrepared('Btn-delivering');
    setStyleDelivered('Btn-delivered');
    setStyleButton('Hidenn-Btn-Order-Deliver');
  };

  const onclickStatusDelivered = () => {
    setOptionStatus('delivered');
    setStyleDelivered('Btn-delivered-activated');
    setStylePending('Btn-pending');
    setStylePrepared('Btn-delivering');
    setStyleButton('Hidenn-Btn-Order-Deliver');
  };

  return (
    <div className="Background-menu">
      <NavBar estilosMenu="Module-inactivated" estilosOrden="Module-activated" />
      <div className="Background-image-orders">
        <div className="Order-status-nav">
          <button className={stylePending} type="button" onClick={() => onclickStatusPending()}>Pendiente</button>
          <button className={stylePrepared} type="button" onClick={() => onclickStatusDelivering()}>Preparado</button>
          <button className={styleDelivered} type="button" onClick={() => onclickStatusDelivered()}>Entregado</button>
        </div>

        <div className="Orders-container">
          {ordersByStatus.map((order) => (
            <div key={order.id} className="Order-card">
              <h1 className="Client-name-order">{`Cliente:  ${order.client}`}</h1>
              <table className="Table-order-card">
                <thead>
                  <tr className="Row-head">
                    <th className="Items-products-table">Producto</th>
                    <th className="Items-qty-table">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((productOrder) => (
                    <tr key={productOrder.productId}>
                      <td className="Items-products-table">{productOrder.name}</td>
                      <td className="Items-qty-table">{productOrder.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className={styleButton} onClick={() => putStatusOrder(order)}>Entregar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
