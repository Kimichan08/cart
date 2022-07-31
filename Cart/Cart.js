import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {MdDelete} from 'react-icons/md'

function Cart() {
  const carts = useSelector(state => state.CartReducer.items);
  const totalPrice = useSelector(state => state.CartReducer.totalPrice)
  console.log(carts);
  return (
    <div className='container mt-5'>
      <h4 className='text-uppercase'>Giỏ hàng</h4>
      <table className="table mt-4 mb-4">
        <thead>
          <tr>
            <th scope="col">Ảnh sản phẩm</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Gía bán lẻ</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Tạm tính</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            carts.map((item) => {
              return (
                <tr key={item.id}>
                  <td><img src={item.product.main_image} alt="" width={50} /></td>
                  <td>{item.product.prod_name}</td>
                  <td>{item.product.prices}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.product.prices}</td>
                  <td><MdDelete/></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
      <h4 className='font-weight-bold mb-4'>Tổng tiền : {totalPrice}</h4>
    </div>
  )
}

export default Cart