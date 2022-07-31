import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as ProductServices from "~/services/productService";
import styled from "./Details.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { addToCart } from "~/redux/actions/CartAction";
import { useDispatch } from "react-redux";
import * as Swal from 'sweetalert2';

const cx = classNames.bind(styled);

function Details() {
  let { id } = useParams();
  const [apiData, setApiData] = useState({});
  const [apiDatas, setApiDatas] = useState([]);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getApiData = async () => {
      const data = await ProductServices.detailsProduct(id);
      setCount(1);
      setApiData(data);
    };
    const getApiDatas = async () => {
      const data = await ProductServices.getAll();
      setApiDatas(data);
    }
    getApiDatas();
    getApiData();
    window.scrollTo(0, 0)
  }, [id]);

  const handleAddToCart = (product, quantity) => {
    let item = {
      product, quantity
    }
    console.log(dispatch(addToCart(item)));
    Swal.fire({
      icon: "success",
      text: "Đã thêm vào giỏ hàng"
    });
  }

  return (
    <div className="container">
      <div className={cx('card')}>
        <div className="card-body">
          <div className={cx('row')}>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="white-box text-center border p-5">
                <img src={apiData.main_image} className="img-responsive" alt="..." />
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-6">
              <h4 className="box-title">{apiData.prod_name}</h4>
              <p>{apiData.prodDetail}</p>
              <h3 className="text-success">
                ${apiData.prices}
              </h3>
              <p>Số lượng:</p>
              <button className={cx('btn-count', 'line-minus')} onClick={() => {
                if (count < 2) {
                  setCount(1);
                } else {
                  setCount(count - 1);
                }
              }}><AiOutlineMinus className={cx('minus')} /></button>
              <span className={cx('number', 'mt-1')}>
                {count}
              </span>
              <span>
                <button className={cx('btn-count', 'line-plus')} onClick={() => setCount(count + 1)}><AiOutlinePlus className={cx('plus')} /></button>
              </span>
              <br />
              <button
                className={cx("btn", "btn-dark", "btn-rounded", "mr-1", "mt-4", "text-uppercase", "font-weight-bold")}
                data-toggle="tooltip"
                title=""
                data-original-title="Add to cart" onClick={() => handleAddToCart(apiData, count)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div className="border-top mt-5 border-bottom">
              <h5 className={cx("text-uppercase", "mt-2", "border-bottom")}> <span className={cx("text-infor", "mb-2")}>Thông tin sản phẩm</span></h5>
              <p>Tổng hợp tác dụng của cây</p>
              <p>Giúp đẹp da, đen tóc</p>
              <p>+ Bệnh tiết niệu: xưa kia người ta dùng quả mâm xôi để trị nhiễm trùng đường tiểu, tuy nhiên những thử nghiệm khác không thấy tính kháng khuẩn của dịch quả mâm xôi. Có báo cáo cho rằng nước sắc rễ và lá trị được nhiễm trùng đường tiểu do E. coli.
              </p>
              <p>+ Trị sạn thận: mâm xôi làm giảm lượng lớn canxi trong nước tiểu, vì vậy có khả năng chống sạn thận.
              </p>
              <p>+ Trị đái tháo đường: Đông y quan niệm đái tháo đường thuộc chứng tiêu khát do chân âm hao tổn. Phế khát gây thích uống nhiều, vị khát gây ăn nhiều không biết no, thận khát sinh ra tiểu nhiều. Quả mâm xôi thanh nhiệt, giải khát, giúp hỗ trợ thanh nhiệt ở các tạng phủ.
              </p>
              <p>+ Chống rối loạn cương dương, chữa liệt dương</p>
              <p>+ Trị viêm gan mạn tính, sưng gan, viêm tuyến vú.</p>
              <p>+Trị viêm gan cấp và mạn, viêm tuyến vú, viêm loét miệng.</p>

            </div>
          </div>
          <div className="d-lg-block d-md-block d-none">
            <h3 className={cx('mt-5 mb-3', 'fonthead', 'font-weight-bold')}>Sản phẩm liên quan</h3>
            <div className="row">
              {
                apiDatas.map((items, index) => {
                  return items.id < 6 ? (
                    <div className="col-lg col-md" key={items.id}>
                      <div className="card mb-3 shadow-sm">
                        <Link to={`/details/${items.id}`} className="text-decoration-none text-center text-dark font-weight-normal">
                          <img className="card-img-top" src={items.main_image} alt="" />
                          <div className="card-body">
                            <div className="items-align-center">
                              <span className={cx('card-text d-lg-block d-none', 'fontcontent')}>{items.prod_name}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                    : (
                      <div key={items.id}></div>
                    )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
