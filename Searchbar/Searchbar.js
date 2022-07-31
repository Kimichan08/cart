import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from "./Searchbar.module.css";
import { MdSearch } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import BoxSearch from '../BoxSearch/BoxSearch';
import * as productService from "~/services/productService";
// import { getUser } from '~/redux/actions/UserAction';
// import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const cx = classNames.bind(style);

function Searchbar() {
    // const dispatch = useDispatch();
    const [keyWord, setKeyWord] = useState('');
    const [showProducts, setShowProducts] = useState([]);
    const user = useSelector(state => state.UserReducers.user);
    const quantity = useSelector(state => state.CartReducer.totalQty);

    console.log(quantity);

    const reset = () => {
        setKeyWord('')
    }

    useEffect(() => {
        const filterByKeyName = async (keyWord) => {
            const data = await productService.filterByKeyName(keyWord);
            setShowProducts(data);
        }
        const timeOut = setTimeout(() => {
            filterByKeyName(keyWord);
        }, 1000);
        return () => clearTimeout(timeOut);
    }, [keyWord]);


    return (
        <div className={cx("searchbar")}>
            <div className={cx("container", "p-1")}>
                <div className={cx("row", 'align-items-center', 'justify-content-between')}>
                    <div>
                        <MdSearch />
                        <input className={cx("mr-sm-2", "search-input")} type="text" placeholder="Tìm kiếm..." onChange={(e) => setKeyWord(e.target.value.trim())} />
                        {keyWord !== '' && <BoxSearch keyWord={keyWord} data={showProducts} reset={reset} />}
                    </div>
                    <div className={cx("d-flex")}>
                        <div className={cx("search-icon")}>
                            {
                                user && user.name
                            }
                            {
                                !user && (
                                    <Link to="/login" href="#" className='text-dark'> <IoPersonCircle /></Link>
                                )
                            }
                           
                        </div>
                        <div className={cx("search-icon")}>
                            <Link to="/cart" className='text-dark'> <MdShoppingCart />  </Link>{quantity}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbar